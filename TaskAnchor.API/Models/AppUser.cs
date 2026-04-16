using System.ComponentModel.DataAnnotations;

namespace TaskAnchor.API.Models
{
    public class AppUser
    {
        [Key] 
        public int UserId { get; set; }

        public string Email { get; set; } = string.Empty;

        public string PasswordHash { get; set; } = string.Empty;
    }
}
