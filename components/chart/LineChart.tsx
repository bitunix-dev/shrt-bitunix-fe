"use client"

import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts"

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"
import { useGetClicks } from "@/hooks/useGetClicksUrl"

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

export const LineChart = ()=> {
    const { data } = useGetClicks();

    const chartData = data?.data?.clicks?.map((item: dataChart) => ({
        hour: item.hour,
        clicks: item.clicks,
    })) || [];

    return (
        <Card className="bg-transparent text-white h-[500px]">
            <CardHeader>
                <CardTitle>Area Chart</CardTitle>
                <CardDescription>
                    Showing total clicks over time
                </CardDescription>
            </CardHeader>
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
                        <CartesianGrid vertical={false} />
                        <XAxis
                            color=""
                            dataKey="hour"
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                            tickFormatter={(value) => value.slice(11, 16)}
                        />
                        <YAxis
                            allowDecimals={false}
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                        />
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent indicator="line" />}
                        />
                        <Area
                            dataKey="clicks"
                            type="natural"
                            fill="var(--color-clicks)"
                            fillOpacity={0.4}
                            stroke="var(--color-clicks)"
                        />
                    </AreaChart>
                </ChartContainer>
            </CardContent>
        </Card>
    );
}