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
    }
}
