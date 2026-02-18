import { Ticket, Clock, CheckCircle, Star } from "lucide-react";
import DashboardSidebar from "@/components/DashboardSidebar";
import KpiCard from "@/components/KpiCard";
import TicketTrendsChart from "@/components/TicketTrendsChart";
import CategoryPieChart from "@/components/CategoryPieChart";
import RecentTicketsTable from "@/components/RecentTicketsTable";
import AgentPerformance from "@/components/AgentPerformance";
import ActivityFeed from "@/components/ActivityFeed";
import { tickets } from "@/data/mock-data";

const openTickets = tickets.filter((t) => t.status === "Open").length;
const pendingTickets = tickets.filter((t) => t.status === "Pending").length;
const closedTickets = tickets.filter((t) => t.status === "Closed").length;
const resolutionRate = Math.round((closedTickets / tickets.length) * 100);

const Index = () => {
  return (
    <div className="flex min-h-screen bg-background">
      <DashboardSidebar />

      <main className="ml-64 flex-1 p-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
          <p className="text-sm text-muted-foreground">Overview of your customer support operations</p>
        </div>

        {/* KPI Cards */}
        <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <KpiCard
            title="Open Tickets"
            value={openTickets}
            change={`+${pendingTickets} pending`}
            changeType="negative"
            icon={Ticket}
          />
          <KpiCard
            title="Avg Response Time"
            value="1.0h"
            change="−12% from last week"
            changeType="positive"
            icon={Clock}
          />
          <KpiCard
            title="Resolution Rate"
            value={`${resolutionRate}%`}
            change="+5% from last week"
            changeType="positive"
            icon={CheckCircle}
          />
          <KpiCard
            title="Avg Satisfaction"
            value="4.8"
            change="Based on 496 ratings"
            changeType="neutral"
            icon={Star}
          />
        </div>

        {/* Charts */}
        <div className="mb-8 grid grid-cols-1 gap-4 lg:grid-cols-2">
          <TicketTrendsChart />
          <CategoryPieChart />
        </div>

        {/* Tickets Table */}
        <div className="mb-8">
          <RecentTicketsTable />
        </div>

        {/* Bottom Row */}
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          <AgentPerformance />
          <ActivityFeed />
        </div>
      </main>
    </div>
  );
};

export default Index;
