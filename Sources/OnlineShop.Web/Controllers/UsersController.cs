using OnlineShop.Web.Models;
using System;
using System.Dynamic;
using System.IO;
using System.Net;
using System.Net.Mail;
using System.Text;
using System.Web;
using System.Web.Helpers;
using System.Web.Http;
using System.Web.Mvc;
using System.Web.Routing;
using System.Web.Security;
using Umbraco.Core.Models;
using Umbraco.Web;
using Umbraco.Web.Models;

namespace OnlineShop.Web.Controllers
{
    public partial class ClientController
    {
        [System.Web.Http.HttpGet]
        [System.Web.Http.ActionName("Users")]
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
            
            return Ok(new { name = $"{member.GetPropertyValue<string>("firstName")}" });
        }

        [System.Web.Http.HttpPost]
        [System.Web.Http.ActionName("Users")]
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
                case MembershipCreateStatus.DuplicateUserName:
                case MembershipCreateStatus.DuplicateEmail:
                    return BadRequest("Пользователь с таким email-адресом уже зарегистрирован.");
                case MembershipCreateStatus.InvalidPassword:
                    return BadRequest("Пароль слишком простой.");
                case MembershipCreateStatus.Success:
                    var membership = ApplicationContext.Services.MemberService.GetByEmail(model.Email);
                    ApplicationContext.Services.MemberService.AssignRole(membership.Id, "Customers");
                    ApplicationContext.Services.MemberService.Save(membership);
                    return Created(string.Empty, new { id = membership.Id, name = membership.GetValue<string>("firstName") });
                default:
                    return BadRequest("Произошла ошибка. Попробуйте снова");
            }
        }

        [System.Web.Http.HttpDelete]
        [System.Web.Http.ActionName("Users")]
        [System.Web.Http.Authorize]
        public IHttpActionResult Logout()
        {
            Members.Logout();
            return Ok();
        }

        [System.Web.Http.HttpPatch]
        [System.Web.Http.ActionName("Users")]
        [System.Web.Http.Authorize]
        public IHttpActionResult ChangePassword([FromBody]ChangePasswordModel model)
        {
            var member = Services.MemberService.GetById(Members.GetCurrentMemberId());
            Services.MemberService.SavePassword(member, model.Password);
            return Ok();
        }

        [System.Web.Http.HttpPut]
        [System.Web.Http.ActionName("Users")]
        public IHttpActionResult RestorePassword([FromBody]RestorePasswordModel model)
        {
            var member = Services.MemberService.GetByUsername(model.Username);
            if (member == null)
            {
                return NotValid();
            }

            var password = Membership.GeneratePassword(8, 2);
            Services.MemberService.SavePassword(member, password);

            string body;
            using (var writer = new StringWriter())
            {
                var routeData = new RouteData();
                routeData.Values.Add("controller", "Fake");
                var fakeControllerContext = new ControllerContext(new HttpContextWrapper(new HttpContext(new HttpRequest(null, "https://iibb.by", null), new HttpResponse(null))), routeData, new FakeController());
                var razorViewEngine = new RazorViewEngine();
                var razorViewResult = razorViewEngine.FindView(fakeControllerContext, "EmailForgotPassword", "", false);

                dynamic data = new ExpandoObject();
                data.Name = member.Name;
                data.Password = password;
                var viewContext = new ViewContext(fakeControllerContext, razorViewResult.View, new ViewDataDictionary(data), new TempDataDictionary(), writer);
                razorViewResult.View.Render(viewContext, writer);
                body = writer.ToString();
            }

            var message = new MailMessage();
            message.To.Add(new MailAddress(model.Username));
            message.From = new MailAddress("no-reply@iibb.by"); 
            message.Subject = "Восстановление пароля Irene Italiano BOUTIQUE BIJOUTERIE";
            message.Body = body;
            message.IsBodyHtml = true;

            using (var smtp = new SmtpClient())
            {
                smtp.Send(message);
            }

            return Ok();
        }

        private class FakeController : ControllerBase { protected override void ExecuteCore() { } }
    }    
}
