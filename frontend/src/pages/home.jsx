import { Activity, BanknoteArrowUpIcon, PackageMinus } from "lucide-react";
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

export const Home = () => {
  const { getMetrics, metrics, error, loading } = useSale();
  const token = localStorage.getItem("token");

  useEffect(() => {
    getMetrics(token);
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
            <CardDescription className={"text-2xl"}>
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
            <CardDescription className={"text-2xl"}>
              ${metrics.todaySales}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="bg-amber-600 p-3 rounded-4xl w-fit text-white justify-end-safe">
              <Activity />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Low Stock Products</CardTitle>
            <CardDescription className={"text-2xl"}>
              {metrics.lowStockProducts}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="bg-red-700 p-3 rounded-4xl w-fit text-white">
              <PackageMinus />
            </div>
          </CardContent>
        </Card>
        {/* <div className="flex flex-col gap-5 border-1 h-fit rounded-md shadow-xs p-5 dark:bg-sidebar-accent">
          <div className="bg-violet-600 p-3 rounded-4xl w-fit text-white">
            <BanknoteArrowUpIcon />
          </div>
          <div className="flex flex-col gap-2 ">
            <h1 className="text-muted-foreground">Earnings of the day</h1>
            <p className="text-3xl font-bold">${metrics.totalIncome}</p>
          </div>
        </div> */}

        {/* <div className="flex flex-col gap-5 border-1 h-fit rounded-md shadow-xs p-5 dark:bg-sidebar-accent">
          <div className="bg-amber-600 p-3 rounded-4xl w-fit text-white justify-end-safe">
            <Activity />
          </div>
          <div className="flex flex-col gap-2">
            <h1 className="text-muted-foreground">Sales of the Day</h1>
            <p className="text-3xl font-bold">{metrics.todaySales}</p>
          </div>
        </div> */}

        {/* <div className="flex flex-col gap-5 border-1 h-fit rounded-md shadow-xs p-5 dark:bg-sidebar-accent">
          <div className="bg-red-700 p-3 rounded-4xl w-fit text-white">
            <PackageMinus />
          </div>
          <div className="flex flex-col gap-2">
            <h1 className="text-muted-foreground">Low Stock Products</h1>
            <p className="text-3xl font-bold">{metrics.lowStockProducts}</p>
          </div>
        </div> */}
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
