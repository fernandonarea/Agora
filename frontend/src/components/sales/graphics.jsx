import { useEffect } from "react";
import { useSale } from "@/hooks/useSale";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { ChartContainer } from "@/components/ui/chart";

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
      year: "numeric"
    }),
  }));

  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }

  if (loading) {
    return <div>Cargando metricas...</div>;
  }

  const chartConfig = {
    total: {
      label: "Ventas",
      color: "#9827F5",
    },
  };

  return (
    <ChartContainer config={chartConfig} className="h-[600px] w-full">
      <BarChart data={formattedData} width={400} height={300}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="dia"/>
        <YAxis />
        <Tooltip labelStyle={{ color: "black" }} />
        <Legend />
        <Bar dataKey="total" fill={chartConfig.total.color} radius={4} />
      </BarChart>
    </ChartContainer>
  );
};
