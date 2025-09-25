"use client";

import {TrendingUp} from "lucide-react";
import {Area, AreaChart, CartesianGrid, XAxis} from "recharts";

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
	{month: "January", application: 186, hired: 80},
	{month: "February", application: 305, hired: 200},
	{month: "March", application: 237, hired: 120},
	{month: "April", application: 73, hired: 190},
	{month: "May", application: 209, hired: 130},
	{month: "June", application: 214, hired: 140},
];

const chartConfig = {
	application: {
		label: "Applications",
		color: "hsl(var(--chart-1))",
	},
	hired: {
		label: "Hired",
		color: "hsl(var(--chart-2))",
	},
} satisfies ChartConfig;

const months = [
	"January",
	"February",
	"March",
	"May",
	"June",
	"July",
	"August",
	"September",
	"October",
	"November",
	"December",
];

export function AreaChartGradient() {
	return (
		<Card className="rounded-3xl">
			<CardHeader>
				<CardTitle>Applications & Hired</CardTitle>
				<CardDescription>
					Showing total number of applications for the last 6 months
				</CardDescription>
			</CardHeader>
			<CardContent>
				<ChartContainer config={chartConfig}>
					<AreaChart
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
						<ChartTooltip cursor={false} content={<ChartTooltipContent />} />
						<defs>
							<linearGradient id="fillApplication" x1="0" y1="0" x2="0" y2="1">
								<stop
									offset="5%"
									stopColor="var(--color-application)"
									stopOpacity={0.8}
								/>
								<stop
									offset="95%"
									stopColor="var(--color-application)"
									stopOpacity={0.1}
								/>
							</linearGradient>
							<linearGradient id="fillHired" x1="0" y1="0" x2="0" y2="1">
								<stop
									offset="5%"
									stopColor="var(--color-hired)"
									stopOpacity={0.8}
								/>
								<stop
									offset="95%"
									stopColor="var(--color-hired)"
									stopOpacity={0.1}
								/>
							</linearGradient>
						</defs>
						<Area
							dataKey="hired"
							type="natural"
							fill="url(#fillHired)"
							fillOpacity={0.4}
							stroke="var(--color-hired)"
							stackId="a"
						/>
						<Area
							dataKey="application"
							type="natural"
							fill="url(#fillApplication)"
							fillOpacity={0.4}
							stroke="var(--color-application)"
							stackId="a"
						/>
					</AreaChart>
				</ChartContainer>
			</CardContent>
			<CardFooter>
				<div className="flex w-full items-start gap-2 text-sm">
					<div className="grid gap-2">
						<div className="flex items-center gap-2 font-medium leading-none">
							applications and hired this month
							<TrendingUp className="h-4 w-4" />
						</div>
						<div className="flex items-center gap-2 leading-none text-muted-foreground">
							January - June 2024
						</div>
					</div>
				</div>
			</CardFooter>
		</Card>
	);
}
