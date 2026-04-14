namespace TaskAnchor.API.Services
{
    public class TaskSortRules
    {
        /// <summary>
        /// Sorts a collection of tasks based on the following criteria:
        /// </summary>
        /// <typeparam name="T">A generic type representing a task item. The type T is expected to have properties for Status, DueDate, and PriorityLevel, which are used for sorting the tasks according to the defined rules.</typeparam>
        /// <param name="tasks">A collection of tasks to be sorted. Each task in the collection should have properties that allow for sorting based on status, due date, and priority level as defined in the sorting rules.</param>
        /// <param name="today">A DateTime parameter representing the current date, which is used to determine the sorting order of tasks based on their due dates. Tasks that are overdue, due today, or due in the future will be sorted accordingly based on this parameter.</param>
        /// <returns>A sorted collection of tasks based on the defined sorting rules, which prioritize overdue tasks, tasks due today, and then future tasks, while also considering the priority level of each task.</returns>
        /// <exception cref="NotImplementedException">A NotImplementedException is thrown to indicate that the sorting logic has not yet been implemented. This serves as a placeholder for the actual sorting algorithm that will be developed to sort the tasks according to the specified criteria.</exception>
        public static IEnumerable<T> SortTasks<T>(IEnumerable<T>tasks, DateTime today)
        {
            throw new NotImplementedException();
        }
    }
}
