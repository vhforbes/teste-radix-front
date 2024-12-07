"use client";

import { TrendingUp } from "lucide-react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  XAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltipContent,
} from "@/components/ui/chart";

// The data should be directly used without grouping, keeping the timestamps as they are
export function EquipmentChart({ rawData }: { rawData: any }) {
  // Mapping raw data to include formatted date and temperature
  const chartData = rawData.map((item: any) => ({
    timestamp: new Date(item.timestamp).toLocaleDateString(), // Formatting timestamp to a readable string
    Temperatura: item.value,
  }));

  // Custom Tooltip to show the temperature and timestamp properly
  const CustomTooltip = ({ payload }: any) => {
    if (!payload || !payload.length) return null;

    const { timestamp, Temperatura } = payload[0].payload;

    return (
      <div className="rounded border bg-slate-700 p-2 shadow-lg">
        <div className="text-sm font-semibold">{`${timestamp}`}</div>
        <div className="text-xl font-bold">{`${Temperatura}°C`}</div>
      </div>
    );
  };

  const chartConfig = {
    equipment: {
      label: "Sensor Value",
      color: "#FFFFF",
    },
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Valor da temperatura ao longo do tempo</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={chartData} margin={{ left: 12, right: 12 }}>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="timestamp"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tickFormatter={(value) => value} // Format the timestamp string (limit it)
              />
              <Tooltip content={<CustomTooltip />} cursor={false} />
              <Area
                dataKey="Temperatura"
                type="linear"
                fill="#FFF"
                fillOpacity={0.4}
                stroke="#797979"
              />
            </AreaChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
