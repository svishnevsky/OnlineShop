using System;

namespace OnlineShop.Web.Models
{
    public class AddBasketItemModel
    {
        public Guid Key { get; set; }

        public int? Quantity { get; set; }
    }
}
