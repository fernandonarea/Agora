import { useState } from "react";
import { useProducts } from "@/hooks/useProducts";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";


export const CreateProductForm = ({ token, isOpen, onClose, onRefresh }) => {
  const { newProduct, loading, error } = useProducts();
  const [productData, setProductData] = useState({
    product_name: "",
    product_description: "",
    product_price: 0,
    stock: 0,
  });

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
      onRefresh();
      toast.success("Producto creado Correctamente")

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
              className="flex flex-col gap-6"
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
                      min="0"
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

              <Button
                type="submit"
                className=" bg-violet-700 hover:bg-violet-800"
                disabled={loading}
              >
                {loading ? "Loading..." : "Create Product"}
              </Button>
            </form>
          )}
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};
