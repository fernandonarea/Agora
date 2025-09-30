import ProductList from "@/components/products/products-list";
import { Button } from "@/components/ui/button";
import { Plus, Share } from "lucide-react";

export const Productos = () => {
  const token = localStorage.getItem("token");

  return (
    <div>
      <header className="flex p-5 border-b-1 justify-between items-center ">
        <div className="text-2xl font-semibold">
          Productos
        </div>
        <div className="flex flex-row justify-between gap-2">
          <div>
            <Button className="flex flex-row bg-violet-700">
            <Plus />
            Add Product
          </Button>
          </div>
          <Button className="flex flex-row bg-secondary text-primary">
            <Share />
            Export
          </Button>
        </div>
      </header>
      <div id="content" className="flex flex-row p-2 max-h-full">
        <ProductList token={token}/>
      </div>
    </div>
  );
};
