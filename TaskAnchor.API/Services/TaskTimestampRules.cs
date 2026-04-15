namespace TaskAnchor.API.Services
{
    public class TaskTimestampRules
    {
        public static DateTime GetUpdatedTimestamp()
        {
            return DateTime.UtcNow;
        }
    }
}
