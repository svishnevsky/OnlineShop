using Merchello.Core;
using Merchello.Core.Checkout;
using Merchello.Core.Gateways.Shipping;
using Merchello.Web;
using Merchello.Web.Factories;
using OnlineShop.Web.Models;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;

namespace OnlineShop.Web.Controllers
{
    public partial class ClientController
    {
        private static readonly IDictionary<string, object> shippingProvidersMap = new Dictionary<string, object>
        {
            {"Belpost", new { name = "Белпочта",  term = "2-5 дня", key = "belpost" } },
            {"Carrier", new { name = "Курьер",  term = "1-3 дня", key = "carrier" }  }
        };

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

        [HttpGet]
        [ActionName("ShippingProviders")]
        public IHttpActionResult GetShippingProviders()
        {
            var providers = MerchelloContext.Current.Gateways.Shipping.GetAllActivatedProviders()
                .Cast<ShippingGatewayProviderBase>()
                .SelectMany(x => x.ShipMethods)
                .Where(x => shippingProvidersMap.ContainsKey(x.Name))
                .Select(x => shippingProvidersMap[x.Name])
                .ToList();
            return Ok(new { providers = providers });
        }

        [HttpPost]
        [ActionName("confirmOrder")]
        public IHttpActionResult ConfirmCheckout(CheckoutModel model)
        {

            return Ok();
        }
    }
}