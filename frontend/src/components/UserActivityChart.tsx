import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

// Mock data for user activity trends
const userActivityData = [
  { date: "Feb 8", registrations: 1, logins: 12 },
  { date: "Feb 9", registrations: 0, logins: 15 },
  { date: "Feb 10", registrations: 2, logins: 18 },
  { date: "Feb 11", registrations: 1, logins: 14 },
  { date: "Feb 12", registrations: 1, logins: 16 },
  { date: "Feb 13", registrations: 0, logins: 20 },
  { date: "Feb 14", registrations: 0, logins: 22 },
];

const UserActivityChart = () => {
  return (
    <div className="glass-card rounded-xl p-5">
      <h3 className="mb-4 text-sm font-semibold text-foreground">User Activity (Last 7 Days)</h3>
      <ResponsiveContainer width="100%" height={260}>
        <LineChart data={userActivityData}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(222 20% 16%)" />
          <XAxis dataKey="date" tick={{ fill: "hsl(215 20% 55%)", fontSize: 12 }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fill: "hsl(215 20% 55%)", fontSize: 12 }} axisLine={false} tickLine={false} />
          <Tooltip
            contentStyle={{
              backgroundColor: "hsl(222 44% 10%)",
              border: "1px solid hsl(222 20% 16%)",
              borderRadius: "8px",
              color: "hsl(210 40% 96%)",
              fontSize: 12,
            }}
          />
          <Legend wrapperStyle={{ fontSize: 12, color: "hsl(215 20% 55%)" }} />
          <Line 
            type="monotone" 
            dataKey="registrations" 
            stroke="hsl(174 72% 46%)" 
            strokeWidth={2}
            name="New Registrations"
            dot={{ fill: "hsl(174 72% 46%)", r: 4 }}
          />
          <Line 
            type="monotone" 
            dataKey="logins" 
            stroke="hsl(262 60% 58%)" 
            strokeWidth={2}
            name="Login Activity"
            dot={{ fill: "hsl(262 60% 58%)", r: 4 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default UserActivityChart;
