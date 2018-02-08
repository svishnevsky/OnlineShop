namespace OnlineShop.Web.Models
{
    public class WebPayNotification
    {
        public int site_order_id { get; set; }

        public string transaction_id { get; set; }

        public string payment_type { get; set; }

        public decimal amount { get; set; }
    }
}
