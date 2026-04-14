using TaskStatus = TaskAnchor.API.Models.TaskStatus;
using TaskAnchor.API.Services;

namespace TaskAnchor.Tests
{
    public class OverdueRulesTests
    {
        [Fact]
        public void Task_With_Past_DueDate_And_Active_Status_Is_Overdue()
        {
            // Arrange
            var dueDate = DateTime.UtcNow.AddDays(-1); // Past due date
            var status = TaskStatus.Active;
            // Act
            var result = OverdueRules.IsOverdue(status, dueDate, DateTime.UtcNow.Date);
            // Assert
            Assert.True(result);
        }

        [Fact]
        public void Task_With_Past_DueDate_And_InProgress_Status_Is_Overdue()
        {
            // Arrange
            var dueDate = DateTime.UtcNow.AddDays(-1); // Past due date
            var status = TaskStatus.InProgress;
            // Act
            var result = OverdueRules.IsOverdue(status, dueDate, DateTime.UtcNow.Date);
            // Assert
            Assert.True(result);
        }

        [Fact]
        public void Task_With_Past_DueDate_And_Completed_Status_Is_Not_Overdue()
        { 
            // Arrange
            var dueDate = DateTime.UtcNow.AddDays(-1); // Past due date
            var status = TaskStatus.Completed;
            // Act
            var result = OverdueRules.IsOverdue(status, dueDate, DateTime.UtcNow.Date);
            // Assert
            Assert.False(result);
        }

        [Fact]
        public void Task_With_Todays_DueDate_Is_Not_Overdue()
        {
            // Arrange
            var dueDate = DateTime.UtcNow.Date; // Today's due date
            var status = TaskStatus.Active;
            // Act
            var result = OverdueRules.IsOverdue(status, dueDate, DateTime.UtcNow.Date);
            // Assert
            Assert.False(result);
        }

        [Fact]
        public void Task_Without_DueDate_Is_Not_Overdue()
        {
            // Arrange
            DateTime? dueDate = null; // No due date
            var status = TaskStatus.Active;
            // Act
            var result = OverdueRules.IsOverdue(status, dueDate, DateTime.UtcNow.Date);
            // Assert
            Assert.False(result);
        }
    }
}
