namespace TaskAnchor.API.Models
{
    public class ProgressLogEntry
    {
        public int ProgressLogEntryId { get; set; }
        public int TaskId { get; set; }
        public string EntryText { get; set; } = string.Empty;
        public DateTime CreatedDate { get; set; }
    }
}
