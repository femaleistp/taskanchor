using TaskItem = TaskAnchor.API.Models.TaskItem;
using TaskStatus = TaskAnchor.API.Models.TaskStatus;
namespace TaskAnchor.API.Services
{
    public class TaskItemStatusService
    {
        /// <summary>
        /// Updates the status of a task item if the transition is valid according to TaskRules. Also updates the LastUpdatedDate using TaskTimestampRules.
        /// </summary>
        /// <param name="task">A TaskItem whose status is to be updated.</param>
        /// <param name="newStatus">A TaskStatus representing the new status to which the task should be updated.</param>
        /// <returns>A boolean value indicating whether the status update was successful (true if the status was updated, false if the transition was invalid).</returns>
        public static bool UpdateStatus(TaskItem task, TaskStatus newStatus)
        {
            if (!TaskRules.CanTransition(task.Status, newStatus))
            {
                return false; // Invalid status transition
            }
            task.Status = newStatus;
            task.LastUpdatedDate = TaskTimestampRules.GetUpdatedTimestamp();
            return true;
        }
    }
}
