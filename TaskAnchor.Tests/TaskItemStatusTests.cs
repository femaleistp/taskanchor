using TaskItem = TaskAnchor.API.Models.TaskItem;
using TaskStatus = TaskAnchor.API.Models.TaskStatus;
using TaskItemStatusService = TaskAnchor.API.Services.TaskItemStatusService;

namespace TaskAnchor.Tests
{
    public class TaskItemStatusTests
    {
        [Fact]
        public void Valid_Status_Change_Updates_Status_And_LastUpdatedDate()
        {
            // Arrange
            var task = new TaskItem
            {
                Status = TaskStatus.Active,
                LastUpdatedDate = DateTime.UtcNow.AddDays(-1) // Set to yesterday
            };
            var newStatus = TaskStatus.InProgress;
            // Act
            var result = TaskItemStatusService.UpdateStatus(task, newStatus);
            // Assert
            Assert.True(result);
            Assert.Equal(TaskStatus.InProgress, task.Status);
            Assert.True(task.LastUpdatedDate > DateTime.UtcNow.AddMinutes(-1)); // LastUpdatedDate should be updated to now
        }
    }
}
