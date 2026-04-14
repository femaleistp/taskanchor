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
            throw new NotImplementedException();
        }
    }
}
