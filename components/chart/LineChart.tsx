"use client";

import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useGetClicks } from "@/hooks/useGetClicksUrl";
import * as React from "react";

interface dataChart {
  hour: string;
  clicks: number;
}

interface LineChartProps {
  dataChart: dataChart[];
}

const chartConfig = {
  clicks: {
    label: "Clicks",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date
    .toLocaleString("en-US", {
      year: "numeric",
      month: "long",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    })
    .replace(",", "")
    .replace("PM", "PM")
    .replace("AM", "AM");
};

export const LineChart = () => {
  const { data } = useGetClicks();
  const [timeRange, setTimeRange] = React.useState("90d");

  const filteredData = data?.data?.clicks?.filter((item: dataChart) => {
    const date = new Date(item.hour);
    const referenceDate = new Date();
    let daysToSubtract = 90;
    if (timeRange === "30d") {
      daysToSubtract = 30;
    } else if (timeRange === "7d") {
      daysToSubtract = 7;
    }
    const startDate = new Date(referenceDate);
    startDate.setDate(startDate.getDate() - daysToSubtract);
    return date >= startDate;
  }) || [];

  const chartData = filteredData.map((item: dataChart) => ({
    hour: formatDate(item.hour),
    clicks: Number(item.clicks).toLocaleString("en-US"),
  }));

  return (
    <Card className="bg-neutral-800 border border-neutral-800 text-white h-[500px]">
      <CardHeader className="flex md:flex-row md:justify-between items-center">
        <div className="text-center md:text-start">
          <CardTitle className="text-white text-2xl md:text-3xl font-bold">
            {Number(data?.data?.total_clicks ?? 0).toLocaleString("en-US")} Total Clicks
          </CardTitle>
          <CardDescription>
            Total number of clicks recorded within the selected timeframe.
          </CardDescription>
        </div>
        <div>
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[160px] rounded-lg">
              <SelectValue placeholder="Last 3 months" />
            </SelectTrigger>
            <SelectContent className="rounded-xl">
              <SelectItem value="90d" className="rounded-lg">Last 3 months</SelectItem>
              <SelectItem value="30d" className="rounded-lg">Last 30 days</SelectItem>
              <SelectItem value="7d" className="rounded-lg">Last 7 days</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent className="text-black">
        <ChartContainer className="h-[300px] md:h-[370px] w-full" config={chartConfig}>
          <AreaChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} strokeDasharray="6 6" />
            <XAxis
              color=""
              dataKey="hour"
              tickLine={false}
              axisLine={false}
              tickMargin={5}
              tickFormatter={(value) => value.slice(16, 30)}
            />
            <YAxis
              allowDecimals={true}
              tickLine={true}
              axisLine={false}
              tickMargin={8}
            />
            <ChartTooltip
              cursor={true}
              content={<ChartTooltipContent indicator="line" />}
            />
            <Area
              dataKey="clicks"
              type="linear"
              fill="var(--color-clicks)"
              fillOpacity={0.4}
              stroke="var(--color-clicks)"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};
