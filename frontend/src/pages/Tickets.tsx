import DashboardSidebar from "@/components/DashboardSidebar";
import RecentTicketsTable from "@/components/RecentTicketsTable";
import { Ticket } from "lucide-react";

const Tickets = () => {
  return (
    <div className="flex min-h-screen bg-background">
      <DashboardSidebar />

      <main className="ml-64 flex-1 p-8">
        <div className="mb-8">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
              <Ticket className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">Tickets</h1>
              <p className="text-sm text-muted-foreground">Manage and track all support tickets</p>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <RecentTicketsTable />
        </div>
      </main>
    </div>
  );
};

export default Tickets;
