import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { ticketsByCategory } from "@/data/mock-data";

const COLORS = [
  "hsl(174 72% 46%)",
  "hsl(38 92% 55%)",
  "hsl(262 60% 58%)",
  "hsl(0 72% 55%)",
  "hsl(200 70% 55%)",
  "hsl(152 60% 46%)",
  "hsl(330 60% 55%)",
];

const CategoryPieChart = () => {
  return (
    <div className="glass-card rounded-xl p-5">
      <h3 className="mb-4 text-sm font-semibold text-foreground">Tickets by Category</h3>
      <div className="flex items-center gap-6">
        <ResponsiveContainer width="50%" height={220}>
          <PieChart>
            <Pie
              data={ticketsByCategory}
              cx="50%"
              cy="50%"
              innerRadius={55}
              outerRadius={85}
              paddingAngle={3}
              dataKey="value"
              stroke="none"
            >
              {ticketsByCategory.map((_, index) => (
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
          {ticketsByCategory.map((entry, index) => (
            <div key={entry.name} className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <div
                  className="h-2.5 w-2.5 rounded-full"
                  style={{ backgroundColor: COLORS[index % COLORS.length] }}
                />
                <span className="text-muted-foreground">{entry.name}</span>
              </div>
              <span className="font-medium text-foreground">{entry.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryPieChart;
