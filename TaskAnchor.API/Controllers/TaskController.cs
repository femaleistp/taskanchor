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
    }
}
