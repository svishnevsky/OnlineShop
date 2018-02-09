using System.Linq;
using System.Web.Http;
using Merchello.Core;

namespace OnlineShop.Web.Controllers
{
    public partial class ClientController
    {
        [HttpGet]
        [ActionName("Orders")]
        public IHttpActionResult GetOrders(int page = 1, int pageSize = 1000)
        {
            var orders = this.Helper.Query.Invoice.GetByCustomerKey(this.CurrentCustomer.Key)
                .OrderByDescending(x => x.InvoiceDate)
                .Select(x => new {
                    number = x.InvoiceNumber,
                    total = x.Total,
                    status = x.InvoiceStatus.Name.ToLower(),
                    date = x.InvoiceDate.ToString("yyyy-MM-dd"),
                    items = x.Items
                        .Where(p => p.LineItemType == LineItemType.Product)
                        .Select(p => new
                        {
                            key = p.Key,
                            name = p.Name,
                            price = p.Price,
                            quantity = p.Quantity
                        })
                })
                .ToList();

            return Ok(new { orders });
        }
    }
}