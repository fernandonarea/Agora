import { useEffect } from "react";
import { useSale } from "@/hooks/useSale";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

// import {
//   BarChart,
//   Bar,
//   ChartTooltip,
//   ChartTooltipContent,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Legend,
// } from "recharts";
// import { ChartContainer } from "@/components/ui/chart";

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

export const Graphics = ({ token }) => {
  const { data, getGraphicsData, error, loading } = useSale();

  useEffect(() => {
    getGraphicsData(token);
  }, [token]);

  const formattedData = data.map((item) => ({
    ...item,
    dia: new Date(item.dia).toLocaleDateString("es-ES", {
      day: "numeric",
      month: "short",
      year: "numeric",
    }),
  }));

  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }

  if (loading) {
    return <div>Loading metrics...</div>;
  }

  const chartConfig = {
    total: {
      label: "Sales",
      color: "#9827F5",
    },
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Month Sales</CardTitle>
        <CardDescription>September - October 2025</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[600px] w-full">
          <BarChart
            data={formattedData}
            width={400}
            height={300}
            accessibilityLayer
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis
              dataKey="dia"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
            />
            {/* <YAxis /> */}
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            {/* <Tooltip labelStyle={{ color: "black" }} /> */}
            {/* <Legend /> */}
            <Bar dataKey="total" fill={chartConfig.total.color} radius={8} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};
