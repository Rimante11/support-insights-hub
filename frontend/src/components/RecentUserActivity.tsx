import { users } from "@/data/mock-data";
import { UserCheck, UserPlus, Shield } from "lucide-react";

// Mock user activity events
const userActivityEvents = [
  { id: "UA001", type: "login", user: "Eva Martinez", timestamp: "2025-02-14 10:45", role: "Agent" },
  { id: "UA002", type: "login", user: "Carol Davis", timestamp: "2025-02-14 09:30", role: "Agent" },
  { id: "UA003", type: "login", user: "Alice Johnson", timestamp: "2025-02-14 08:15", role: "Admin" },
  { id: "UA004", type: "login", user: "Bob Smith", timestamp: "2025-02-13 16:20", role: "Agent" },
  { id: "UA005", type: "login", user: "Frank Lee", timestamp: "2025-02-12 14:35", role: "Customer" },
  { id: "UA006", type: "registration", user: "Frank Lee", timestamp: "2024-08-15 11:00", role: "Customer" },
];

const RecentUserActivity = () => {
  const getIcon = (type: string) => {
    switch (type) {
      case "login":
        return <UserCheck className="h-4 w-4" />;
      case "registration":
        return <UserPlus className="h-4 w-4" />;
      case "role_change":
        return <Shield className="h-4 w-4" />;
      default:
        return <UserCheck className="h-4 w-4" />;
    }
  };

  const getActionText = (type: string, user: string) => {
    switch (type) {
      case "login":
        return `${user} logged in`;
      case "registration":
        return `${user} registered`;
      case "role_change":
        return `${user}'s role was updated`;
      default:
        return `${user} activity`;
    }
  };

  return (
    <div className="glass-card overflow-hidden rounded-xl">
      <div className="border-b border-border px-5 py-4">
        <h3 className="text-sm font-semibold text-foreground">Recent User Activity</h3>
      </div>
      <div className="divide-y divide-border">
        {userActivityEvents.map((event) => (
          <div key={event.id} className="px-5 py-3 transition-colors hover:bg-muted/30">
            <div className="flex items-start gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
                {getIcon(event.type)}
              </div>
              <div className="flex flex-1 items-start justify-between">
                <div className="space-y-0.5">
                  <p className="text-sm font-medium text-foreground">
                    {getActionText(event.type, event.user)}
                  </p>
                  <p className="text-xs text-muted-foreground">Role: {event.role}</p>
                </div>
                <div className="shrink-0 text-right">
                  <p className="text-xs text-muted-foreground">{event.timestamp}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentUserActivity;
