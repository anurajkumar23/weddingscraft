"use client";

import {
  CartesianGrid,
  LabelList,
  Line,
  LineChart,
  XAxis,
  YAxis,
} from "recharts";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

import { formatDate } from "@/lib/formaters";
import { ChartData } from "@/customTypes/dashboard-data";
import CardLayout from "@/components/CardLayout";

interface SalesLineChartProps {
  data: ChartData;
}

export default function SalesLineChart({ data }: SalesLineChartProps) {
  const chartData = data.labels.map((label, index) => ({
    day: formatDate(label),
    sales: data.data[index],
  }));

  const chartConfig: ChartConfig = {
    day: {
      label: "Day",
      color: "hsl(var(--primary))",
    },
  };

  return (
    <CardLayout
      title="Sales Over Time"
      description={`${formatDate(data.labels[data.labels.length - 1])} - ${formatDate(data.labels[0])}`}
    >
      <ChartContainer config={chartConfig} className="m-auto w-full h-[300px]">
        <LineChart
          data={chartData}
          margin={{
            top: 20,
            left: -18,
            right: 12,
          }}
        >
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="day"
            tickLine={false}
            axisLine={true}
            tickMargin={8}
          />
          <YAxis tickLine={false} axisLine={true} tickMargin={8} />
          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent indicator="line" />}
          />
          <Line
            dataKey="sales"
            type="natural"
            stroke="var(--color-day)"
            strokeWidth={2}
            dot={{
              fill: "var(--color-day)",
            }}
            activeDot={{
              r: 6,
            }}
          />
          {/* Custom LabelList using content for custom styling */}
          <LabelList
            position="top"
            offset={12}
            dataKey="sales"
            content={(props) => {
              const { x, y, value } = props; // Destructure the props
              return (
                <text
                  x={x}
                  y={y}
                  fill="black"
                  fontSize={12}
                  fontWeight="bold"
                  textAnchor="middle"
                >
                  {value}
                </text>
              );
            }}
          />
        </LineChart>
      </ChartContainer>
    </CardLayout>
  );
}
