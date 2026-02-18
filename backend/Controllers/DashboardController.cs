using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SupportInsightsHub.Api.Data;

namespace SupportInsightsHub.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class DashboardController : ControllerBase
{
    private readonly ApplicationDbContext _context;

    public DashboardController(ApplicationDbContext context)
    {
        _context = context;
    }

    [HttpGet("stats")]
    public async Task<ActionResult> GetDashboardStats()
    {
        var totalTickets = await _context.Tickets.CountAsync();
        var openTickets = await _context.Tickets.CountAsync(t => t.Status == "Open");
        var inProgressTickets = await _context.Tickets.CountAsync(t => t.Status == "In Progress");
        var resolvedTickets = await _context.Tickets.CountAsync(t => t.Status == "Resolved");
        
        var totalUsers = await _context.Users.CountAsync();
        var activeUsers = await _context.Users.CountAsync(u => u.LastLogin > DateTime.UtcNow.AddDays(-7));

        var avgResponseTime = await _context.Users
            .Where(u => u.Role == "Agent")
            .AverageAsync(u => u.AvgResponseTime);

        return Ok(new
        {
            totalTickets,
            openTickets,
            inProgressTickets,
            resolvedTickets,
            totalUsers,
            activeUsers,
            avgResponseTime = Math.Round(avgResponseTime, 1)
        });
    }

    [HttpGet("recent-tickets")]
    public async Task<ActionResult> GetRecentTickets()
    {
        var recentTickets = await _context.Tickets
            .OrderByDescending(t => t.CreatedAt)
            .Take(10)
            .ToListAsync();

        return Ok(recentTickets);
    }
}
