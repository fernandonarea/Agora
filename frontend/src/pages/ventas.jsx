import { CreateSalesForm } from "@/components/sales/create-sale-form";
import { Button } from "@/components/ui/button";
import { Plus, Share } from "lucide-react";

export const Ventas = () => {
  const token = localStorage.getItem("token");

  return (
    <div className="overflow-hidden flex flex-col h-dvh">
      <header className="flex p-5 border-b-1 justify-between items-center ">
        <div className="text-2xl font-semibold">Ventas</div>
        <div className="flex flex-row justify-between gap-2">
          <Button className="bg-secondary text-secondary-foreground">
            <Share />
            Export
          </Button>
          <Button
            className="bg-primary text-primary-foreground"
          >
            <Plus strokeWidth={3} />
            Nueva Venta
          </Button>
        </div>
      </header>
      
      <div className="p-5 overflow-auto">
        <CreateSalesForm token={token}/>
      </div>
    
    </div>
  );
};
