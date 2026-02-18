import { tickets } from "@/data/mock-data";
import { cn } from "@/lib/utils";

const statusStyles = {
  Open: "bg-primary/15 text-primary",
  Pending: "bg-warning/15 text-warning",
  Closed: "bg-success/15 text-success",
};

const priorityStyles = {
  High: "bg-destructive/15 text-destructive",
  Medium: "bg-warning/15 text-warning",
  Low: "bg-muted text-muted-foreground",
};

const RecentTicketsTable = () => {
  const recentTickets = tickets.slice(0, 8);

  return (
    <div className="glass-card overflow-hidden rounded-xl">
      <div className="border-b border-border px-5 py-4">
        <h3 className="text-sm font-semibold text-foreground">Recent Tickets</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border">
              <th className="px-5 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">ID</th>
              <th className="px-5 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">Title</th>
              <th className="px-5 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">Status</th>
              <th className="px-5 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">Priority</th>
              <th className="px-5 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">Agent</th>
              <th className="px-5 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {recentTickets.map((ticket) => (
              <tr key={ticket.ticketId} className="transition-colors hover:bg-muted/30">
                <td className="whitespace-nowrap px-5 py-3 text-sm font-mono text-muted-foreground">{ticket.ticketId}</td>
                <td className="px-5 py-3 text-sm font-medium text-foreground">{ticket.title}</td>
                <td className="px-5 py-3">
                  <span className={cn("inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium", statusStyles[ticket.status])}>
                    {ticket.status}
                  </span>
                </td>
                <td className="px-5 py-3">
                  <span className={cn("inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium", priorityStyles[ticket.priority])}>
                    {ticket.priority}
                  </span>
                </td>
                <td className="whitespace-nowrap px-5 py-3 text-sm text-muted-foreground">{ticket.assignedAgent}</td>
                <td className="whitespace-nowrap px-5 py-3 text-sm text-muted-foreground">{ticket.createdDate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecentTicketsTable;
