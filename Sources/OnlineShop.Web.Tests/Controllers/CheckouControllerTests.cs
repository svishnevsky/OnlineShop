using Microsoft.VisualStudio.TestTools.UnitTesting;
using System.Configuration;
using System.Linq;
using System.Security.Cryptography;
using System.Text;

namespace OnlineShop.Web.Tests.Controllers
{
    [TestClass]
    public class CheckouControllerTests
    {
        [TestMethod]
        public void GenerateSignatureTest()
        {
            var seed = 1242649174;
            var storeId = 11111111;
            var orderNum = "ORDER-12345678";
            var test = 1;
            var currency = "BYN";
            var total = "21.95";
            var secretKey = "12345678901234567890";
            var signatureText = $"{seed}{storeId}{orderNum}{test}{currency}{total}{secretKey}";

            using (var hasher = new SHA1Managed())
            {
                var signature = string.Join("", hasher.ComputeHash(Encoding.UTF8.GetBytes(signatureText)).Select(x => x.ToString("x2")));

                Assert.AreEqual("124264917411111111ORDER-123456781BYN21.9512345678901234567890", signatureText);
                Assert.AreEqual("912702512e447846add6fa4985c7a2f271de52e6", signature);
            }
        }

        [TestMethod]
        public void GenerateNotifySignatureTest()
        {
            var site_order_id = 26;
            var transaction_id = "725639513";
            var payment_type = "4";
            var amount = "11.5";
            var batch_timestamp = "1518160712";
            var currency_id = "BYN";
            var payment_method = "cc";
            var order_id = "88061";
            var rrn = "143279462230";
            var wsb_signature = "da690a75e9dd091ac27ac0cc27442860";
            var signatureText = $"{batch_timestamp}{currency_id}{amount}{payment_method}{order_id}{site_order_id}{transaction_id}{payment_type}{rrn}{ConfigurationManager.AppSettings["webpay.secret"]}";

            using (var hasher = MD5.Create())
            {
                var signature = string.Join("", hasher.ComputeHash(Encoding.UTF8.GetBytes(signatureText)).Select(x => x.ToString("x2")));
                
                Assert.AreEqual(wsb_signature, signature);
            }
        }
    }
}
