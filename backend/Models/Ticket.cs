namespace SupportInsightsHub.Api.Models;

public class Ticket
{
    public string Id { get; set; } = string.Empty;
    public string Title { get; set; } = string.Empty;
    public string Customer { get; set; } = string.Empty;
    public string Status { get; set; } = "Open"; // Open, In Progress, Resolved, Closed
    public string Priority { get; set; } = "Medium"; // Low, Medium, High, Urgent
    public string Category { get; set; } = "General";
    public string AssignedTo { get; set; } = string.Empty;
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
    public string Description { get; set; } = string.Empty;
}
