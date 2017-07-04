using OnlineShop.Web.Models;
using System;
using System.Text;
using System.Web;
using System.Web.Http;
using System.Web.Security;
using Umbraco.Core.Models;
using Umbraco.Web;
using Umbraco.Web.Models;

namespace OnlineShop.Web.Controllers
{
    public partial class ClientController
    {
        [HttpGet]
        [ActionName("Users")]
        public IHttpActionResult GetUser()
        {
            IPublishedContent member = null;
            if (!Members.IsLoggedIn())
            {
                if (Request.Headers.Authorization == null || Request.Headers.Authorization.Scheme.ToUpper() != "BASIC")
                {
                    return Unauthorized();
                }

                var token = Encoding.UTF8.GetString(Convert.FromBase64String(Request.Headers.Authorization.Parameter));
                var userName = token.Substring(0, token.IndexOf('|'));
                var password = token.Substring(token.IndexOf('|') + 1);
                if (!Members.Login(userName, password))
                {
                    return Unauthorized();
                }

                member = Members.GetByUsername(userName);
            }

            HttpContext.Current.Response.AppendHeader("Set-Cookie", "*");
            return Ok(new { name = $"{member.GetPropertyValue<string>("firstName")}" });
        }

        [HttpPost]
        [ActionName("Users")]
        public IHttpActionResult AddUser([FromBody]NewUser model)
        {
            if (!ModelState.IsValid)
            {
                return NotValid();
            }

            var registerModel = Members.CreateRegistrationModel("customer");
            registerModel.Name = $"{model.FirstName} {model.LastName}".Trim();
            registerModel.Email = model.Email;
            registerModel.Password = model.Password;
            registerModel.Username = model.Email;
            registerModel.UsernameIsEmail = true;

            var fn = new UmbracoProperty { Alias = "firstName", Name = "First Name", Value = model.FirstName.Trim() };
            var ln = new UmbracoProperty { Alias = "lastName", Name = "Last Name", Value = model.LastName.Trim() };
            registerModel.MemberProperties.Add(fn);
            registerModel.MemberProperties.Add(ln);

            Members.RegisterMember(registerModel, out MembershipCreateStatus status, true);

            switch (status)
            {
                case MembershipCreateStatus.DuplicateEmail:
                    return BadRequest("Пользователь с таким email-адресом уже зарегистрирован.");
                case MembershipCreateStatus.Success:
                    var membership = ApplicationContext.Services.MemberService.GetByEmail(model.Email);
                    ApplicationContext.Services.MemberService.AssignRole(membership.Id, "Customers");
                    ApplicationContext.Services.MemberService.Save(membership);
                    return Created(string.Empty, new { id = membership.Id, name = membership.GetValue<string>("firstName") });
                default:
                    return BadRequest("Произошла ошибка. Попробуйте снова");
            }
        }
    }
}
