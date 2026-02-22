import { useState, useEffect } from "react";
import useSupplier from "@/hooks/useSupplier";
import { Button } from "../ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertTitle } from "@/components/ui/alert";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { CheckCircle2 } from "lucide-react";

export const UpdateSupplierForm = ({ token, supplier, isOpen, onClose, onUpdated }) => {
  const { UpdateSupplier, loading, error } = useSupplier();

  const [alert, setAlert] = useState(false);
  const [supplierData, setSupplierData] = useState({
    supplier_name: "",
    supplier_phone: "",
    supplier_email: "",
  });

  useEffect(() => {
    if (supplier) {
      setSupplierData({
        supplier_name: supplier.supplier_name,
        supplier_phone: supplier.supplier_phone,
        supplier_email: supplier.supplier_email,
      });
    }
  }, [supplier]);

  const handleUpdate = async (e) => {
    e.preventDefault();

    const response = await UpdateSupplier(
      supplier.id_supplier,
      supplierData,
      token,
    );
    if (response) {
      setAlert(true);
      setTimeout(() => {
        error;
        setAlert(false);
        onClose();
        onUpdated?.();
      }, 1500);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSupplierData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent side="left">
        <SheetHeader>
          <SheetTitle>Update Supplier</SheetTitle>
          <SheetDescription className={"mb-4"}>
            Edit the information below to update the Supplier.
          </SheetDescription>

          {supplier && (
            <form onSubmit={handleUpdate} className="flex flex-col gap-4">
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <div className="grid gap-3">
                    <Label>Supplier Name</Label>
                    <Input
                      name="supplier_name"
                      type="text"
                      onChange={handleChange}
                      value={supplierData.supplier_name}
                      required
                    />
                  </div>

                  <div className="grid gap-3">
                    <Label>Supplier Phone</Label>
                    <Textarea
                      name="supplier_phone"
                      type="phone"
                      onChange={handleChange}
                      value={supplierData.supplier_phone}
                      required
                    />
                  </div>

                  <div className="grid gap-3">
                    <Label>Email</Label>
                    <Input
                      name="supplier_email"
                      type="email"
                      onChange={handleChange}
                      value={supplierData.supplier_email}
                      required
                    />
                  </div>
                </div>
              </div>

              {error && (
                <p className="text-red-500 text-sm font-medium text-center">
                  {error}
                </p>
              )}

              <Button type="submit" disabled={loading}>
                {loading ? "Updating..." : "Update Product"}
              </Button>
            </form>
          )}

          {alert && (
            <Alert className="bg-green-50 border-green-600 text-green-700 mt-5 dark:bg-green-800 dark:border-green-400 dark:text-green-200">
              <CheckCircle2 className="h-4 w-4" />
              <AlertTitle>Supplier updated successfully</AlertTitle>
            </Alert>
          )}
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};
