using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc;
using TaskAnchor.API.Controllers;
using TaskAnchor.API.Data;
using TaskAnchor.API.Models;
using TaskStatus = TaskAnchor.API.Models.TaskStatus;

namespace TaskAnchor.Tests
{
    public class ProgressLogTests
    {
        [Fact]
        public void CreateProgressLogEntry_ForExistingTask_SavesEntry_And_UpdatesLastUpdatedDate()
        {
            // Arrange
            var options = new DbContextOptionsBuilder<TaskAnchorDbContext>()
                .UseInMemoryDatabase(databaseName: "CreateTest")
                .Options;
            using var context = new TaskAnchorDbContext(options);
            var task = new TaskItem
            {
                UserId = 1,
                Title = "Test Task",
                Status = TaskStatus.Active,
                PriorityLevel = PriorityLevel.Medium,
                LastUpdatedDate = DateTime.UtcNow.AddDays(-1)
            };

            context.Tasks.Add(task);
            context.SaveChanges();

            var controller = new TasksController(context);
            var request = new CreateProgressLogEntryRequest
            {
                EntryText = "Worked on task"
            };
            // Act
            controller.CreateProgressLogEntry(task.TaskId, request);
            // Assert
            var entry = context.ProgressLogEntries.First();
            Assert.Equal(task.TaskId, entry.TaskId);
            Assert.Equal("Worked on task", entry.EntryText);
            var updatedTask = context.Tasks.First();
            Assert.True(updatedTask.LastUpdatedDate > DateTime.UtcNow.AddMinutes(-1));
        }

        [Fact]
        public void CreateProgressLogEntry_TrimsEntryText_BeforeSaving()
        {
            // Arrange
            var options = new DbContextOptionsBuilder<TaskAnchorDbContext>()
                .UseInMemoryDatabase(databaseName: "CreateProgressLogTrimTest")
                .Options;

            using var context = new TaskAnchorDbContext(options);

            var task = new TaskItem
            {
                UserId = 1,
                Title = "Test Task",
                Status = TaskStatus.Active,
                PriorityLevel = PriorityLevel.Medium,
                LastUpdatedDate = DateTime.UtcNow.AddDays(-1)
            };

            context.Tasks.Add(task);
            context.SaveChanges();

            var controller = new TasksController(context);

            var request = new CreateProgressLogEntryRequest
            {
                EntryText = "    Worked on task    "
            };

            // Act
            controller.CreateProgressLogEntry(task.TaskId, request);

            // Assert
            var entry = context.ProgressLogEntries.First();
            Assert.Equal("Worked on task", entry.EntryText);
        }

        [Fact]
        public void CreateProgressLogEntry_WithScriptLikeText_SavesAsPlainText()
        {
            // Arrange
            var options = new DbContextOptionsBuilder<TaskAnchorDbContext>()
                .UseInMemoryDatabase(databaseName: "CreateProgressLogScriptLikeTextTest")
                .Options;

            using var context = new TaskAnchorDbContext(options);

            var task = new TaskItem
            {
                UserId = 1,
                Title = "Test Task",
                Status = TaskStatus.Active,
                PriorityLevel = PriorityLevel.Medium,
                LastUpdatedDate = DateTime.UtcNow.AddDays(-1)
            };

            context.Tasks.Add(task);
            context.SaveChanges();

            var controller = new TasksController(context);

            var request = new CreateProgressLogEntryRequest
            {
                EntryText = "<script>alert(\"x\")</script>"
            };

            // Act
            controller.CreateProgressLogEntry(task.TaskId, request);

            // Assert
            var entry = context.ProgressLogEntries.First();
            Assert.Equal("<script>alert(\"x\")</script>", entry.EntryText);
        }

        [Fact]
        public void GetProgressLogEntries_ReturnsEntries_NewestFirst()
        {
            // Arrange
            var options = new DbContextOptionsBuilder<TaskAnchorDbContext>()
                .UseInMemoryDatabase("GetTest")
                .Options;

            using var context = new TaskAnchorDbContext(options);

            var task = new TaskItem
            {
                UserId = 1,
                Title = "Test Task",
                Status = TaskStatus.Active,
                PriorityLevel = PriorityLevel.Medium,
                LastUpdatedDate = DateTime.UtcNow
            };

            context.Tasks.Add(task);
            context.SaveChanges();

            context.ProgressLogEntries.Add(new ProgressLogEntry
            {
                TaskId = task.TaskId,
                EntryText = "Older",
                CreatedDate = DateTime.UtcNow.AddMinutes(-10)
            });

            context.ProgressLogEntries.Add(new ProgressLogEntry
            {
                TaskId = task.TaskId,
                EntryText = "Newer",
                CreatedDate = DateTime.UtcNow
            });

            context.SaveChanges();

            var controller = new TasksController(context);

            // Act
            var result = controller.GetProgressLogEntries(task.TaskId) as OkObjectResult;
            var entries = result.Value as List<ProgressLogEntry>;

            // Assert
            Assert.Equal(2, entries.Count);
            Assert.Equal("Newer", entries[0].EntryText);
            Assert.Equal("Older", entries[1].EntryText);
        }

        [Fact]
        public void CreateTask_WithBlankTitle_ReturnsBadRequest_And_DoesNotSaveTask()
        {
            // Arrange
            var options = new DbContextOptionsBuilder<TaskAnchorDbContext>()
                .UseInMemoryDatabase(databaseName: "CreateTaskBlankTitleTest")
                .Options;

            using var context = new TaskAnchorDbContext(options);

            var controller = new TasksController(context);

            var task = new TaskItem
            {
                UserId = 1,
                Title = "   ",
                Description = "Description should not be saved",
                Status = TaskStatus.Active,
                PriorityLevel = PriorityLevel.Medium,
                DueDate = null,
                NextAction = "Next action should not be saved",
                LastUpdatedDate = DateTime.UtcNow
            };

            // Act
            var result = controller.CreateTask(task);

            // Assert
            var badRequestResult = Assert.IsType<BadRequestObjectResult>(result);
            Assert.Equal("Title is required.", badRequestResult.Value);
            Assert.Empty(context.Tasks);
        }

        [Fact]
        public void CreateTask_WithTitleOverMaxLength_ReturnsBadRequest_And_DoesNotSaveTask()
        {
            // Arrange
            var options = new DbContextOptionsBuilder<TaskAnchorDbContext>()
                .UseInMemoryDatabase(databaseName: "CreateTaskTitleOverMaxLengthTest")
                .Options;

            using var context = new TaskAnchorDbContext(options);

            var controller = new TasksController(context);

            var task = new TaskItem
            {
                UserId = 1,
                Title = new string('A', 101),
                Description = "Description should not be saved",
                Status = TaskStatus.Active,
                PriorityLevel = PriorityLevel.Medium,
                DueDate = null,
                NextAction = "Next action should not be saved",
                LastUpdatedDate = DateTime.UtcNow
            };

            // Act
            var result = controller.CreateTask(task);

            // Assert
            var badRequestResult = Assert.IsType<BadRequestObjectResult>(result);
            Assert.Equal("Title must be 100 characters or fewer.", badRequestResult.Value);
            Assert.Empty(context.Tasks);
        }

        [Fact]
        public void CreateTask_WithDescriptionOverMaxLength_ReturnsBadRequest_And_DoesNotSaveTask()
        {
            // Arrange
            var options = new DbContextOptionsBuilder<TaskAnchorDbContext>()
                .UseInMemoryDatabase(databaseName: "CreateTaskDescriptionOverMaxLengthTest")
                .Options;

            using var context = new TaskAnchorDbContext(options);

            var controller = new TasksController(context);

            var task = new TaskItem
            {
                UserId = 1,
                Title = "Valid Title",
                Description = new string('D', 501),
                Status = TaskStatus.Active,
                PriorityLevel = PriorityLevel.Medium,
                DueDate = null,
                NextAction = "Next action should not be saved",
                LastUpdatedDate = DateTime.UtcNow
            };

            // Act

            var result = controller.CreateTask(task);

            // Assert
            var badRequestResult = Assert.IsType<BadRequestObjectResult>(result);
            Assert.Equal("Description must be 500 characters or fewer.", badRequestResult.Value);
            Assert.Empty(context.Tasks);
        }

        [Fact]
        public void CreateTask_WithSuspiciousText_SavesValuesAsPlainText()
        {
            // Arrange
            var options = new DbContextOptionsBuilder<TaskAnchorDbContext>()
                .UseInMemoryDatabase(databaseName: "CreateTaskSuspiciousTextTest")
                .Options;

            using var context = new TaskAnchorDbContext(options);

            var controller = new TasksController(context);

            var task = new TaskItem
            {
                UserId = 1,
                Title = "<script>alert(\"x\")</script>",
                Description = "' OR '1'='1",
                Status = TaskStatus.Active,
                PriorityLevel = PriorityLevel.Medium,
                DueDate = null,
                NextAction = "<b>Next action</b>",
                LastUpdatedDate = DateTime.UtcNow
            };

            // Act
            controller.CreateTask(task);

            // Assert
            var savedTask = context.Tasks.First();
            Assert.Equal("<script>alert(\"x\")</script>", savedTask.Title);
            Assert.Equal("' OR '1'='1", savedTask.Description);
            Assert.Equal("<b>Next action</b>", savedTask.NextAction);
        }
    }
}
