using Merchello.Web;
using OnlineShop.Web.Models;
using System.Linq;
using System.Web.Http;

namespace OnlineShop.Web.Controllers
{
    public partial class ClientController
    {
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
                items = basket.Items.Select(item => new
                {
                    key = item.Key,
                    name = item.Name,
                    price = item.Price,
                    quantity = item.Quantity,
                    total = item.TotalPrice,
                    sku = item.Sku
                }),
                totalCount = basket.TotalQuantityCount,
                totalPrice = basket.TotalBasketPrice
            });
        }
    }
}
