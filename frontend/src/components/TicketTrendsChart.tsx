import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { ticketsByDay } from "@/data/mock-data";

const TicketTrendsChart = () => {
  return (
    <div className="glass-card rounded-xl p-5">
      <h3 className="mb-4 text-sm font-semibold text-foreground">Ticket Trends (Last 7 Days)</h3>
      <ResponsiveContainer width="100%" height={260}>
        <BarChart data={ticketsByDay} barGap={4}>
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
          <Bar dataKey="created" fill="hsl(174 72% 46%)" radius={[4, 4, 0, 0]} name="Created" />
          <Bar dataKey="resolved" fill="hsl(262 60% 58%)" radius={[4, 4, 0, 0]} name="Resolved" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TicketTrendsChart;
