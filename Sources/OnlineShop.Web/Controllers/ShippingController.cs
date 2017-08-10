﻿using Merchello.Core;
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
        [ActionName("Shipping")]
        [Authorize]
        public IHttpActionResult GetShipping()
        {
            var address = ((ICustomer)CustomerContext.CurrentCustomer).DefaultCustomerAddress(AddressType.Shipping);
            var member = Members.GetCurrentMember();
            return Ok(new
            {
                name = address?.FullName ?? $"{member.GetPropertyValue<string>("firstName")} {member.GetPropertyValue<string>("lastName")}".Trim(),
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
            var customer = ((ICustomer)CustomerContext.CurrentCustomer);
            var address = customer.DefaultCustomerAddress(AddressType.Shipping) ?? new CustomerAddress(customer.Key) { AddressType = AddressType.Shipping };
            address.FullName = model.Name;
            address.Region = model.City;
            address.Phone = model.Phone;
            address.Address1 = model.Address;
            address.PostalCode = model.PostCode;
            customer.SaveCustomerAddress(address);
            var member = Members.GetCurrentMemberProfileModel();
            var nameParts = model.Name.Split(new[] { ' ' }, StringSplitOptions.RemoveEmptyEntries);
            member.MemberProperties.First( p => p.Alias == "firstName").Value = nameParts.First();
            member.MemberProperties.First(p => p.Alias == "lastName").Value = nameParts.Count() > 1 ? nameParts[1] : null;
            Members.UpdateMemberProfile(member);
            return Ok();
        }

    }
}
