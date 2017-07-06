using System.Linq;
using Merchello.Web;
using System.Web.Http;
using Merchello.Web.Models.ContentEditing;
using System;

namespace OnlineShop.Web.Controllers
{
    public partial class ClientController
    {
        [HttpGet]
        [ActionName("Products")]
        public IHttpActionResult GetProducts(int page = 1, int pageSize = 1000)
        {
            var helper = new MerchelloHelper();
            var products = helper.Query.Product.Search(page, pageSize).Items
                .Cast<ProductDisplay>()
                .Select(p => new
                {
                    key = p.Key,
                    name = p.Name,
                    price = p.Price,
                    categories = p.AsProductContent().Collections().Select(c => new { name = c.Name, key = c.Key }),
                    images = p.DetachedContents?
                    .FirstOrDefault()?
                    .DetachedDataValues
                    .Where(v => v.Key == "images")
                    .Select(i => Umbraco.TypedMedia(Convert.ToInt32(i.Value.Trim('"'))))
                    .SelectMany(i => i.ContentType.Alias == "Folder" ? i.Children.Select(x => new { url = x.Url, name = x.Name }) : new[] { new { url = i.Url, name = i.Name } })
                })
                .ToList();
            return Ok(new { products });
        }

        [HttpGet]
        [ActionName("Products")]
        public IHttpActionResult GetProduct(Guid key)
        {
            var helper = new MerchelloHelper();
            var p = helper.Query.Product.GetByKey(key);
            var product = new
            {
                key = p.Key,
                name = p.Name,
                price = p.Price,
                categories = p.AsProductContent().Collections().Select(c => new { name = c.Name, key = c.Key }),
                images = p.DetachedContents?
                .FirstOrDefault()?
                .DetachedDataValues
                .Where(v => v.Key == "images")
                .Select(i => Umbraco.TypedMedia(Convert.ToInt32(i.Value.Trim('"'))))
                .SelectMany(i => i.ContentType.Alias == "Folder" ? i.Children.Select(x => new { url = x.Url, name = x.Name }) : new[] { new { url = i.Url, name = i.Name } })
            };

            return Ok(product);
        }
    }


}
