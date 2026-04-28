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
            task.UserId = 1; // Temporary hardcoded user ID for testing purposes
            task.Status = TaskStatus.Active;
            task.LastUpdatedDate = TaskTimestampRules.GetUpdatedTimestamp();

            _context.Tasks.Add(task);
            _context.SaveChanges();

            return CreatedAtAction(nameof(CreateTask), new { id = task.TaskId }, task);
        }

        [HttpPost("{id}/progress")]
        public IActionResult CreateProgressLogEntry(int id, [FromBody] CreateProgressLogEntryRequest request)
        {
            var existingTask = _context.Tasks.FirstOrDefault(t => t.TaskId == id && t.UserId == 1); // Temporary hardcoded user ID for testing purposes, should be t.TaskId == id in production
            if (existingTask == null)
            {
                return NotFound();
            }
            if(string.IsNullOrWhiteSpace(request.EntryText))
            {
                return BadRequest("EntryText is required.");
            }
            var progressLogEntry = new ProgressLogEntry
            {
                TaskId = id,
                EntryText = request.EntryText.Trim(),
                CreatedDate = TaskTimestampRules.GetUpdatedTimestamp()
            };
            _context.ProgressLogEntries.Add(progressLogEntry);
            existingTask.LastUpdatedDate = TaskTimestampRules.GetUpdatedTimestamp();
            _context.SaveChanges();
            return Created("", progressLogEntry);
        }


        //GET returns only Active + InProgress tasks
        //Completed tasks are excluded
        [HttpGet]
        public IActionResult GetTasks()
        {
            var tasks = _context.Tasks
                .Where(t => t.UserId == 1 && t.Status != TaskStatus.Completed) // Temporary hardcoded user ID for testing purposes, exclude completed tasks
                .ToList();

            var sortedTasks = TaskSortRules.SortTasks(
                tasks,
                t => t.Status,
                t => t.DueDate,
                t => t.PriorityLevel,
                DateTime.UtcNow
            );

            var taskResponses = sortedTasks.Select(t => new
            {
                taskId = t.TaskId,
                userId = t.UserId,
                title = t.Title,
                description = t.Description,
                status = t.Status,
                priorityLevel = t.PriorityLevel,
                dueDate = t.DueDate,
                nextAction = t.NextAction,
                lastUpdatedDate = t.LastUpdatedDate,
                progressLogs = _context.ProgressLogEntries
            .Where(e => e.TaskId == t.TaskId)
            .OrderByDescending(e => e.CreatedDate)
            .Select(e => new
            {
                text = e.EntryText
            })
            .ToList()
            });

            return Ok(taskResponses);
        }

        [HttpGet("{id}/progress")]
        public IActionResult GetProgressLogEntries(int id)
        {
            var existingTask = _context.Tasks.FirstOrDefault(t => t.TaskId == id && t.UserId == 1); // Temporary hardcoded user ID for testing purposes, should be t.TaskId == id in production
            if (existingTask == null)
            {
                return NotFound();
            }
            var entries = _context.ProgressLogEntries
                .Where(e => e.TaskId == id)
                .OrderByDescending(e => e.CreatedDate)
                .ToList();
            return Ok(entries);
        }

        [HttpPut("{id}")]
        public IActionResult UpdateTask(int id, [FromBody] TaskItem updatedTask)
        {
            var existingTask = _context.Tasks.FirstOrDefault(t => t.TaskId == id && t.UserId == 1); // Temporary hardcoded user ID for testing purposes, should be t.TaskId == id in production
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
        // PUT /api/tasks/{id}/status
        [HttpPut("{id}/status")]
        public IActionResult UpdateTaskStatus(int id, [FromBody] UpdateTaskStatusRequest request)
        {
            var existingTask = _context.Tasks.FirstOrDefault(t => t.TaskId == id && t.UserId == 1);  // Temporary hardcoded user ID for testing purposes, should be t.TaskId == id in production
            if (existingTask == null)
            {
                return NotFound();
            }
            var updated = TaskItemStatusService.UpdateStatus(existingTask, request.NewStatus);
            if (!updated)
            {
                return BadRequest("Invalid status transition.");
            }
            _context.SaveChanges();
            return NoContent();
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteTask(int id)
        {
            var existingTask = _context.Tasks.FirstOrDefault(t => t.TaskId == id && t.UserId == 1); // Temporary hardcoded user ID for testing purposes, should be t.TaskId == id in production
            if (existingTask == null)
            {
                return NotFound();
            }
            _context.Tasks.Remove(existingTask);
            _context.SaveChanges();
            return NoContent();
        }
    }
}
