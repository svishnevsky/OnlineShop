using Merchello.Core;
using Merchello.Core.Checkout;
using Merchello.Core.Gateways;
using Merchello.Core.Gateways.Shipping;
using Merchello.Core.Models;
using Merchello.Web;
using Merchello.Web.Factories;
using Newtonsoft.Json;
using OnlineShop.Web.Models;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Globalization;
using System.Linq;
using System.Net.Http;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using System.Web.Http;
using System.Xml.Serialization;

namespace OnlineShop.Web.Controllers
{
    public partial class ClientController
    {
        private static readonly string[] SuccessPaymentTypes = new[] { "1", "4", "10" };

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
        public async Task<IHttpActionResult> PaymentCallback(int wsb_order_num, string wsb_tid = null)
        {
            if (!string.IsNullOrEmpty(wsb_tid))
            {
                await this.CheckPayment(wsb_order_num, wsb_tid);
            }

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
                Logger.Warn(this.GetType(), $"Payment notification signatures aren't match., Model [{0}], Signature - {1}", () => JsonConvert.SerializeObject(notification), () => signature);
                return BadRequest();
            }

            var invoice = this.CheckoutManager.Context.Services.InvoiceService.GetByInvoiceNumber(notification.site_order_id);
            if (invoice.InvoiceStatus.Name == "Unpaid" && SuccessPaymentTypes.Contains(notification.payment_type))
            {
                var payment = invoice.Payments().First();
                invoice.CapturePayment(payment, this.GatewayContext.Payment.GetPaymentGatewayMethodByKey(payment.PaymentMethodKey.Value), Convert.ToDecimal(notification.amount, CultureInfo.InvariantCulture));
                var note = this.CheckoutManager.Context.Services.NoteService.CreateNote(invoice.Key, EntityType.Invoice, $"TransactionId: {notification.transaction_id}, OrderNumber: {notification.order_id}, rrn: {notification.rrn}, PaymentMethod: {notification.payment_method}");
                this.CheckoutManager.Context.Services.NoteService.Save(note);
                Logger.Debug(this.GetType(), "Invoice {0} paid.", () => invoice.InvoiceNumber);
            }

            return Ok();
        }

        private async Task CheckPayment(int invoiceNumber, string transactionId)
        {
            var invoice = this.CheckoutManager.Context.Services.InvoiceService.GetByInvoiceNumber(invoiceNumber);
            if (invoice.InvoiceStatus.Name != "Unpaid")
            {
                return;
            }

            using (var client = new HttpClient())
            {
                var request = new HttpRequestMessage(HttpMethod.Post, ConfigurationManager.AppSettings["webpay.apiUrl"]);
                request.Content = new FormUrlEncodedContent(new[] {
                    new KeyValuePair<string, string>("*API", ""),
                    new KeyValuePair<string, string>("API_XML_REQUEST", string.Format(ApiRequestFormat, ConfigurationManager.AppSettings["webpay.username"], ConfigurationManager.AppSettings["webpay.password"], transactionId))
                });
                var response = await client.SendAsync(request);
                var serializer = new XmlSerializer(typeof(WebPayTransactionResponse));
                var stream = await response.Content.ReadAsStreamAsync();
                var transactionInfo = serializer.Deserialize(stream) as WebPayTransactionResponse;
                if (transactionInfo.Status == "success")
                {
                    if (invoice.InvoiceStatus.Name == "Unpaid" && SuccessPaymentTypes.Contains(transactionInfo.Fields.payment_type))
                    {
                        string signature = null;
                        using (var hasher = MD5.Create())
                        {
                            signature = string.Join("", hasher.ComputeHash(Encoding.UTF8.GetBytes($"{transactionInfo.Fields.transaction_id}{transactionInfo.Fields.batch_timestamp}{transactionInfo.Fields.currency_id}{transactionInfo.Fields.amount}{transactionInfo.Fields.payment_method}{transactionInfo.Fields.payment_type}{transactionInfo.Fields.order_id}{transactionInfo.Fields.rrn}{ConfigurationManager.AppSettings["webpay.secret"]}")).Select(x => x.ToString("x2")));
                        }

                        if (transactionInfo.Fields.wsb_signature != signature)
                        {
                            Logger.Warn(this.GetType(), $"Payment notification signatures aren't match., Model [{0}], Signature - {1}", () => JsonConvert.SerializeObject(transactionInfo), () => signature);
                        }
                        else
                        {
                            var payment = invoice.Payments().First();
                            invoice.CapturePayment(payment, this.GatewayContext.Payment.GetPaymentGatewayMethodByKey(payment.PaymentMethodKey.Value), Convert.ToDecimal(transactionInfo.Fields.amount, CultureInfo.InvariantCulture));
                            var note = this.CheckoutManager.Context.Services.NoteService.CreateNote(invoice.Key, EntityType.Invoice, $"TransactionId: {transactionInfo.Fields.transaction_id}, OrderNumber: {transactionInfo.Fields.order_id}, rrn: {transactionInfo.Fields.rrn}, PaymentMethod: {transactionInfo.Fields.payment_method}");
                            this.CheckoutManager.Context.Services.NoteService.Save(note);
                            Logger.Debug(this.GetType(), "Invoice {0} paid.", () => invoice.InvoiceNumber);
                        }
                    }
                }
            }
        }

        private const string ApiRequestFormat = "<?xml version=\"1.0\" encoding=\"ISO-8859-1\" ?><wsb_api_request><command>get_transaction</command><authorization><username>{0}</username><password>{1}</password></authorization><fields><transaction_id>{2}</transaction_id></fields></wsb_api_request>";
    }
}