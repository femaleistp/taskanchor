using Microsoft.EntityFrameworkCore;
using TaskAnchor.API.Models;

namespace TaskAnchor.API.Data
{
    public class TaskAnchorDbContext : DbContext
    {
        public TaskAnchorDbContext(DbContextOptions<TaskAnchorDbContext> options) 
            : base(options)
        {
        }
        public DbSet<TaskItem> Tasks { get; set; }
        public DbSet<ProgressLogEntry> ProgressLogEntries { get; set; }
        public DbSet<AppUser> AppUsers { get; set; }
    }
}
