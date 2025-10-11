import { CreateSalesForm } from "@/components/sales/create-sale-form";
import { Button } from "@/components/ui/button";
import { Plus, Share } from "lucide-react";

export const Ventas = () => {
  const token = localStorage.getItem("token");

  return (
    <div className="overflow-hidden flex flex-col h-dvh sm: grid-cols-3">
      <header className="flex p-5 border-b-1 justify-between items-center ">
        <div className="text-2xl font-semibold">Sales</div>
      </header>
      
      <div className="p-5 overflow-auto">
        <CreateSalesForm token={token}/>
      </div>
    
    </div>
  );
};
