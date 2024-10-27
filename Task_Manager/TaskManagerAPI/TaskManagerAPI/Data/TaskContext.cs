using Microsoft.EntityFrameworkCore;

namespace TaskManagerAPI.Data
{
    public class TaskContext:DbContext
    {
        public TaskContext(DbContextOptions<TaskContext> options) : base(options) 
        {

        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>()
                .HasOne(a => a.Address)
                .WithOne(b => b.User)
                .HasForeignKey<Address>(c => c.UserId)
                .OnDelete(DeleteBehavior.Cascade);


            modelBuilder.Entity<User>()
                .HasMany(o => o.Tasks)
                .WithOne(p => p.Assignee);

            modelBuilder.Entity<TaskItem>()
                .HasMany(t => t.CheckLists)
                .WithOne(c => c.Task)
                .HasForeignKey(c => c.TaskId);
                

            base.OnModelCreating(modelBuilder);
        }

        public DbSet<TaskItem> Tasks { get; set; }
        public DbSet<User> Users { get; set; }

    }
}
