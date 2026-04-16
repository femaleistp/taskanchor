using Microsoft.AspNetCore.Mvc;
using TaskAnchor.API.Data;
using TaskAnchor.API.Models;
using TaskAnchor.API.Services;

namespace TaskAnchor.API.Controllers
{
    [ApiController]
    [Route("api/auth")]
    public class AuthController : ControllerBase
    {
        private readonly TaskAnchorDbContext _context;

        public AuthController(TaskAnchorDbContext context)
        {
            _context = context;
        }

        [HttpPost("register")]
        public IActionResult Register([FromBody] RegisterRequest request)
        {
            if (string.IsNullOrWhiteSpace(request.Email) || string.IsNullOrWhiteSpace(request.Password))
            {
                return BadRequest("Email and password are required.");
            }

            var existingUser = _context.AppUsers.FirstOrDefault(u => u.Email == request.Email);
            if (existingUser != null)
            {
                return BadRequest("Email is already registered.");
            }
            var user = new AppUser
            {
                Email = request.Email.Trim(),
                PasswordHash = PasswordHasherService.HashPassword(request.Password)
            };
            _context.AppUsers.Add(user);
            _context.SaveChanges();
            return Ok("User registered successfully.");
        }
    }
}
