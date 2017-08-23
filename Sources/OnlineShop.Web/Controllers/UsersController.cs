using OnlineShop.Web.Models;
using System;
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

        [HttpDelete]
        [ActionName("Users")]
        [Authorize]
        public IHttpActionResult Logout()
        {
            Members.Logout();
            return Ok();
        }

        [HttpPatch]
        [ActionName("Users")]
        [Authorize]
        public IHttpActionResult ChangePassword([FromBody]ChangePasswordModel model)
        {
            var member = Services.MemberService.GetById(Members.GetCurrentMemberId());
            Services.MemberService.SavePassword(member, model.Password);
            return Ok();
        }

        [HttpPut]
        [ActionName("Users")]
        [Authorize]
        public IHttpActionResult RestorePassword([FromBody]RestorePasswordModel model)
        {
            var member = Services.MemberService.GetByUsername(model.Username);
            var password = Membership.GeneratePassword(8, 2);
            //Services.MemberService.SavePassword(member, password);

            //var body = "<p>Email From: {0} ({1})</p><p>Message:</p><b>{2}</b>";
            //using (var writer = new StringWriter())
            //{
            //    var routeData = new RouteData();
            //    routeData.Values.Add("controller", controllerName);
            //    var fakeControllerContext = new ControllerContext(new HttpContextWrapper(new HttpContext(new HttpRequest(null, "http://google.com", null), new HttpResponse(null))), this);
            //    var razorViewEngine = new RazorViewEngine();
            //    var razorViewResult = razorViewEngine.FindView(fakeControllerContext, "ForgotPassword", "", false);

            //    var viewContext = new ViewContext(fakeControllerContext, razorViewResult.View, new ViewDataDictionary(), new TempDataDictionary(), writer);
            //    razorViewResult.View.Render(viewContext, writer);
            //    return writer.ToString();
            //}

            //var message = new MailMessage();
            //message.To.Add(new MailAddress("something@gmail.com"));  // replace with valid value 
            //message.From = new MailAddress(model.Username);  // replace with valid value
            //message.Subject = "Восстановление пароля Irene Italiano BOUTIQUE BIJOUTERIE";
            //message.Body = string.Format(body, name, email, message);
            //message.IsBodyHtml = true;

            //using (var smtp = new SmtpClient())
            //{
            //    var credential = new NetworkCredential
            //    {
            //        UserName = "something@gmail.com",  // replace with valid value
            //        Password = "********"  // replace with valid value
            //    };
            //    smtp.Credentials = credential;
            //    smtp.Host = "smtp.gmail.com ";
            //    smtp.Port = 587;
            //    smtp.EnableSsl = true;
            //}
            return Ok();
        }
    }
}
