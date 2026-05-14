using LoginRequest = TaskAnchor.API.Models.LoginRequest;
using TaskAnchor.API.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TaskAnchor.API.Controllers;
using TaskAnchor.API.Data;
using TaskAnchor.API.Services;
using Microsoft.AspNetCore.Components;

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

        [Fact]
        public void Register_WithEmailOverMaxLength_ReturnsBadRequest_And_DoesNotSaveUser()
        {
            // Arrange
            var options = new DbContextOptionsBuilder<TaskAnchorDbContext>()
                .UseInMemoryDatabase(databaseName: Guid.NewGuid().ToString())
                .Options;

            using var context = new TaskAnchorDbContext(options);   
            var controller = new AuthController(context);
            var request = new RegisterRequest
            {
                Email = new string('a', 245) + "@example.com",
                Password = "password123"
            };

            // Act
            var result = controller.Register(request);

            // Assert
            var badRequestResult = Assert.IsType<BadRequestObjectResult>(result);
            Assert.Equal("Email must be 255 characters or fewer.", badRequestResult.Value);
            Assert.Empty(context.AppUsers);
        }

        [Fact]
        public void Login_WithEmailOverMaxLength_ReturnsBadRequest()
        {
            // Arrange
            var options = new DbContextOptionsBuilder<TaskAnchorDbContext>()
                .UseInMemoryDatabase(databaseName: Guid.NewGuid().ToString())
                .Options;

            using var context = new TaskAnchorDbContext(options);
            var controller = new AuthController(context);

            var request = new LoginRequest
            {
                Email = new string('a', 245) + "@example.com",
                Password = "password123"
            };

            // Act
            var result = controller.Login(request);

            // Assert
            var badRequestResult = Assert.IsType<BadRequestObjectResult>(result);
            Assert.Equal("Email must be 255 characters or fewer.", badRequestResult.Value);
        }

        [Fact]
        public void Login_WithPasswordOverMaxLength_ReturnsBadRequest()
        {
            // Arrange
            var options = new DbContextOptionsBuilder<TaskAnchorDbContext>()
                .UseInMemoryDatabase(databaseName: Guid.NewGuid().ToString())
                .Options;

            using var context = new TaskAnchorDbContext(options);
            var controller = new AuthController(context);

            var request = new LoginRequest
            {
                Email = "valid@example.com",
                Password = new string('p', 129)
            };

            // Act
            var result = controller.Login(request);

            // Assert
            var badRequestResult = Assert.IsType<BadRequestObjectResult>(result);
            Assert.Equal("Password must be 128 characters or fewer.", badRequestResult.Value);
        }

        [Fact]
        public void Login_WithBlankEmailOrPassword_ReturnsBadRequest()
        {
            // Arrange
            var options = new DbContextOptionsBuilder<TaskAnchorDbContext>()
                .UseInMemoryDatabase(databaseName: Guid.NewGuid().ToString())
                .Options;

            using var context = new TaskAnchorDbContext(options);
            var controller = new AuthController(context);

            var request = new LoginRequest
            {
                Email = "    ",
                Password = ""
            };

            // Act
            var result = controller.Login(request);

            // Assert
            var badRequestResult = Assert.IsType<BadRequestObjectResult>(result);
            Assert.Equal("Email and password are required.", badRequestResult.Value);
        }

        [Fact]
        public void Register_WithDuplicateEmail_ReturnsBadRequest_And_DoesNotSaveSecondUser()
        {
            // Arrange
            var options = new DbContextOptionsBuilder<TaskAnchorDbContext>()
                .UseInMemoryDatabase(databaseName: Guid.NewGuid().ToString())
                .Options;

            using var context = new TaskAnchorDbContext(options);

            context.AppUsers.Add(new AppUser
            {
                Email = "duplicate@example.com",
                PasswordHash = PasswordHasherService.HashPassword("password123")
            });
            context.SaveChanges();

            var controller = new AuthController(context);

            var request = new RegisterRequest
            {
                Email = "duplicate@example.com",
                Password = "differentPassword123"
            };

            // Act
            var result = controller.Register(request);

            // Assert
            var badRequestResult = Assert.IsType<BadRequestObjectResult>(result);
            Assert.Equal("Email is already registered.", badRequestResult.Value);
            Assert.Single(context.AppUsers);
        }

        [Fact]
        public void Register_WithValidEmailAndPassword_ReturnsOk_And_SavesUser()
        {
            // Arrange 
            var options = new DbContextOptionsBuilder<TaskAnchorDbContext>()
                .UseInMemoryDatabase(databaseName: Guid.NewGuid().ToString())
                .Options;

            using var context = new TaskAnchorDbContext(options);
            var controller = new AuthController(context);

            var request = new RegisterRequest
            {
                Email = "valid@example.com",
                Password = "password123"
            };

            // Act
            var result = controller.Register(request);

            // Assert
            var okResult = Assert.IsType<OkObjectResult>(result);
            Assert.Equal("User registered successfully.", okResult.Value);

            var savedUser = context.AppUsers.Single();
            Assert.Equal("valid@example.com", savedUser.Email);
            Assert.Equal(PasswordHasherService.HashPassword("password123"), savedUser.PasswordHash);
        }

        [Fact]
        public void Login_WithValidCredentials_ReturnsOk()
        {
            // Arrange
            var options = new DbContextOptionsBuilder<TaskAnchorDbContext>()
                .UseInMemoryDatabase(databaseName: Guid.NewGuid().ToString())
                .Options;

            using var context = new TaskAnchorDbContext(options);

            context.AppUsers.Add(new AppUser
            {
                Email = "valid@example.com",
                PasswordHash = PasswordHasherService.HashPassword("password123")
            });

            context.SaveChanges();

            var controller = new AuthController(context);

            var request = new LoginRequest
            {
                Email = "valid@example.com",
                Password = "password123"
            };

            // Act
            var result = controller.Login(request);

            // Assert
            var okResult = Assert.IsType<OkObjectResult>(result);
            Assert.Equal("Login successful.", okResult.Value);
        }

        [Fact]
        public void Register_WithPasswordOverMaxLength_ReturnsBadRequest_And_DoesNotSaveUser()
        {
            // Arrange
            var options = new DbContextOptionsBuilder<TaskAnchorDbContext>()
                .UseInMemoryDatabase(databaseName: Guid.NewGuid().ToString())
                .Options;

            using var context = new TaskAnchorDbContext(options);
            var controller = new AuthController(context);

            var request = new RegisterRequest
            {
                Email = "valid@example.com",
                Password = new string('p', 129)
            };

            // Act
            var result = controller.Register(request);

            // Assert
            var badRequestResult = Assert.IsType<BadRequestObjectResult>(result);
            Assert.Equal("Password must be 128 characters or fewer.", badRequestResult.Value);
            Assert.Empty(context.AppUsers);
        }
    }
}
