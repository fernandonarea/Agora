import { useEffect, useState } from "react";
import { useProducts } from "@/hooks/useProducts";
import { Button } from "@/components/ui/button";
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

export const UpdateProductForm = ({
  token,
  product,
  isOpen,
  onClose,
  onUpdated,
}) => {
  const { updateProducts, error, loading } = useProducts();
  const [alert, setAlert] = useState(false);
  const [productData, setProductData] = useState({
    product_name: "",
    product_description: "",
    product_price: 0,
    stock: 0,
  });

  useEffect(() => {
    if (product) {
      setProductData({
        product_name: product.product_name || "",
        product_description: product.product_description || "",
        product_price: product.product_price || 0,
        stock: product.stock || 0,
      });
    }
  }, [product]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    const response = await updateProducts(
      product.id_product,
      productData,
      token
    );
    if (response) {
      setAlert(true);
      onUpdated?.();
      setTimeout(() => {
        error;
        setAlert(false);
        onClose();
      }, 1500);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent side="left">
        <SheetHeader>
          <SheetTitle>Update Product</SheetTitle>
          <SheetDescription className={"mb-4"}>
            Edit the information below to update the product.
          </SheetDescription>

          {product && (
            <form onSubmit={handleUpdate} className="flex flex-col gap-4">
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <div className="grid gap-3">
                    <Label>Product Name</Label>
                    <Input
                      name="product_name"
                      type="text"
                      onChange={handleChange}
                      value={productData.product_name}
                      required
                    />
                  </div>

                  <div className="grid gap-3">
                    <Label>Product Description</Label>
                    <Textarea
                      name="product_description"
                      onChange={handleChange}
                      value={productData.product_description}
                      required
                    />
                  </div>

                  <div className="grid gap-3">
                    <Label>Price</Label>
                    <Input
                      name="product_price"
                      type="number"
                      onChange={handleChange}
                      value={productData.product_price}
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
              <AlertTitle>Product updated successfully</AlertTitle>
            </Alert>
          )}
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};
