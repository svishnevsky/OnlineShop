using System.Xml.Serialization;

namespace OnlineShop.Web.Models
{
    [XmlRoot("wsb_api_response")]
    public class WebPayTransactionResponse
    {
        [XmlElement("status")]
        public string Status { get; set; }

        [XmlElement("fields")]
        public WebPayTransactionResponseFields Fields { get; set; }
    }

    [XmlRoot("fields")]
    public class WebPayTransactionResponseFields
    {
        [XmlElement("transaction_id")]
        public string transaction_id { get; set; }

        [XmlElement("batch_timestamp")]
        public string batch_timestamp { get; set; }

        [XmlElement("currency_id")]
        public string currency_id { get; set; }

        [XmlElement("amount")]
        public string amount { get; set; }

        [XmlElement("payment_method")]
        public string payment_method { get; set; }

        [XmlElement("payment_type")]
        public string payment_type { get; set; }

        [XmlElement("order_id")]
        public string order_id { get; set; }

        [XmlElement("order_num")]
        public string order_num { get; set; }

        [XmlElement("rrn")]
        public string rrn { get; set; }

        [XmlElement("wsb_signature")]
        public string wsb_signature { get; set; }
    }
}