import { Activity, ArrowDown, ArrowUp, BanknoteArrowUpIcon, Icon, PackageMinus } from "lucide-react";
import { useSale } from "@/hooks/useSale";
import { useEffect } from "react";
import BestSellingProducts from "@/components/products/best-selling-products";
import { Graphics } from "@/components/sales/graphics";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge"

const getBadgeVariant = (change) => {
  const numericChange = Number(change);
  if (numericChange > 0) return "bg-green-600 dark:bg-green-700";
  if (numericChange < 0) return "bg-red-700 dark:bg-red-800";
  return "default";
};

const getBadgeIcon = (change) => {
  const numericChange = Number(change);
  if (numericChange > 0) return <ArrowUp size={16} strokeWidth="3px"/>;
  if (numericChange < 0) return <ArrowDown size={16} strokeWidth="3px"/>;
  return "default";
};

export const Home = () => {
  const { getMetrics, getStatics, statics, metrics, error, loading } = useSale();
  const token = localStorage.getItem("token");

  useEffect(() => {
    getMetrics(token);
    getStatics(token)
  }, [token]);

  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }

  if (loading) {
    return <div>Cargando metricas...</div>;
  }

  return (
    <div className="overflow-auto flex flex-col gap-0 h-dvh">
      <header className="flex p-5 border-b-1 ">
        <div className="text-2xl font-semibold">Home</div>
      </header>
      {/* METRIC CARDS */}
      <div className="grid gap-2 grid-cols-1 wrap-break-word p-5 justify-between w-full sm:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Earnings of the day</CardTitle>
            <CardDescription className={"text-xl"}>
              ${metrics.totalIncome}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="bg-violet-600 p-3 rounded-xl w-fit text-white">
              <BanknoteArrowUpIcon />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Today Sales</CardTitle>
            <CardDescription className={"flex flex-row justify-between items-center text-xl"}>
              {metrics.todaySales}
              <Badge className={getBadgeVariant(statics.cambioPorcentual)}>
                {getBadgeIcon(statics.cambioPorcentual)}
                {statics.cambioPorcentual}%
              </Badge>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="bg-amber-600 p-3 rounded-xl w-fit text-white justify-end-safe">
              <Activity />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Low Stock Products</CardTitle>
            <CardDescription className={"text-xl"}>
              {metrics.lowStockProducts}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="bg-red-700 p-3 rounded-xl w-fit text-white">
              <PackageMinus />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Graficos */}
      <div className="p-5">
        <Graphics token={token} />
      </div>

      {/* BEST SELLING PRODUCTS */}
      <div className="p-5 mb-2">
        <Card>
          <CardHeader>
            <CardTitle>Best Selling Products</CardTitle>
          </CardHeader>
          <CardContent>
            <BestSellingProducts token={token} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};