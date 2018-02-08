using Merchello.Core;
using Merchello.Core.Checkout;
using Merchello.Core.Gateways;
using Merchello.Core.Gateways.Shipping;
using Merchello.Web;
using Merchello.Web.Factories;
using Newtonsoft.Json;
using OnlineShop.Web.Models;
using System;
using System.Configuration;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Web.Http;

namespace OnlineShop.Web.Controllers
{
    public partial class ClientController
    {
        private static readonly string[] SuccessPaymentTYpes = new[] { "Completed", "Authorized", "Recurrent" };

        private ICheckoutManagerBase checkoutManager;
        protected ICheckoutManagerBase CheckoutManager
        {
            get
            {
                if (this.checkoutManager == null)
                {
                    this.checkoutManager = this.CustomerContext.CurrentCustomer.Basket().GetCheckoutManager(new CheckoutContextSettingsFactory().Create());
                }

                return this.checkoutManager;
            }
        }

        protected IGatewayContext GatewayContext => MerchelloContext.Current.Gateways;

        [HttpPost]
        [ActionName("ConfirmOrder")]
        public IHttpActionResult ConfirmCheckout(CheckoutModel model)
        {
            var shipment = CurrentCustomer.Basket().PackageBasket(this.CheckoutManager.Customer.GetShipToAddress()).FirstOrDefault();
            var quoteAttemp = GatewayContext.Shipping.GetAllActivatedProviders()
                .Cast<ShippingGatewayProviderBase>()
                .SelectMany(p => p.GetShippingGatewayMethodsForShipment(shipment))
                .First(m => m.ShipMethod.Name == model.ShippingMethod).QuoteShipment(shipment);
            if (!quoteAttemp.Success)
            {
                return BadRequest();
            }

            this.CheckoutManager.Shipping.ClearShipmentRateQuotes();
            this.CheckoutManager.Shipping.SaveShipmentRateQuote(quoteAttemp.Result);

            this.CheckoutManager.Payment.ClearPaymentMethod();
            var paymentMethod = this.CheckoutManager.Payment.GetPaymentGatewayMethods()
                .First(p => p.PaymentMethod.Name == model.PaymentMethod);
            this.CheckoutManager.Payment.SavePaymentMethod(paymentMethod.PaymentMethod);
            if (!this.CheckoutManager.Payment.IsReadyToInvoice())
            {
                return BadRequest();
            }

            var result = this.CheckoutManager.Payment.AuthorizePayment(paymentMethod.PaymentMethod.Key);
            if (!result.Payment.Success)
            {
                return BadRequest();
            }

            this.CurrentCustomer.Basket().Empty();

            if (model.PaymentMethod == "belpost")
            {
                result = result.Invoice.CapturePayment(result.Payment.Result, paymentMethod, result.Invoice.Total);
            }

            Notification.Trigger("OrderConfirmation", result, new[] { Members.CurrentUserName });

            var seed = Guid.NewGuid().ToString("N");
            var storeId = ConfigurationManager.AppSettings["webpay.storeId"];
            var mode = ConfigurationManager.AppSettings["webpay.mode"];
            var secret = ConfigurationManager.AppSettings["webpay.secret"];
            var paymentUrl = ConfigurationManager.AppSettings["webpay.paymentUrl"];
            var currency = "BYN";
            using (var hasher = SHA1.Create())
            {
                var response = new
                {
                    number = result.Invoice.InvoiceNumber,
                    total = result.Invoice.Total.ToString("0.00"),
                    status = result.Invoice.InvoiceStatus.Name.ToLower(),
                    paymentMethod = paymentMethod.PaymentMethod.Name,
                    shippingMethod = quoteAttemp.Result.ShipMethod.Name,
                    receiver = shipment.ToName,
                    receiverAddress = $"{shipment.ToAddress1}, {shipment.ToRegion}, {shipment.ToPostalCode}",
                    customerEmail = Members.CurrentUserName,
                    storeId = storeId,
                    seed = seed,
                    currency = currency,
                    signature = string.Join("", hasher.ComputeHash(Encoding.UTF8.GetBytes($"{seed}{storeId}{result.Invoice.InvoiceNumber}{mode}{currency}{result.Invoice.Total.ToString("0.00")}{secret}")).Select(x => x.ToString("x2"))),
                    mode = mode,
                    paymentUrl = paymentUrl,
                    paymentCallbaclUrl = this.Request.RequestUri.OriginalString.Replace("confirmOrder", "paymentCallback"),
                    items = result.Invoice.Items
                        .Where(x => x.LineItemType == LineItemType.Product)
                        .Select(x => new
                        {
                            key = x.Key,
                            name = x.Name,
                            price = x.Price.ToString("0.00"),
                            quantity = x.Quantity
                        })
                };

                return Ok(response);
            }
        }

        [HttpGet]
        [ActionName("PaymentCallback")]
        public IHttpActionResult PaymentCallback(int wsb_order_num, string wsb_tid = null)
        {
            this.CheckPayment(wsb_order_num, wsb_tid);
            return Redirect($"{this.Request.RequestUri.Scheme}://{this.Request.RequestUri.Host}");
        }

        [HttpPost]
        [ActionName("PaymentCallback")]
        public IHttpActionResult PaymentNotify(WebPayNotification notification)
        {
            string signature = null;
            using (var hasher = MD5.Create())
            {
                signature = string.Join("", hasher.ComputeHash(Encoding.UTF8.GetBytes($"{notification.batch_timestamp}{notification.currency_id}{notification.amount}{notification.payment_method}{notification.order_id}{notification.site_order_id}{notification.transaction_id}{notification.payment_type}{notification.rrn}{ConfigurationManager.AppSettings["webpay.secret"]}")).Select(x => x.ToString("x2")));
            }

            if (notification.wsb_signature != signature)
            {
                Logger.Warn(this.GetType(), $"Payment notification signatures aren't match.\nModel [{JsonConvert.SerializeObject(notification)}]\nSignature - {signature}");
                return BadRequest();
            }

            var invoice = this.CheckoutManager.Context.Services.InvoiceService.GetByInvoiceNumber(notification.site_order_id);
            if (invoice.InvoiceStatus.Name == "Unpaid" && SuccessPaymentTYpes.Contains(notification.payment_type))
            {
                var payment = invoice.Payments().First();
                invoice.CapturePayment(payment, this.GatewayContext.Payment.GetPaymentGatewayMethodByKey(payment.PaymentMethodKey.Value), Convert.ToDecimal(notification.amount));
            }

            return Ok();
        }

        private void CheckPayment(int invoiceNumber, string transactionId)
        {
            var invoice = this.CheckoutManager.Context.Services.InvoiceService.GetByInvoiceNumber(invoiceNumber);
            if (invoice.InvoiceStatus.Name != "Unpaid")
            {
                return;
            }


        }
    }
}