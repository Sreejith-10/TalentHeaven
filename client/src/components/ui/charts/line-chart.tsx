"use client";

import {TrendingUp} from "lucide-react";
import {CartesianGrid, Line, LineChart, XAxis} from "recharts";

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
	ChartTooltip,
	ChartTooltipContent,
} from "@/components/ui/chart";
const chartData = [
	{month: "January", hiring: 2},
	{month: "February", hiring: 5},
	{month: "March", hiring: 1},
	{month: "April", hiring: 4},
	{month: "May", hiring: 2},
	{month: "June", hiring: 3},
];

const chartConfig = {
	hiring: {
		label: "hiring",
		color: "hsl(var(--chart-1))",
	},
} satisfies ChartConfig;

export function LineChartLinear() {
	return (
		<Card className="rounded-3xl w-full h-full flex flex-col">
			<CardHeader>
				<CardTitle>Hiring</CardTitle>
				<CardDescription>January - June 2024</CardDescription>
			</CardHeader>
			<CardContent>
				<ChartContainer config={chartConfig}>
					<LineChart
						accessibilityLayer
						data={chartData}
						margin={{
							left: 12,
							right: 12,
						}}>
						<CartesianGrid vertical={false} />
						<XAxis
							dataKey="month"
							tickLine={false}
							axisLine={false}
							tickMargin={8}
							tickFormatter={(value) => value.slice(0, 3)}
						/>
						<ChartTooltip
							cursor={false}
							content={<ChartTooltipContent hideLabel />}
						/>
						<Line
							dataKey="hiring"
							type="linear"
							stroke="var(--color-hiring)"
							strokeWidth={2}
							dot={false}
						/>
					</LineChart>
				</ChartContainer>
			</CardContent>
			<CardFooter className="flex-col items-start gap-2 mt-5 text-sm">
				<div className="flex gap-2 font-medium leading-none">
					2 hirings this month <TrendingUp className="h-4 w-4" />
				</div>
				<div className="leading-none text-muted-foreground">
					Showing total hiring for the last 6 months
				</div>
			</CardFooter>
		</Card>
	);
}
