using Merchello.Web;
using Merchello.Web.Pluggable;
using Newtonsoft.Json;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Web.Http;
using Umbraco.Web.WebApi;

namespace OnlineShop.Web.Controllers
{
    public partial class ClientController : UmbracoApiController
    {
        protected MerchelloHelper Helper => new MerchelloHelper();
        protected ICustomerContext CustomerContext => PluggableObjectHelper.GetInstance<CustomerContextBase>("CustomerContext", UmbracoContext);

        public IHttpActionResult NotValid()
        {
            var message = new HttpResponseMessage(HttpStatusCode.BadRequest)
            {
                Content = new StringContent(JsonConvert.SerializeObject(new { errors = ModelState.Values.SelectMany(v => v.Errors.Select(e => e.ErrorMessage)) }), Encoding.UTF8, "application/json")
            };

            return ResponseMessage(message);
        }
    }
}
