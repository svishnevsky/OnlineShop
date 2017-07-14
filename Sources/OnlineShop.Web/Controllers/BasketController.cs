using Merchello.Web;
using OnlineShop.Web.Models;
using System.Linq;
using System.Web.Http;
using Merchello.Core.Models;
using System;
using System.Collections.Generic;
using Merchello.Web.Models.ContentEditing;

namespace OnlineShop.Web.Controllers
{
    public partial class ClientController
    {
        private readonly Dictionary<string, string> optionNameMapping = new Dictionary<string, string> { ["Color"] = "Цвет", ["Size"] = "Размер" };

        [HttpPost]
        [ActionName("Basket")]
        public IHttpActionResult AddToBasket(AddBasketItemModel model)
        {
            var product = this.Helper.Query.Product.GetByKey(model.Key);
            var qty = !model.Quantity.HasValue || model.Quantity <= 0 ? 1 : model.Quantity.Value;
            var basket = this.CustomerContext.CurrentCustomer.Basket();
            if (product != null)
            {
                var exists = basket.Items.FirstOrDefault(item => item.ExtendedData["merchProductKey"] == model.Key.ToString());
                if (exists == null)
                {
                    basket.AddItem(product, qty);
                }
                else
                {
                    basket.UpdateQuantity(exists.Key, exists.Quantity + qty);
                }
            }
            else
            {
                var variant = this.Helper.Query.Product.GetProductVariantByKey(model.Key);
                if (variant == null)
                {
                    return NotFound();
                }

                var exists = basket.Items.FirstOrDefault(item => item.ExtendedData["merchProductVariantKey"] == model.Key.ToString());
                if (exists == null)
                {
                    basket.AddItem(variant, qty);
                }
                else
                {
                    basket.UpdateQuantity(exists.Key, exists.Quantity + qty);
                }
            }

            basket.Save();
            return this.GetBasket();
        }

        [HttpGet]
        [ActionName("Basket")]
        public IHttpActionResult GetBasket()
        {
            var basket = this.CustomerContext.CurrentCustomer.Basket();

            return Ok(new
            {
                items = basket.Items.Select(this.MapBasketItem),
                totalCount = basket.TotalQuantityCount,
                totalPrice = basket.TotalBasketPrice
            });
        }

        private object MapBasketItem(ILineItem item)
        {
            var product = this.Helper.Query.Product.GetByKey(new Guid(item.ExtendedData["merchProductKey"]));
            var variant = item.ExtendedData.ContainsKey("merchProductVariantKey")
                ? this.Helper.Query.Product.GetProductVariantByKey(new Guid(item.ExtendedData["merchProductVariantKey"]))
                : null;
            return new
            {
                key = item.Key,
                name = product.Name,
                price = item.Price,
                quantity = item.Quantity,
                total = item.TotalPrice,
                sku = item.Sku,
                image = this.GetImages(Umbraco.TypedMedia(this.GetDetachedValue<int>(product, "images")))?.FirstOrDefault(),
                options = variant == null ? null : this.GetBasketItemOptions(variant.Attributes, product.ProductOptions),
                category = product.AsProductContent().Collections().FirstOrDefault()?.Name,
                available = variant == null ? product.TrackInventory ? product.TotalInventoryCount : int.MaxValue : variant.TrackInventory ? variant.TotalInventoryCount : int.MaxValue
            };
        }

        private IEnumerable<object> GetBasketItemOptions(IEnumerable<ProductAttributeDisplay> attributes, IEnumerable<ProductOptionDisplay> productOptions)
        {
            var options = new List<object>();
            foreach (var a in attributes)
            {
                options.Add(new { name = this.Translate(productOptions.First(o => o.Key == a.OptionKey).Name), value = a.Name });
            }

            return options;
        }

        private object Translate(string name)
        {
            return this.optionNameMapping.ContainsKey(name) ? this.optionNameMapping[name] : name;
        }
    }
}
