"use client";

import {
  Bar,
  BarChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const data = [
  { month: "Jan", newClients: 10, churnedClients: 2 },
  { month: "Feb", newClients: 15, churnedClients: 3 },
  { month: "Mar", newClients: 20, churnedClients: 5 },
  { month: "Apr", newClients: 25, churnedClients: 4 },
  { month: "May", newClients: 30, churnedClients: 6 },
  { month: "Jun", newClients: 35, churnedClients: 7 },
];

export function ClientAcquisitionChart() {
  return (
    <Card className="col-span-full xl:col-span-1">
      <CardHeader>
        <CardTitle>Client Acquisition</CardTitle>
        <CardDescription>
          New vs Churned Clients over the past 6 months
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="aspect-[4/3] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              margin={{ top: 5, right: 10, left: 10, bottom: 5 }}
            >
              <XAxis
                dataKey="month"
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => value.substring(0, 3)}
              />
              <YAxis
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                allowDecimals={false}
              />
              <Tooltip
                contentStyle={{
                  background: "#ffffff",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "var(--radius)",
                  color: "hsl(var(--foreground))",
                }}
                labelStyle={{
                  fontWeight: "bold",
                  color: "#000000",
                  marginBottom: "4px",
                }}
              />
              <Legend />
              <Bar
                dataKey="newClients"
                fill="#3b82f6"
                name="New Clients"
                radius={[4, 4, 0, 0]}
              />
              <Bar
                dataKey="churnedClients"
                fill="#ef4444"
                name="Churned Clients"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
