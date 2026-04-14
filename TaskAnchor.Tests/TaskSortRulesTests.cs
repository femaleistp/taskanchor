using TaskAnchor.API.Services;
using TaskStatus = TaskAnchor.API.Models.TaskStatus;
using PriorityLevel = TaskAnchor.API.Models.PriorityLevel;
using Microsoft.VisualBasic;

namespace TaskAnchor.Tests
{
    public class TaskSortRulesTests
    {
        [Fact]
        public void Overdue_Tasks_Appear_Before_NonOverdue_Tasks()
        {
            // Arrange
            var today = new DateTime(2026, 4, 8);
            var overdueTask = new SortableTaskTestItem
            {
                Title = "Overdue Task",
                Status = TaskStatus.Active,
                DueDate = today.AddDays(-1),
                PriorityLevel = PriorityLevel.Low
            };

            var dueTodayTask = new SortableTaskTestItem
            {
                Title = "Due Today Task",
                Status = TaskStatus.Active,
                DueDate = today,
                PriorityLevel = PriorityLevel.High
            };

            var tasks = new List<SortableTaskTestItem> { dueTodayTask, overdueTask };

            // Act 
            var result = TaskSortRules.SortTasks(tasks, today).ToList();

            // Assert 
            Assert.Equal("Overdue Task", result[0].Title);
            Assert.Equal("Due Today Task", result[1].Title);
        }

        [Fact]
        public void Tasks_With_DueDates_Are_Sorted_By_Earliest_DueDate_First()
        {
            // Arrange
            var today = new DateTime(2026, 4, 8);
            var laterDueTask = new SortableTaskTestItem
            {
                Title = "Later Due Task",
                Status = TaskStatus.Active,
                DueDate = today.AddDays(5),
                PriorityLevel = PriorityLevel.High
            };
            var earlierDueTask = new SortableTaskTestItem
            {
                Title = "Earlier Due Task",
                Status = TaskStatus.InProgress,
                DueDate = today.AddDays(2),
                PriorityLevel = PriorityLevel.Low
            };
            var tasks = new List<SortableTaskTestItem> { laterDueTask, earlierDueTask };
            // Act 
            var result = TaskSortRules.SortTasks(tasks, today).ToList();
            // Assert
            Assert.Equal("Earlier Due Task", result[0].Title);
            Assert.Equal("Later Due Tasks", result[1].Title);
        }

        [Fact]
        public void Tasks_Without_DueDates_Are_Sorted_By_Priority_High_To_Low()
        {
            //Arrange
            var today = new DateTime(2026, 4, 8);
            var lowPriorityTask = new SortableTaskTestItem
            {
                Title = "Low Priority Task",
                Status = TaskStatus.Active,
                DueDate = null,
                PriorityLevel = PriorityLevel.Low
            };
            var highPriorityTask = new SortableTaskTestItem
            {
                Title = "High Priority Task",
                Status = TaskStatus.Active,
                DueDate = null,
                PriorityLevel = PriorityLevel.High
            };
            var mediumPriorityTask = new SortableTaskTestItem
            {
                Title = "Mediium Priority Task",
                Status = TaskStatus.Active,
                DueDate = null,
                PriorityLevel = PriorityLevel.Medium
            };
            var tasks = new List<SortableTaskTestItem>
            {
                lowPriorityTask,
                highPriorityTask,
                mediumPriorityTask
            };
            // Act
            var result = TaskSortRules.SortTasks(tasks, today).ToList();
            // Assert
            Assert.Equal("High Priority Task", result[0].Title);
            Assert.Equal("Medium Priority Task", result[1].Title);
            Assert.Equal("High Priority Task", result[2].Title);
        }

        [Fact]
        public void Tasks_With_DueDates_Appear_Before_Tasks_Without_DueDates_When_Not_Overdue()
        {
            // Arrange
            var today = new DateTime(2026, 4, 8);
            var noDueDateTask = new SortableTaskTestItem
            {
                Title = "No Due Date Task",
                Status = TaskStatus.Active,
                DueDate = null,
                PriorityLevel = PriorityLevel.High
            };
            var dueDateTask = new SortableTaskTestItem
            {
                Title = "Due Date Task",
                Status = TaskStatus.Active,
                DueDate = today.AddDays(3),
                PriorityLevel = PriorityLevel.Low
            };
            var tasks = new List<SortableTaskTestItem> { noDueDateTask, dueDateTask };
            // Act
            var result = TaskSortRules.SortTasks(tasks, today).ToList();
            // Assert
            Assert.Equal("Due Date Task", result[0].Title);
            Assert.Equal("No Due Date Task", result[1].Title);
        }

        [Fact]
        public void Overdue_Tasks_Are_Grouped_First_Then_Ordered_By_Earliest_DueDate()
        {
            // Arrange
            var today = new DateTime(2026, 4, 8);
            var moreOverdueTask = new SortableTaskTestItem
            {
                Title = "More Overdue Task",
                Status = TaskStatus.Active,
                DueDate = today.AddDays(-3),
                PriorityLevel = PriorityLevel.Low
            };
            var lessOverdueTask = new SortableTaskTestItem
            {
                Title = "Less Overdue Task",
                Status = TaskStatus.InProgress,
                DueDate = today.AddDays(-1),
                PriorityLevel = PriorityLevel.Low
            };
            var futureTask = new SortableTaskTestItem
            {
                Title = "Future Task",
                Status = TaskStatus.Active,
                DueDate = today.AddDays(2),
                PriorityLevel = PriorityLevel.High
            };
            var tasks = new List<SortableTaskTestItem>
            {
                futureTask,
                lessOverdueTask,
                moreOverdueTask
            };
            // Act 
            var result = TaskSortRules.SortTasks(tasks, today).ToList();
            // Assert
            Assert.Equal("More Overdue Task", result[0].Title);
            Assert.Equal("Less Overdue Task", result[1].Title);
            Assert.Equal("Future Task", result[2].Title);
        }

        [Fact]
        public void Mixed_Task_List_Is_Sorted_By_All_Mvp_Rules_In_Order()
        {
            // Arrange
            var today = new DateTime(2026, 4, 8);
            var task1 = new SortableTaskTestItem
            {
                Title = "No Due High",
                Status = TaskStatus.Active,
                DueDate = null,
                PriorityLevel = PriorityLevel.High
            };
            var task2 = new SortableTaskTestItem
            {
                Title = "Due In 5 Days",
                Status = TaskStatus.Active,
                DueDate = today.AddDays(5),
                PriorityLevel = PriorityLevel.Low
            };
            var task3 = new SortableTaskTestItem
            {
                Title = "Overdue Yesterday",
                Status = TaskStatus.InProgress,
                DueDate = today.AddDays(-1),
                PriorityLevel = PriorityLevel.Medium
            };
            var task4 = new SortableTaskTestItem
            {
                Title = "No Due Medium",
                Status = TaskStatus.Active,
                DueDate = null,
                PriorityLevel = PriorityLevel.Medium
            };
            var task5 = new SortableTaskTestItem
            {
                Title = "Due Tomorrow",
                Status = TaskStatus.Active,
                DueDate = today.AddDays(1),
                PriorityLevel = PriorityLevel.High
            };
            var task6 = new SortableTaskTestItem
            {
                Title = "Overdue Three Days",
                Status = TaskStatus.Active,
                DueDate = today.AddDays(-3),
                PriorityLevel = PriorityLevel.Low
            };
            var tasks = new List<SortableTaskTestItem>
            {
                task1, task2, task3, task4, task5, task6
            };
            // Act
            var result = TaskSortRules.SortTasks(tasks, today).ToList();
            // Assert
            Assert.Equal("Overdue Three Days", result[0].Title);
            Assert.Equal("Overdue Yesterday", result[1].Title);
            Assert.Equal("Due Tomorrow", result[2].Title);
            Assert.Equal("Due In 5 Days", result[3].Title);
            Assert.Equal("No Due High", result[4].Title);
            Assert.Equal("No Due Medium", result[5].Title);
        }

        /// <summary>
        /// Helper class to represent a task item for testing the sorting logic. This class includes properties for Title, Status, DueDate, and PriorityLevel, which are used to create test cases for the TaskSortRules sorting functionality.
        /// </summary>
        private class SortableTaskTestItem
        {
            public string Title { get; set; } = string.Empty;
            public TaskStatus Status { get; set; }
            public DateTime? DueDate { get; set; }
            public PriorityLevel PriorityLevel { get; set; }
        }
    }
}
