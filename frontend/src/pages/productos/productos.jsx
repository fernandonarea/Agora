import { CreateProductForm } from "@/components/products/crud/create-product-form";
import ProductList from "@/components/products/products-list";
import { Button } from "@/components/ui/button";
import { Plus, Share } from "lucide-react";
import { useState } from "react";

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
        <div className="text-2xl font-semibold">Productos</div>
        <div className="flex flex-row justify-between gap-2">
          <Button className="bg-[var(--secondary)] text-secondary-foreground">
            <Share />
            Export
          </Button>
          <Button
            onClick={setIsOpen}
            className="bg-[var(--primary)] text-primary-foreground"
          >
            <Plus strokeWidth={3} />
            Add Product
          </Button>
        </div>
      </header>
      <ProductList token={token} key={refreshKey} onRefresh={handleRefresh}/>
      <div
        className={`fixed top-0 right-0 h-full w-fit p-6 bg-white shadow-2xl transform transition-transform duration-300 z-50 dark:bg-black ${
          isOpen ? "translate-x-0  "  : "translate-x-full"
        }`}
      >
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
