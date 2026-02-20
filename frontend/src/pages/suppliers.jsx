import CreateSupplierForm from "@/components/suppliers/create-form";
import SuppliersList from "@/components/suppliers/suppliers-list";
import { Button } from "@/components/ui/button";
import { Plus, Share } from "lucide-react";
import { useState } from "react";

const SuppliersPage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);
  const token = localStorage.getItem("token");

  const handleRefresh = () => {
    setRefreshKey((prev) => prev + 1);
  };

  const handleClose = () => setIsOpen(false);

  return (
    <div className="overflow-auto flex flex-col h-dvh">
      <header className="flex p-5 border-b-1 justify-between items-center ">
        <div className="text-2xl font-semibold">Suppliers</div>
        <div className="flex flex-row justify-between gap-2">
          <Button
            className="bg-[var(--primary)] text-primary-foreground hover:bg-violet-800"
            onClick={() => setIsOpen(true)}
          >
            <Plus strokeWidth={3} />
            Add Supplier
          </Button>
        </div>
      </header>
      <div className="p-4 flex-1">
        <SuppliersList
          token={token}
          key={refreshKey}
          onRefresh={handleRefresh}
        />
      </div>
      <CreateSupplierForm token={token} isOpen={isOpen} onClose={handleClose} onRefresh={handleRefresh}/>
    </div>
  );
};

export default SuppliersPage;
