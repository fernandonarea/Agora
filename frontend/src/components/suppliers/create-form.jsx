import { useState } from "react";
import useSupplier from "@/hooks/useSupplier";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { Alert, AlertDescription } from "../ui/alert";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { CheckCircle2 } from "lucide-react";
import { Button } from "../ui/button";

const CreateSupplierForm = ({ token, isOpen, onClose, onRefresh }) => {
  const [supplierData, setSupplierData] = useState({
    supplier_name: "",
    supplier_phone: "",
    supplier_email: "",
  });
  const [alert, setAlert] = useState(false);
  const { CreateSupplier, loading, error } = useSupplier();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSupplierData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      CreateSupplier(supplierData, token);
      setSupplierData({
        supplier_name: "",
        supplier_phone: "",
        supplier_email: "",
      });
      if (onRefresh) onRefresh();
      setAlert(true);
      setTimeout(() => {
        setAlert(false);
      }, 2000);
    } catch (error) {
      console.error("Error creating supplier:", error);
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Create Supplier</SheetTitle>
          <SheetDescription>
            Complete the form below to add a new supplier.
          </SheetDescription>
        </SheetHeader>

        {isOpen && (
          <form
            onSubmit={handleSubmit}
            className="flex flex-col p-4 gap-6 dark:bg-black"
          >
            <div className="grid gap-4">
              <div className="grid gap-6">
                <div className="grid gap-3">
                  <Label>Supplier Name</Label>
                  <Input
                    name="supplier_name"
                    type="text"
                    onChange={handleChange}
                    value={supplierData.supplier_name}
                    required
                    autoComplete="off"
                  />
                </div>

                <div className="grid gap-3">
                  <Label>Supplier Phone</Label>
                  <Input
                    name="supplier_phone"
                    type="text"
                    onChange={handleChange}
                    value={supplierData.supplier_phone}
                  />
                </div>

                <div className="grid gap-3">
                  <Label>Supplier Email</Label>
                  <Input
                    name="supplier_email"
                    type="email"
                    onChange={handleChange}
                    value={supplierData.supplier_email}
                    required
                  />
                </div>
                {error && (
                  <p className="text-red-500 text-sm font-medium text-center">
                    {error}
                  </p>
                )}
              </div>
            </div>
            <Button type="submit" disabled={loading} className="w-full">
              {loading ? "Creating..." : "Create Supplier"}
            </Button>
          </form>
        )}
        {alert && (
          <Alert className="bg-green-50 border-green-600 text-green-700 mt-5 dark:bg-green-800 dark:border-green-400 dark:text-green-200">
            <CheckCircle2 />
            <AlertDescription className="text-sm font-medium">
              Supplier created successfully!
            </AlertDescription>
          </Alert>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default CreateSupplierForm;
