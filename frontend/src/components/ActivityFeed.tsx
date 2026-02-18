import { activityLogs } from "@/data/mock-data";

const ActivityFeed = () => {
  return (
    <div className="glass-card overflow-hidden rounded-xl">
      <div className="border-b border-border px-5 py-4">
        <h3 className="text-sm font-semibold text-foreground">Recent Activity</h3>
      </div>
      <div className="divide-y divide-border">
        {activityLogs.slice(0, 6).map((log) => (
          <div key={log.id} className="px-5 py-3 transition-colors hover:bg-muted/30">
            <div className="flex items-start justify-between">
              <div className="space-y-0.5">
                <p className="text-sm font-medium text-foreground">{log.action}</p>
                <p className="text-xs text-muted-foreground">{log.details}</p>
              </div>
              <div className="shrink-0 text-right">
                <p className="text-xs text-muted-foreground">{log.timestamp}</p>
                <p className="text-xs text-muted-foreground">{log.user}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActivityFeed;
