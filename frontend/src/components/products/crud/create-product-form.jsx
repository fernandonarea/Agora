import { useState } from "react";
import { useProducts } from "@/hooks/useProducts";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertTitle } from "@/components/ui/alert";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { CheckCircle2 } from "lucide-react";

export const CreateProductForm = ({ token, isOpen, onClose, onRefresh }) => {
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
    try {
      await newProduct(productData, token);
      setProductData({
        product_name: "",
        product_description: "",
        product_price: 0,
        stock: 0,
      });
      setAlert(true);
      if (onRefresh) {
        onRefresh();
      }

      setTimeout(() => {
        setAlert(false);
      }, 2000);
    } catch (error) {
      console.error("Error creating product:", error);
      return;
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Create Product</SheetTitle>
          <SheetDescription className={"mb-5"}>
            Complete the details below to add a new product to the inventory.
          </SheetDescription>
          {isOpen && (
            <form
              onSubmit={handleCreateProduct}
              className="flex flex-col gap-6 dark:bg-black"
            >
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <div className="grid gap-3">
                    <Label>Product Name</Label>
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
                    <Label>Brief Description</Label>
                    <Textarea
                      name="product_description"
                      type="text"
                      onChange={handleChange}
                      value={productData.product_description}
                    />
                  </div>

                  <div className="grid gap-3">
                    <Label>Price</Label>
                    <Input
                      name="product_price"
                      type="number"
                      onChange={handleChange}
                      value={productData.product_price}
                      placeholder="$5"
                      min="0.1"
                      required
                    />
                  </div>

                  <div className="grid gap-3">
                    <Label>Available Stock</Label>
                    <Input
                      name="stock"
                      type="number"
                      onChange={handleChange}
                      value={productData.stock}
                      placeholder="40"
                      min="1"
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
              </div>
            </form>
          )}
          {alert && (
            <Alert className="bg-green-50 border-green-600 text-green-700 mt-5 dark:bg-green-800 dark:border-green-400 dark:text-green-200">
              <CheckCircle2 className="h-4 w-4" />
              <AlertTitle>Product created successfully</AlertTitle>
            </Alert>
          )}
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};