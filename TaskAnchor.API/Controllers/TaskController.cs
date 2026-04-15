using Microsoft.AspNetCore.Mvc;
using TaskAnchor.API.Data;
using TaskAnchor.API.Models;
using TaskAnchor.API.Services;
using TaskStatus = TaskAnchor.API.Models.TaskStatus;

namespace TaskAnchor.API.Controllers
{
    [ApiController]
    [Route("api/tasks")]
    public class TasksController : ControllerBase
    {
        // Implement your API endpoints here
        private readonly TaskAnchorDbContext _context;

        public TasksController(TaskAnchorDbContext context)
        {
            _context = context;
        }

        [HttpPost]
        public IActionResult CreateTask([FromBody] TaskItem task)
        {
            // Logic to create a new task
            task.Status = TaskStatus.Active;
            task.LastUpdatedDate = TaskTimestampRules.GetUpdatedTimestamp();

            _context.Tasks.Add(task);
            _context.SaveChanges();

            return CreatedAtAction(nameof(CreateTask), new { id = task.TaskId }, task);
        }

        [HttpGet]
        public IActionResult GetTasks()
        {
            var tasks = _context.Tasks.ToList();
            var sortedTasks = TaskSortRules.SortTasks(
                tasks,
                t => t.Status,
                t => t.DueDate,
                t => t.PriorityLevel,
                DateTime.UtcNow
            );
            return Ok(sortedTasks);
        }

        [HttpPut("{id}")]
        public IActionResult UpdateTask(int id, [FromBody] TaskItem updatedTask)
        {
            var existingTask = _context.Tasks.FirstOrDefault(t => t.TaskId == id);
            if (existingTask == null)
            {
                return NotFound();
            }
            existingTask.Title = updatedTask.Title;
            existingTask.Description = updatedTask.Description;
            existingTask.PriorityLevel = updatedTask.PriorityLevel;
            existingTask.DueDate = updatedTask.DueDate;
            existingTask.NextAction = updatedTask.NextAction;
            existingTask.LastUpdatedDate = TaskTimestampRules.GetUpdatedTimestamp();

            _context.SaveChanges();
            return NoContent();
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteTask(int id)
        {
            var existingTask = _context.Tasks.FirstOrDefault(t => t.TaskId == id);
            if(existingTask == null)
            {
                return NotFound();
            }
            _context.Tasks.Remove(existingTask);
            _context.SaveChanges();
            return NoContent();
        }
    }
}
