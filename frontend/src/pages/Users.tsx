import { useState } from "react";
import DashboardSidebar from "@/components/DashboardSidebar";
import KpiCard from "@/components/KpiCard";
import UsersTable from "@/components/UsersTable";
import UserActivityChart from "@/components/UserActivityChart";
import RoleDistributionChart from "@/components/RoleDistributionChart";
import RecentUserActivity from "@/components/RecentUserActivity";
import { User, Users as UsersIcon, UserCheck, UserPlus, Shield } from "lucide-react";
import { User as AppUser, getStoredUsers, saveStoredUsers } from "@/data/mock-data";

const Users = () => {
  const [users, setUsers] = useState<AppUser[]>(() => getStoredUsers());

  const now = new Date();
  const sevenDaysAgo = new Date(now);
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

  const totalUsers = users.length;

  const activeUsers = users.filter((user) => {
    const lastLogin = new Date(user.lastLogin);
    return lastLogin >= sevenDaysAgo;
  }).length;

  const newUsersThisMonth = users.filter((user) => {
    const createdDate = new Date(user.createdAt);
    return createdDate.getMonth() === now.getMonth() && createdDate.getFullYear() === now.getFullYear();
  }).length;

  const roleCount = users.reduce((acc, user) => {
    acc[user.role] = (acc[user.role] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const adminCount = roleCount["Admin"] || 0;
  const agentCount = roleCount["Agent"] || 0;
  const customerCount = roleCount["Customer"] || 0;

  const handleUsersChange = (updatedUsers: AppUser[]) => {
    setUsers(updatedUsers);
    saveStoredUsers(updatedUsers);
  };

  return (
    <div className="flex min-h-screen bg-background">
      <DashboardSidebar />

      <main className="ml-64 flex-1 p-8">
        <div className="mb-8">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
              <User className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">Users</h1>
              <p className="text-sm text-muted-foreground">Manage and track all users</p>
            </div>
          </div>
        </div>

        {/* KPI Cards */}
        <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <KpiCard
            title="Total Users"
            value={totalUsers}
            change={`${newUsersThisMonth} new this month`}
            changeType="positive"
            icon={UsersIcon}
          />
          <KpiCard
            title="Active Users"
            value={activeUsers}
            change={`${Math.round((activeUsers / totalUsers) * 100)}% of total`}
            changeType="neutral"
            icon={UserCheck}
          />
          <KpiCard
            title="New Users"
            value={newUsersThisMonth}
            change="This month"
            changeType="positive"
            icon={UserPlus}
          />
          <KpiCard
            title="User Roles"
            value={`${adminCount}/${agentCount}/${customerCount}`}
            change="Admin/Agent/Customer"
            changeType="neutral"
            icon={Shield}
          />
        </div>

        <div className="space-y-6">
          <UsersTable users={users} onUsersChange={handleUsersChange} />

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <UserActivityChart />
            <RoleDistributionChart />
          </div>

          <RecentUserActivity />
        </div>
      </main>
    </div>
  );
};

export default Users;