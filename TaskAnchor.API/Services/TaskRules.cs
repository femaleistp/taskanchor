using TaskStatus = TaskAnchor.API.Models.TaskStatus;

namespace TaskAnchor.API.Services
{
    public class TaskRules
    {
        /// <summary>
        /// Determines if a task can transition from the current status to the next status based on defined rules.
        /// </summary>
        /// <param name="current">A current task status.</param>
        /// <param name="next">A next task status.</param>
        /// <returns>A boolean indicating whether the transition is allowed.</returns>
        public static bool CanTransition(TaskStatus current, TaskStatus next)
        { 
            // Completed is terminal (MVP rule)
            if (current == TaskStatus.Completed)
            {
                return false;  
            }

            // Allow transitioning from Active to InProgress.
            if (current == TaskStatus.Active && next == TaskStatus.InProgress)
            {
                return true;  
            }

            // Allow transitioning from InProgress back to Active.
            if (current == TaskStatus.InProgress && next == TaskStatus.Active)
            {
                return true;  
            }

            // Allow transitioning from Active to Completed.
            if (current == TaskStatus.Active && next == TaskStatus.Completed)
            {
                return true;  
            }

            // Allow transitioning from InProgress to Completed.
            if (current == TaskStatus.InProgress && next == TaskStatus.Completed)
            {
                return true;  
            }

            return false;  // All other transitions are invalid.
        }
    }
}
