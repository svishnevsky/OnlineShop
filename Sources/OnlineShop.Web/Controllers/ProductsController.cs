using System.Linq;
using Merchello.Web;
using System.Web.Http;
using Merchello.Web.Models.ContentEditing;
using System;
using Newtonsoft.Json;
using Umbraco.Core.Models;
using System.Collections.Generic;

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
                .Select(this.MapProductListItem)
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
                sku = p.Sku,
                price = p.Price,
                salePrice = p.SalePrice,
                onSale = p.OnSale,
                description = this.GetDetachedValue<string>(p, "description"),
                categories = p.AsProductContent().Collections().Select(c => new { name = c.Name, key = c.Key }),
                images = this.GetImages(Umbraco.TypedMedia(this.GetDetachedValue<int>(p, "images"))),
                relatedProducts = this.GetDetachedValue<Guid[]>(p, "relatedProducts")
                .Select(helper.Query.Product.GetByKey)
                .Select(this.MapProductListItem)
                .ToList()
            };

            return Ok(product);
        }

        private IEnumerable<object> GetImages(IPublishedContent publishedContent)
        {
            return publishedContent.ContentType.Alias == "Folder"
                ? publishedContent.Children.Select(x => new { url = x.Url, name = x.Name }).ToArray()
                : new[] { new { url = publishedContent.Url, name = publishedContent.Name } };
        }

        private T GetDetachedValue<T>(ProductDisplay product, string key)
        {
            if (!product.DetachedContents?
                .FirstOrDefault()?
                .DetachedDataValues
                .Any(v => v.Key == key) ?? true)
            {
                return default(T);
            }

            return JsonConvert.DeserializeObject<T>(
                product.DetachedContents
                .First()
                .DetachedDataValues
                .First(v => v.Key == key)
                .Value);
        }

        private object MapProductListItem(ProductDisplay product)
        {
            return new
            {
                key = product.Key,
                name = product.Name,
                price = product.OnSale ? product.SalePrice : product.Price,
                categories = product.AsProductContent().Collections().Select(c => new { name = c.Name, key = c.Key }),
                images = this.GetImages(Umbraco.TypedMedia(this.GetDetachedValue<int>(product, "images")))
            };
        }
    }
}
