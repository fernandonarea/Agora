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

const CreateSupplierForm = ({ token, isOpen, onClose }) => {
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
          <SheetTitle>Crea Supplier</SheetTitle>
        </SheetHeader>
        <SheetDescription>
          Completa los detalles a continuación para agregar un nuevo proveedor
          al sistema.
        </SheetDescription>

        {isOpen && (
          <form onSubmit={handleSubmit} className="space-y-4 p-4">
            <div className="grid gap-4">
              <div className="grid gap-2">
                <div className="grid gap-3">
                  <Label>Nombre del Proveedor</Label>
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
                  <Label>Teléfono del Proveedor</Label>
                  <Input
                    name="supplier_phone"
                    type="text"
                    onChange={handleChange}
                    value={supplierData.supplier_phone}
                  />
                </div>

                <div className="grid gap-3">
                  <Label>Email del Proveedor</Label>
                  <Input
                    name="supplier_email"
                    type="email"
                    onChange={handleChange}
                    value={supplierData.supplier_email}
                    required
                  />
                </div>
                {alert && (
                  <Alert className="flex items-center text-green-600">
                    <CheckCircle2 className="mr-2" />
                    <AlertDescription className="text-sm font-medium">
                      Proveedor creado con exito!
                    </AlertDescription>
                  </Alert>
                )}
                {error && (
                  <p className="text-red-500 text-sm font-medium text-center">
                    {error}
                  </p>
                )}
              </div>
            </div>
            <Button type="submit" disabled={loading} className="w-full">
              {loading ? "Creando..." : "Crear Proveedor"}
            </Button>
          </form>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default CreateSupplierForm;
