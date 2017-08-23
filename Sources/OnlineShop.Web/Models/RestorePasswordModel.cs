using System.ComponentModel.DataAnnotations;

namespace OnlineShop.Web.Models
{
    public class RestorePasswordModel
    {
        [Required(ErrorMessage = "Не указан email-адрес.")]
        [EmailAddress(ErrorMessage = "Неверный формат email-адреса.")]
        public string Username { get; set; }
    }
}
