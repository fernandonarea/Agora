import { useState } from "react";
import { useProducts } from "@/hooks/useProducts";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertTitle } from "@/components/ui/alert";
import { CheckCircle2 } from "lucide-react";


export const CreateProductForm = ({ token, isOpen, onClose}) => {
  const { newProduct, loading, error } = useProducts();
  const [productData, setProductData] = useState({
    product_name: "",
    product_description: "",
    product_price: 0,
    stock: 0,
  });
  const [alert, setAlert] = useState(false);

  const handleChange = (e) => {
    setProductData({
      ...productData,
      [e.target.name]: e.target.value,
    });
  };

  const handleCreateProduct = async (e) => {
    e.preventDefault();
    const result = await newProduct(token, productData);
    if (result.success) {
      setProductData({
        product_name: "",
        product_description: "",
        product_price: 0,
        stock: 0,
      });
      setAlert(true);
      setTimeout(() => setAlert(false), 3000);
      console.log("Producto creado con éxito");
    } else {
      console.log("Error al crear el producto:", result.message);
    }
  };

  return (
    <div className="dark:bg-black">
      {isOpen && (
        <form
          onSubmit={handleCreateProduct}
          className="flex flex-col gap-6 w-96 dark:bg-black"
        >
          <Label className={"text-2xl"}>Crear nuevo producto</Label>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <div className="grid gap-3">
                <Label>Nombre del Producto</Label>
                <Input
                  name="product_name"
                  type="text"
                  onChange={handleChange}
                  value={productData.product_name}
                  placeholder="Galleta Oreo"
                  required
                  autoComplete="off"
                />
              </div>

              <div className="grid gap-3">
                <Label>Descripcion breve del producto</Label>
                <Textarea
                  name="product_description"
                  type="text"
                  onChange={handleChange}
                  value={productData.product_description}
                />
              </div>

              <div className="grid gap-3">
                <Label>Precio</Label>
                <Input
                  name="product_price"
                  type="number"
                  onChange={handleChange}
                  value={productData.product_price}
                  placeholder="$5"
                  required
                />
              </div>

              <div className="grid gap-3">
                <Label>Stock disponible</Label>
                <Input
                  name="stock"
                  type="number"
                  onChange={handleChange}
                  value={productData.stock}
                  placeholder="40"
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
          <div className="flex flex-row gap-2.5 items-center justify-end">
            <Button
              type="submit"
              className=" bg-violet-700 hover:bg-violet-800"
              disabled={loading}
            >
              {loading ? "Loading..." : "Create Product"}
            </Button>
            <Button
              onClick={onClose}
              variant={"outline"}
              className="bg-secondary text-secondary-foreground hover:bg-gray-200"
            >
              Cancelar
            </Button>
          </div>
        </form>
      )}
      {alert && (
        <Alert className="bg-green-50 border-green-600 text-green-700 mt-5 dark:bg-green-800 dark:border-green-400 dark:text-green-200">
          <CheckCircle2 className="h-4 w-4" />
          <AlertTitle>Producto creado exitosamente</AlertTitle>
        </Alert>
      )}
    </div>
  );
};
