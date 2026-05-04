using LoginRequest = TaskAnchor.API.Models.LoginRequest;
using TaskAnchor.API.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TaskAnchor.API.Controllers;
using TaskAnchor.API.Data;
using TaskAnchor.API.Services;

namespace TaskAnchor.Tests
{
    public class AuthControllerTests
    {
        [Fact]
        public void Login_With_Script_And_SqlLike_Input_Does_Not_Bypass_Authentication()
        {
            // Arrange
            var options = new DbContextOptionsBuilder<TaskAnchorDbContext>()
                .UseInMemoryDatabase(databaseName: Guid.NewGuid().ToString())
                .Options;

            using var context = new TaskAnchorDbContext(options);

            context.AppUsers.Add(new AppUser
            {
                Email = "valid@example.com",
                PasswordHash = PasswordHasherService.HashPassword("correct-password")
            });
            context.SaveChanges();

            var controller = new AuthController(context);

            var request = new LoginRequest
            {
                Email = "<script>alert(\"x\")</script>@example.com",
                Password = "password' OR '1'='1"
            };

            // Act
            var result = controller.Login(request);

            // Assert
            Assert.IsType<UnauthorizedObjectResult>(result);
        }

        [Fact]
        public void Register_With_Script_And_SqlLike_Input_Stores_Email_And_Hashes_Password()
        {
            // Arrange
            var options = new DbContextOptionsBuilder<TaskAnchorDbContext>()
                .UseInMemoryDatabase(databaseName: Guid.NewGuid().ToString())
                .Options;

            using var context = new TaskAnchorDbContext(options);
            var controller = new AuthController(context);

            var request = new RegisterRequest
            {
                Email = "  <script>alert(\"x\")</script>@example.com  ",
                Password = "password' OR '1'='1"
            };

            // Act 
            var result = controller.Register(request);

            // Assert 
            Assert.IsType<OkObjectResult>(result);

            var savedUser = context.AppUsers.Single();

            Assert.Equal("<script>alert(\"x\")</script>@example.com", savedUser.Email);
            Assert.NotEqual("password'OR '1'='1", savedUser.PasswordHash);
            Assert.Equal(
                PasswordHasherService.HashPassword("password' OR '1'='1"),
                savedUser.PasswordHash
            );
        }
    }
}
