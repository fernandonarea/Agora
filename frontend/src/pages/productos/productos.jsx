import { CreateProductForm } from "@/components/products/crud/create-product-form";
import ProductList from "@/components/products/products-list";
import { Button } from "@/components/ui/button";
import { Plus, Share } from "lucide-react";
import { useState } from "react";
import { InventoryButton } from "@/components/reports/inventory_button";

export const Productos = () => {
  const token = localStorage.getItem("token");
  const [isOpen, setIsOpen] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  const handleRefresh = () => {
    setRefreshKey((prev) => prev + 1);
  };

  const handleClose = () => setIsOpen(false);

  return (
    <div>
      <header className="flex p-5 border-b-1 justify-between items-center ">
        <div className="text-2xl font-semibold">Products</div>
        <div className="flex flex-row justify-between gap-2">
          <Button className="bg-[var(--secondary)] text-accent-foreground hover:bg-gray-300 dark:hover:bg-gray-900">
            <Share />
            <InventoryButton/>
          </Button>
          <Button
            onClick={setIsOpen}
            className="bg-[var(--primary)] text-primary-foreground hover:bg-violet-800"
          >
            <Plus strokeWidth={3} />
            Add Product
          </Button>
        </div>
      </header>
      <ProductList token={token} key={refreshKey} onRefresh={handleRefresh}/>
      <div>
        <CreateProductForm
          token={token}
          isOpen={isOpen}
          onClose={handleClose}
          onRefresh={handleRefresh}
        />
      </div>
    </div>
  );
};
