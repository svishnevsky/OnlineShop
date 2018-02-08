using Microsoft.VisualStudio.TestTools.UnitTesting;
using System;
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
    }
}
