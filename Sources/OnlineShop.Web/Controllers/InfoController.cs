using System.Linq;
using System.Web;
using System.Web.Http;

namespace OnlineShop.Web.Controllers
{
    public partial class ClientController
    {
        [HttpGet]
        [ActionName("Info")]
        public IHttpActionResult GetInfo(string alias)
        {
            var root = Umbraco.ContentQuery.TypedContentAtRoot().First();
            var value = root.Properties.FirstOrDefault(p => p.PropertyTypeAlias == alias)?.Value as IHtmlString;
            return Ok(new { content = value.ToString().Replace("\r\n", string.Empty) });
        }
    }
}
