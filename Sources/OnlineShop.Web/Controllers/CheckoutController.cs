using Merchello.Core;
using Merchello.Core.Checkout;
using Merchello.Core.Gateways;
using Merchello.Core.Gateways.Shipping;
using Merchello.Web;
using Merchello.Web.Factories;
using OnlineShop.Web.Models;
using System.Linq;
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

            return Ok(new
            {
                number = result.Invoice.InvoiceNumber,
                total = result.Invoice.Total,
                status = result.Invoice.InvoiceStatus.Name.ToLower(),
                paymentMethod = paymentMethod.PaymentMethod.Name,
                shippingMethod = quoteAttemp.Result.ShipMethod.Name,
                items = result.Invoice.Items
                    .Where(x => x.LineItemType == LineItemType.Product)
                    .Select(x => new
                    {
                        key = x.Key,
                        name = x.Name,
                        price = x.Price,
                        quantity = x.Quantity
                    })
            });
        }
    }
}