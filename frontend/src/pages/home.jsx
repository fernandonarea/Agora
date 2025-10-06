import { Activity, BanknoteArrowUpIcon, PackageMinus } from "lucide-react";
import { useSale } from "@/hooks/useSale";
import { useEffect } from "react";
import BestSellingProducts from "@/components/products/best-selling-products";
import { Graphics } from "@/components/sales/graphics";

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
    <div className="overflow-auto flex flex-col h-dvh">
      <header className="flex p-5 border-b-1 ">
        <div className="text-2xl font-semibold">Inicio</div>
      </header>
      {/* METRIC CARDS */}
      <div className="grid gap-2 grid-cols-1 wrap-break-word p-5 justify-between w-full sm:grid-cols-3">
        <div className="flex flex-col gap-5 border-1 h-fit rounded-md shadow-xs p-5 dark:bg-sidebar-accent">
          <div className="bg-violet-600 p-3 rounded-4xl w-fit text-white">
            <BanknoteArrowUpIcon />
          </div>
          <div className="flex flex-col gap-2 ">
            <h1 className="text-muted-foreground">Ganancias del Día</h1>
            <p className="text-3xl font-bold">${metrics.totalIncome}</p>
          </div>
        </div>

        <div className="flex flex-col gap-5 border-1 h-fit rounded-md shadow-xs p-5 dark:bg-sidebar-accent">
          <div className="bg-amber-600 p-3 rounded-4xl w-fit text-white justify-end-safe">
            <Activity />
          </div>
          <div className="flex flex-col gap-2">
            <h1 className="text-muted-foreground">Ventas del Día</h1>
            <p className="text-3xl font-bold">{metrics.todaySales}</p>
          </div>
        </div>

        <div className="flex flex-col gap-5 border-1 h-fit rounded-md shadow-xs p-5 dark:bg-sidebar-accent">
          <div className="bg-red-700 p-3 rounded-4xl w-fit text-white">
            <PackageMinus />
          </div>
          <div className="flex flex-col gap-2">
            <h1 className="text-muted-foreground">Productos con bajo Stock</h1>
            <p className="text-3xl font-bold">{metrics.lowStockProducts}</p>
          </div>
        </div>
      </div>

      {/* Graficos */}
      <div className="p-5">
        <Graphics token={token}/>
      </div>

      {/* BEST SELLING PRODUCTS */}
      <div className="p-5 mb-2">
        <h2 className="text-xl font-medium mb-3">Best Selling Products</h2>
        <BestSellingProducts token={token} />
      </div>
    </div>
  );
};
