export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  createdAt: string;
  lastLogin: string;
}

export interface SupportTicket {
  ticketId: string;
  title: string;
  status: "Open" | "Closed" | "Pending";
  priority: "Low" | "Medium" | "High";
  assignedAgent: string;
  createdDate: string;
  resolvedDate: string | null;
  category: string;
}

export interface Agent {
  agentName: string;
  ticketsResolved: number;
  averageResponseTime: string;
  rating: number;
}

export interface ActivityLog {
  id: string;
  action: string;
  user: string;
  timestamp: string;
  details: string;
}

const USERS_STORAGE_KEY = "support_insights_users";

export const users: User[] = [
  { id: "U001", name: "Alice Johnson", email: "alice@company.com", role: "Admin", createdAt: "2024-01-15", lastLogin: "2025-02-14" },
  { id: "U002", name: "Bob Smith", email: "bob@company.com", role: "Agent", createdAt: "2024-03-20", lastLogin: "2025-02-13" },
  { id: "U003", name: "Carol Davis", email: "carol@company.com", role: "Agent", createdAt: "2024-05-10", lastLogin: "2025-02-14" },
  { id: "U004", name: "Dan Wilson", email: "dan@company.com", role: "Customer", createdAt: "2024-06-01", lastLogin: "2025-02-10" },
  { id: "U005", name: "Eva Martinez", email: "eva@company.com", role: "Agent", createdAt: "2024-07-22", lastLogin: "2025-02-14" },
  { id: "U006", name: "Frank Lee", email: "frank@company.com", role: "Customer", createdAt: "2024-08-15", lastLogin: "2025-02-12" },
];

export const getStoredUsers = (): User[] => {
  if (typeof window === "undefined") {
    return users;
  }

  const raw = localStorage.getItem(USERS_STORAGE_KEY);
  if (!raw) {
    return users;
  }

  try {
    const parsed = JSON.parse(raw) as User[];
    if (!Array.isArray(parsed)) {
      return users;
    }
    return parsed;
  } catch {
    return users;
  }
};

export const saveStoredUsers = (updatedUsers: User[]) => {
  if (typeof window === "undefined") {
    return;
  }

  localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(updatedUsers));
};

export const tickets: SupportTicket[] = [
  { ticketId: "T-1001", title: "Login page not loading", status: "Open", priority: "High", assignedAgent: "Bob Smith", createdDate: "2025-02-10", resolvedDate: null, category: "Bug" },
  { ticketId: "T-1002", title: "Password reset email not received", status: "Pending", priority: "Medium", assignedAgent: "Carol Davis", createdDate: "2025-02-09", resolvedDate: null, category: "Account" },
  { ticketId: "T-1003", title: "Billing discrepancy on invoice", status: "Open", priority: "High", assignedAgent: "Eva Martinez", createdDate: "2025-02-11", resolvedDate: null, category: "Billing" },
  { ticketId: "T-1004", title: "Feature request: Dark mode", status: "Closed", priority: "Low", assignedAgent: "Bob Smith", createdDate: "2025-01-28", resolvedDate: "2025-02-05", category: "Feature" },
  { ticketId: "T-1005", title: "App crash on file upload", status: "Open", priority: "High", assignedAgent: "Carol Davis", createdDate: "2025-02-12", resolvedDate: null, category: "Bug" },
  { ticketId: "T-1006", title: "Slow dashboard performance", status: "Pending", priority: "Medium", assignedAgent: "Eva Martinez", createdDate: "2025-02-08", resolvedDate: null, category: "Performance" },
  { ticketId: "T-1007", title: "Cannot export CSV reports", status: "Closed", priority: "Medium", assignedAgent: "Bob Smith", createdDate: "2025-01-25", resolvedDate: "2025-02-01", category: "Bug" },
  { ticketId: "T-1008", title: "Two-factor auth setup issue", status: "Closed", priority: "Low", assignedAgent: "Carol Davis", createdDate: "2025-01-20", resolvedDate: "2025-01-22", category: "Account" },
  { ticketId: "T-1009", title: "API rate limit exceeded", status: "Open", priority: "Medium", assignedAgent: "Eva Martinez", createdDate: "2025-02-13", resolvedDate: null, category: "API" },
  { ticketId: "T-1010", title: "Mobile app notification bug", status: "Pending", priority: "High", assignedAgent: "Bob Smith", createdDate: "2025-02-14", resolvedDate: null, category: "Bug" },
  { ticketId: "T-1011", title: "Incorrect timezone display", status: "Closed", priority: "Low", assignedAgent: "Carol Davis", createdDate: "2025-01-18", resolvedDate: "2025-01-20", category: "Bug" },
  { ticketId: "T-1012", title: "Integration with Slack failing", status: "Open", priority: "High", assignedAgent: "Eva Martinez", createdDate: "2025-02-14", resolvedDate: null, category: "Integration" },
];

export const agents: Agent[] = [
  { agentName: "Bob Smith", ticketsResolved: 142, averageResponseTime: "1.2h", rating: 4.7 },
  { agentName: "Carol Davis", ticketsResolved: 198, averageResponseTime: "0.8h", rating: 4.9 },
  { agentName: "Eva Martinez", ticketsResolved: 156, averageResponseTime: "1.0h", rating: 4.8 },
];

export const activityLogs: ActivityLog[] = [
  { id: "L001", action: "Ticket Created", user: "Dan Wilson", timestamp: "2025-02-14 09:32", details: "Created ticket T-1010" },
  { id: "L002", action: "Ticket Assigned", user: "Alice Johnson", timestamp: "2025-02-14 09:35", details: "Assigned T-1010 to Bob Smith" },
  { id: "L003", action: "Status Changed", user: "Eva Martinez", timestamp: "2025-02-14 10:15", details: "T-1012 changed to Open" },
  { id: "L004", action: "Comment Added", user: "Carol Davis", timestamp: "2025-02-14 10:45", details: "Replied to T-1002" },
  { id: "L005", action: "Ticket Resolved", user: "Bob Smith", timestamp: "2025-02-13 16:00", details: "Resolved T-1007" },
  { id: "L006", action: "Priority Escalated", user: "Alice Johnson", timestamp: "2025-02-13 14:20", details: "T-1003 escalated to High" },
  { id: "L007", action: "New User", user: "System", timestamp: "2025-02-12 08:00", details: "Frank Lee registered" },
  { id: "L008", action: "Rating Received", user: "Dan Wilson", timestamp: "2025-02-12 11:30", details: "Rated Carol Davis 5 stars" },
];

// Chart data
export const ticketsByDay = [
  { date: "Feb 8", created: 3, resolved: 2 },
  { date: "Feb 9", created: 2, resolved: 1 },
  { date: "Feb 10", created: 4, resolved: 3 },
  { date: "Feb 11", created: 2, resolved: 2 },
  { date: "Feb 12", created: 3, resolved: 4 },
  { date: "Feb 13", created: 2, resolved: 3 },
  { date: "Feb 14", created: 5, resolved: 1 },
];

export const ticketsByCategory = [
  { name: "Bug", value: 5 },
  { name: "Account", value: 2 },
  { name: "Billing", value: 1 },
  { name: "Feature", value: 1 },
  { name: "Performance", value: 1 },
  { name: "API", value: 1 },
  { name: "Integration", value: 1 },
];
