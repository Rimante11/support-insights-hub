import { agents } from "@/data/mock-data";
import { Star } from "lucide-react";

const AgentPerformance = () => {
  return (
    <div className="glass-card overflow-hidden rounded-xl">
      <div className="border-b border-border px-5 py-4">
        <h3 className="text-sm font-semibold text-foreground">Agent Performance</h3>
      </div>
      <div className="divide-y divide-border">
        {agents.map((agent) => (
          <div key={agent.agentName} className="flex items-center justify-between px-5 py-4 transition-colors hover:bg-muted/30">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/15 text-sm font-semibold text-primary">
                {agent.agentName.split(" ").map((n) => n[0]).join("")}
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">{agent.agentName}</p>
                <p className="text-xs text-muted-foreground">Avg. response: {agent.averageResponseTime}</p>
              </div>
            </div>
            <div className="flex items-center gap-6">
              <div className="text-right">
                <p className="text-sm font-semibold text-foreground">{agent.ticketsResolved}</p>
                <p className="text-xs text-muted-foreground">resolved</p>
              </div>
              <div className="flex items-center gap-1">
                <Star className="h-3.5 w-3.5 fill-warning text-warning" />
                <span className="text-sm font-medium text-foreground">{agent.rating}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AgentPerformance;
