import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { users } from "@/data/mock-data";

const COLORS = [
  "hsl(262 60% 58%)", // Purple for Admin
  "hsl(174 72% 46%)", // Teal for Agent
  "hsl(215 20% 55%)", // Gray for Customer
];

// Calculate role distribution
const roleData = users.reduce((acc, user) => {
  const existing = acc.find(item => item.name === user.role);
  if (existing) {
    existing.value++;
  } else {
    acc.push({ name: user.role, value: 1 });
  }
  return acc;
}, [] as { name: string; value: number }[]);

const RoleDistributionChart = () => {
  const total = users.length;

  return (
    <div className="glass-card rounded-xl p-5">
      <h3 className="mb-4 text-sm font-semibold text-foreground">Users by Role</h3>
      <div className="flex items-center gap-6">
        <ResponsiveContainer width="50%" height={220}>
          <PieChart>
            <Pie
              data={roleData}
              cx="50%"
              cy="50%"
              innerRadius={55}
              outerRadius={85}
              paddingAngle={3}
              dataKey="value"
              stroke="none"
            >
              {roleData.map((_, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(222 44% 10%)",
                border: "1px solid hsl(222 20% 16%)",
                borderRadius: "8px",
                color: "hsl(210 40% 96%)",
                fontSize: 12,
              }}
            />
          </PieChart>
        </ResponsiveContainer>
        <div className="flex-1 space-y-2">
          {roleData.map((entry, index) => (
            <div key={entry.name} className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <div
                  className="h-2.5 w-2.5 rounded-full"
                  style={{ backgroundColor: COLORS[index % COLORS.length] }}
                />
                <span className="text-muted-foreground">{entry.name}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-medium text-foreground">{entry.value}</span>
                <span className="text-muted-foreground">({Math.round((entry.value / total) * 100)}%)</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RoleDistributionChart;
