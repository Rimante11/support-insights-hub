import DashboardSidebar from "@/components/DashboardSidebar";
import { Activity as ActivityIcon } from "lucide-react";

const Activity = () => {
  return (
    <div className="flex min-h-screen bg-background">
      <DashboardSidebar />

      <main className="ml-64 flex-1 p-8">
        <div className="mb-8">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
              <ActivityIcon className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">Activity</h1>
              <p className="text-sm text-muted-foreground">More information will come soon</p>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <h4>In Progress</h4>
        </div>
      </main>
    </div>
  );
};

export default Activity;
