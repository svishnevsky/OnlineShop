using Merchello.Core;
using Merchello.Core.Models;
using OnlineShop.Web.Models;
using System;
using System.Linq;
using System.Web.Http;
using Umbraco.Web;

namespace OnlineShop.Web.Controllers
{
    public partial class ClientController
    {
        [HttpGet]
        [ActionName("Billing")]
        [Authorize]
        public IHttpActionResult GetBilling()
        {
            var address = this.CheckoutManager.Customer.GetBillToAddress();
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
        [ActionName("Billing")]
        [Authorize]
        public IHttpActionResult UdateBilling(AddressModel model)
        {
            var address = new Address
            {
                Address1 = model.Address,
                Phone = model.Phone,
                PostalCode = model.PostCode,
                Region = model.City,
                Name = model.Name,
                AddressType = AddressType.Billing,
                CountryCode = "BY"
            };

            this.CheckoutManager.Customer.SaveBillToAddress(address);
            var member = Members.GetCurrentMemberProfileModel();
            var nameParts = model.Name.Split(new[] { ' ' }, StringSplitOptions.RemoveEmptyEntries);
            member.MemberProperties.First(p => p.Alias == "firstName").Value = nameParts.First();
            member.MemberProperties.First(p => p.Alias == "lastName").Value = nameParts.Count() > 1 ? nameParts[1] : null;
            Members.UpdateMemberProfile(member);

            if (!CurrentCustomer.IsAnonymous)
            {
                var customer = (ICustomer)CurrentCustomer;
                var existing = customer.DefaultCustomerAddress(AddressType.Billing);
                var caddress = ToCustomerAddress(address, (ICustomer)CurrentCustomer, "Адрес плательщика", AddressType.Billing);
                if (existing != null)
                {
                    caddress.CreateDate = existing.CreateDate;
                    caddress.Key = existing.Key;
                }

                ((ICustomer)CurrentCustomer).SaveCustomerAddress(caddress);
            }

            return Ok();
        }

        internal static ICustomerAddress ToCustomerAddress(IAddress address, ICustomer customer, string label, AddressType addressType)
        {
            return new CustomerAddress(customer.Key)
            {
                Label = label,
                FullName = address.Name,
                Address1 = address.Address1,
                Address2 = address.Address2,
                Locality = address.Locality,
                Region = address.Region,
                PostalCode = address.PostalCode,
                CountryCode = address.CountryCode,
                Phone = address.Phone,
                Company = address.Organization,
                AddressType = addressType
            };
        }

    }
}
