using Azure.Core;
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

            var email = request.Email.Trim();

            if (email.Length > 255)
            {
                return BadRequest("Email must be 255 characters or fewer.");
            }

            if (request.Password.Length > 128)
            {
                return BadRequest("Password must be 128 characters or fewer.");
            }

            var existingUser = _context.AppUsers.FirstOrDefault(u => u.Email == email);
            
            if (existingUser != null)
            {
                return BadRequest("Email is already registered.");
            }

            var user = new AppUser
            {
                Email = email,
                PasswordHash = PasswordHasherService.HashPassword(request.Password)
            };

            _context.AppUsers.Add(user);
            _context.SaveChanges();
            return Ok("User registered successfully.");
        }

        [HttpPost("login")]
        public IActionResult Login([FromBody] LoginRequest request)
        {
            var user = _context.AppUsers.FirstOrDefault(u => u.Email == request.Email);
            if(user == null)
            {
                return Unauthorized("Invalid email or password.");
            }
            var hashedPassword = PasswordHasherService.HashPassword(request.Password);
            if(user.PasswordHash != hashedPassword)
            {
                return Unauthorized("Invalid email or password.");
            }
            return Ok("Login successful.");
        }
    }
}
