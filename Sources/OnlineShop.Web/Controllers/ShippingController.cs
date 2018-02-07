using Merchello.Core;
using Merchello.Core.Models;
using OnlineShop.Web.Models;
using System.Web.Http;
using Umbraco.Web;

namespace OnlineShop.Web.Controllers
{
    public partial class ClientController
    {
        [HttpGet]
        [ActionName("Shipping")]
        [Authorize]
        public IHttpActionResult GetShipping()
        {
            var address = this.CheckoutManager.Customer.GetShipToAddress();
            var member = Members.GetCurrentMember();
            return Ok(new
            {
                name = address?.Name ?? $"{member.GetPropertyValue<string>("firstName")} {member.GetPropertyValue<string>("lastName")}".Trim(),
                city = address?.Region,
                address = address?.Address1,
                phone = address?.Phone,
                postCode = address?.PostalCode
            });
        }

        [HttpPut]
        [ActionName("Shipping")]
        [Authorize]
        public IHttpActionResult UdateShipping(AddressModel model)
        {
            var address = new Address
            {
                Address1 = model.Address,
                Phone = model.Phone,
                PostalCode = model.PostCode,
                Region = model.City,
                Name = model.Name,
                CountryCode = "BY"
            };

            this.CheckoutManager.Customer.SaveShipToAddress(address);
            if (!CurrentCustomer.IsAnonymous)
            {
                var customer = (ICustomer)CurrentCustomer;
                var existing = customer.DefaultCustomerAddress(AddressType.Shipping);
                var caddress = ToCustomerAddress(address, (ICustomer)CurrentCustomer, "Адрес доставки", AddressType.Shipping);
                if (existing != null)
                {
                    caddress.CreateDate = existing.CreateDate;
                    caddress.Key = existing.Key;
                }

                ((ICustomer)CurrentCustomer).SaveCustomerAddress(caddress);
            }

            return Ok();
        }
    }
}
