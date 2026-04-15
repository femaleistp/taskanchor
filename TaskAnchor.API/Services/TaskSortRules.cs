using TaskStatus = TaskAnchor.API.Models.TaskStatus;
using PriorityLevel = TaskAnchor.API.Models.PriorityLevel;

namespace TaskAnchor.API.Services
{
    public class TaskSortRules
    {
        public static IEnumerable<T> SortTasks<T>(
            IEnumerable<T> tasks,
            Func<T, TaskStatus> getStatus,
            Func<T, DateTime?> getDueDate,
            Func<T, PriorityLevel> getPriority,
            DateTime today)
        {
            return tasks 
                .OrderByDescending(t => OverdueRules.IsOverdue(getStatus(t), getDueDate(t), today)) // Overdue first
                .ThenBy(t => getDueDate(t) == null) // Tasks with due dates first
                .ThenBy(t => getDueDate(t)) // Earlier due dates first
                .ThenByDescending(t => getPriority(t)); // Higher priority first
        }
    }
}
