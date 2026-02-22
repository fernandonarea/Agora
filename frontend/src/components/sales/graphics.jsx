import { useEffect } from "react";
import { useSale } from "@/hooks/useSale";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"
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
    total_ventas: {
      label: "Sales",
      color: "#9827F5",
    },
  };

  const month = new Date().toLocaleString("en-EN", { month: "long", year: "numeric" });

  return (
    <Card className={"w-full"}>
      <CardHeader>
        <CardTitle>Month Sales</CardTitle>
        <CardDescription>{month.toUpperCase()}</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[300px] w-full">
          <BarChart
            data={formattedData}
            accessibilityLayer
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis
              dataKey="dia"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
            />

            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={10}
              tickFormatter={(value) => `$${value}`}
              domain={[0, 1600]}
              allowDataOverflow={true}
            />

            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="total_ventas" fill={chartConfig.total_ventas.color} radius={8} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};
