import { Activity, BanknoteArrowUpIcon, PackageMinus } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useSale } from "@/hooks/useSale";
import { useEffect } from "react";
import BestSellingProducts from "@/components/products/best-selling-products";
import { Graphics } from "@/components/sales/graphics";
import { CardsMetrics } from "@/components/metrics/cardsMetrics";

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
    <div className="overflow-auto flex flex-col h-dvh">
      <header className="flex p-5 border-b-1 ">
        <div className="text-2xl font-semibold">Home</div>
      </header>
      {/* METRIC CARDS */}
      <div className="grid gap-2 grid-cols-1 wrap-break-word p-4 justify-between w-full sm:grid-cols-3">
        
        <CardsMetrics
          title={"Today's Earnings"}
          value={`$${metrics.totalIncome}`}
          icon={<BanknoteArrowUpIcon />}
          iconBgColor={"bg-violet-600 dark:bg-violet-800"}
          percentageChange={statics.cambioPorcentual}
        />
        
        <CardsMetrics
          title={"Today's Sales"}
          value={`${metrics.todaySales}`}
          icon={<Activity />}
          iconBgColor={"bg-yellow-500 dark:bg-yellow-700"}
        />

        <CardsMetrics
          title={"Low Stock Products"}
          value={`${metrics.lowStockProducts}`}
          icon={<PackageMinus />}
          iconBgColor={"bg-red-500 dark:bg-red-800"}
        />
        
      </div>

      {/* Graficos */}
      <div className="grid gap-2 grid-cols-1 wrap-break-word p-4 justify-between w-full sm:grid-cols-2">
        <Graphics token={token} />
        <Graphics token={token} />
      </div>

      {/* BEST SELLING PRODUCTS */}
      <div className="p-5 mb-2">
        
            <h3 className="text-md font-semibold mb-5">Best Selling Products</h3>
            <BestSellingProducts token={token} />
      </div>
    </div>
  );
};