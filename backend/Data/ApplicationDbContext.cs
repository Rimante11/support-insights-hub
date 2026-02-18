using Microsoft.EntityFrameworkCore;
using SupportInsightsHub.Api.Models;

namespace SupportInsightsHub.Api.Data;

public class ApplicationDbContext : DbContext
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
        : base(options)
    {
    }

    public DbSet<User> Users { get; set; }
    public DbSet<Ticket> Tickets { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        // Seed initial data
        modelBuilder.Entity<User>().HasData(
            new User
            {
                Id = "U001",
                Name = "Alice Johnson",
                Email = "admin@company.com",
                PasswordHash = BCrypt.Net.BCrypt.HashPassword("admin123"),
                Role = "Admin",
                CreatedAt = DateTime.UtcNow.AddMonths(-6),
                LastLogin = DateTime.UtcNow,
                TicketsResolved = 0,
                AvgResponseTime = 0
            },
            new User
            {
                Id = "U002",
                Name = "Bob Smith",
                Email = "agent@company.com",
                PasswordHash = BCrypt.Net.BCrypt.HashPassword("agent123"),
                Role = "Agent",
                CreatedAt = DateTime.UtcNow.AddMonths(-5),
                LastLogin = DateTime.UtcNow.AddDays(-1),
                TicketsResolved = 156,
                AvgResponseTime = 2.3
            },
            new User
            {
                Id = "U003",
                Name = "Carol White",
                Email = "carol.white@email.com",
                PasswordHash = BCrypt.Net.BCrypt.HashPassword("password123"),
                Role = "Agent",
                CreatedAt = DateTime.UtcNow.AddMonths(-4),
                LastLogin = DateTime.UtcNow.AddDays(-2),
                TicketsResolved = 142,
                AvgResponseTime = 3.1
            },
            new User
            {
                Id = "U004",
                Name = "Dan Wilson",
                Email = "customer@company.com",
                PasswordHash = BCrypt.Net.BCrypt.HashPassword("customer123"),
                Role = "Customer",
                CreatedAt = DateTime.UtcNow.AddMonths(-3),
                LastLogin = DateTime.UtcNow.AddHours(-6),
                TicketsResolved = 0,
                AvgResponseTime = 0
            }
        );

        modelBuilder.Entity<Ticket>().HasData(
            new Ticket
            {
                Id = "T001",
                Title = "Unable to access dashboard",
                Customer = "John Doe",
                Status = "Open",
                Priority = "High",
                Category = "Technical",
                AssignedTo = "Bob Smith",
                CreatedAt = DateTime.UtcNow.AddHours(-2),
                UpdatedAt = DateTime.UtcNow.AddHours(-2),
                Description = "User cannot log in to the dashboard"
            },
            new Ticket
            {
                Id = "T002",
                Title = "Feature request: Dark mode",
                Customer = "Jane Smith",
                Status = "In Progress",
                Priority = "Medium",
                Category = "Feature Request",
                AssignedTo = "Carol White",
                CreatedAt = DateTime.UtcNow.AddHours(-5),
                UpdatedAt = DateTime.UtcNow.AddHours(-1),
                Description = "Request to add dark mode theme"
            },
            new Ticket
            {
                Id = "T003",
                Title = "Billing inquiry",
                Customer = "Mike Johnson",
                Status = "Resolved",
                Priority = "Low",
                Category = "Billing",
                AssignedTo = "Bob Smith",
                CreatedAt = DateTime.UtcNow.AddDays(-1),
                UpdatedAt = DateTime.UtcNow.AddHours(-3),
                Description = "Question about recent charges"
            }
        );
    }
}
