using Merchello.Core;
using Merchello.Core.Checkout;
using Merchello.Core.Gateways;
using Merchello.Core.Gateways.Shipping;
using Merchello.Web;
using Merchello.Web.Factories;
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
        [ActionName("confirmOrder")]
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
                    storeId = storeId,
                    seed = seed,
                    currency = currency,
                    signature = string.Join("", hasher.ComputeHash(Encoding.UTF8.GetBytes($"{seed}{storeId}{result.Invoice.InvoiceNumber}{mode}{currency}{result.Invoice.Total.ToString("0.00")}{secret}")).Select(x => x.ToString("x2"))),
                    mode = mode,
                    paymentUrl = paymentUrl,
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
    }
}