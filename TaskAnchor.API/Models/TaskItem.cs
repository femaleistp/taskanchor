using System.ComponentModel.DataAnnotations;

namespace TaskAnchor.API.Models
{
    public class TaskItem
    {
        [Key]
        public int TaskId { get; set; }

        public int UserId { get; set; }

        public string Title { get; set; } = string.Empty;

        public string? Description { get; set; }

        public TaskStatus Status { get; set; }

        public PriorityLevel PriorityLevel { get; set; }

        public DateTime? DueDate { get; set; }

        public string? NextAction { get; set; }

        public DateTime LastUpdatedDate { get; set; }
    }
}
