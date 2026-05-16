namespace TaskAnchor.API.Models
{
    public class CreateTaskRequest
    {
        public string Title { get; set; } = string.Empty;
        public string? Description { get; set; }
        public PriorityLevel PriorityLevel { get; set; }
        public DateTime? DueDate { get; set; }
        public string? NextAction { get; set; }
    }

    public class UpdateTaskRequest
    {
        public string Title { get; set; } = string.Empty;
        public string? Description { get; set; }
        public PriorityLevel PriorityLevel { get; set; }
        public DateTime? DueDate { get; set; }
        public string? NextAction { get; set; }
    }
}
