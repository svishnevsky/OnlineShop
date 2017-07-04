using System.ComponentModel.DataAnnotations;

namespace OnlineShop.Web.Models
{
    public class NewUser
    {
        [Required(ErrorMessage = "Не указано имя.")]
        public string FirstName { get; set; }

        [Required(ErrorMessage = "Не указана фамилия.")]        
        public string LastName { get; set; }

        [Required(ErrorMessage = "Не указан email-адрес.")]
        [EmailAddress(ErrorMessage = "Неверный формат email-адреса.")]
        public string Email { get; set; }

        [Required(ErrorMessage = "Не указан пароль.")]
        [StringLength(32, MinimumLength = 6, ErrorMessage = "Длина пароля должна быть от 6 до 32 символов.")]
        public string Password { get; set; }
    }
}
