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
import { useGetClicks } from "@/hooks/useGetClicksUrl";

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

  const chartData =
    data?.data?.clicks?.map((item: dataChart) => ({
      hour: formatDate(item.hour),
      clicks: item.clicks,
    })) || [];

  return (
    <Card className="bg-neutral-800 border border-neutral-800 text-white h-[500px]">
      <CardHeader>
        <CardTitle>Total Clicks</CardTitle>
        <CardDescription>
          Total number of clicks recorded within the selected timeframe.
        </CardDescription>
      </CardHeader>
      <CardContent className="text-white text-3xl font-bold">
        {data?.data?.total_clicks ?? 0} Clicks
      </CardContent>
      <CardContent className="text-black">
        <ChartContainer className="h-[370px] w-full" config={chartConfig}>
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
