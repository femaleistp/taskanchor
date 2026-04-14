using TaskStatus = TaskAnchor.API.Models.TaskStatus;

namespace TaskAnchor.API.Services
{
    public class OverdueRules
    {
        /// <summary>
        /// Determines if a task is overdue based on its status, due date, and the current date.
        /// </summary>
        /// <param name="status">The current status of the task.</param>
        /// <param name="dueDate">The due date of the task, which can be null if no due date is set.</param>
        /// <param name="today">The current date to compare against the due date.</param>
        /// <returns>The boolean indicating whether the task is overdue.</returns>
        public static bool IsOverdue(TaskStatus status, DateTime? dueDate, DateTime today)
        {
            if (!dueDate.HasValue)
            {
                return false; // Tasks without a due date cannot be overdue.
            }
            if(status == TaskStatus.Completed)
            {
                return false; // Completed tasks are not overdue.
            }
            return dueDate.Value.Date < today.Date; // A task is overdue if its due date is in the past and it's not completed.
        }
    }
}
