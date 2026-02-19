import { useSale } from "@/hooks/useSale";
import { useMemo, useState } from "react";
import { useReport } from "@/hooks/useReport";
import { useProducts } from "@/hooks/useProducts";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertTitle } from "@/components/ui/alert";
import { CheckCircle2, OctagonX, Trash2 } from "lucide-react";

export const CreateSalesForm = ({ token }) => {
  const { createNewSale, loading: saleLoading } = useSale();
  const { generateInvoice, loading: pdfLoading } = useReport();
  const { productByName, selectedProduct } = useProducts();
  const [successAlert, setSuccessAlert] = useState(false);
  const [errorAlert, setErrorAlert] = useState("");

  const [saleData, setSaleData] = useState({
    customer_name: "",
    productname: "",
    quantity: 1,
    items: [],
  });

  const handleSearchProduct = async (e) => {
    e.preventDefault();
    try {
      setErrorAlert("");
      await productByName(saleData.productname, token);
    } catch (error) {
      setErrorAlert(error?.message || "Error fetching product");
      console.error("Error fetching product: ", error);
    }
  };

  const handleAddItem = () => {
    if (!selectedProduct) return;

    const newItem = {
      id_product: selectedProduct.id_product,
      product_name: selectedProduct.product_name,
      price: selectedProduct.product_price,
      quantity: saleData.quantity,
    };

    setSaleData((prev) => ({
      ...prev,
      items: [...prev.items, newItem],
      productname: "",
      quantity: 1,
    }));
  };

  const deleteItem = (index) => {
    setSaleData((prev) => ({
      ...prev,
      items: prev.items.filter((_, i) => i !== index),
    }));
  };

  const handleCreateSale = async (e) => {
    e.preventDefault();
    try {
      const result = await createNewSale(saleData.customer_name, saleData.items, token);

      console.log("¿Qué es result?:", result);
      const idGenerado = result?.record_id?.id_sale

      if (idGenerado) {
        await generateInvoice(idGenerado, token);
      }
      setSaleData({
        customer_name: "",
        productname: "",
        quantity: 1,
        items: [],
      });
      setSuccessAlert(true);
      setTimeout(() => setSuccessAlert(false), 2000);
    } catch (error) {
      setErrorAlert(error?.message || "Error creating sale");
      setTimeout(() => setErrorAlert(""), 2000);
    }
  };

  const { subtotal, total } = useMemo(() => {
    const calculatedSubtotal = saleData.items.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0,
    );
    return {
      subtotal: calculatedSubtotal,
      total: calculatedSubtotal,
    };
  }, [saleData.items]);

  return (
    <form onSubmit={handleCreateSale} className="flex justify-between gap-6">
      <div className="flex flex-col gap-5 w-full">
        <div className="flex items-end justify-between gap-2">
          <div className="flex flex-col gap-2 w-full">
            <Label>Search Product</Label>
            <Input
              type="text"
              value={saleData.productname}
              onChange={(e) =>
                setSaleData((prev) => ({
                  ...prev,
                  productname: e.target.value,
                }))
              }
              placeholder="Ej: Teclado Mecánico"
            />
          </div>

          <Button
            type="button"
            onClick={handleSearchProduct}
            disabled={!saleData.productname.trim()}
          >
            Search
          </Button>
        </div>

        {selectedProduct && (
          <div className="flex flex-col gap-4 rounded-md border p-4">
            <div className="flex items-center justify-between">
              <div className="flex flex-col">
                <span className="font-medium text-lg">
                  {selectedProduct.product_name}
                </span>
                <span className="text-muted-foreground">
                  ${selectedProduct.product_price}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Input
                type="number"
                min="1"
                value={saleData.quantity}
                onChange={(e) =>
                  setSaleData((prev) => ({
                    ...prev,
                    quantity: Number(e.target.value),
                  }))
                }
              />
              <Button
                type="button"
                onClick={handleAddItem}
                disabled={saleData.quantity < 1}
              >
                Add
              </Button>
            </div>
          </div>
        )}
      </div>

      <div className="flex flex-col w-full gap-6 p-6 rounded-sm border-1 border-muted-foreground/30">
        <div className="flex flex-col gap-6 ">
          <h2 className="text-2xl font-semibold">Sale Summary</h2>
          <ul className="flex flex-col gap-1.5">
            <div className="flex justify-between text-xs font-semibold text-muted-foreground">
              <span>PRODUCT</span>
              <span>QUANTITY</span>
              <span>ACTIONS</span>
            </div>

            <hr className="my-2" />

            {saleData.items.map((item, i) => (
              <li key={i} className="flex justify-between">
                <div className="flex flex-col">
                  {item.product_name}
                  <span className="text-gray-400 font-normal">
                    {item.price}
                  </span>
                </div>
                <span>{item.quantity}</span>
                <button
                  onClick={() => deleteItem(i)}
                  className="text-red-500 hover:text-red-700"
                >
                  <Trash2 size={16} />
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <Label>Client</Label>
            <Input
              type="text"
              value={saleData.customer_name}
              onChange={(e) =>
                setSaleData((prev) => ({
                  ...prev,
                  customer_name: e.target.value,
                }))
              }
              required
            />
          </div>
        </div>

        <div className="space-y-2 border-t pt-4">
          <div className="flex justify-between text-muted-foreground">
            <p>Subtotal</p>
            <p>${subtotal.toFixed(2)}</p>
          </div>
          <div className="flex justify-between text-2xl font-bold">
            <p>Total</p>
            <p>${total.toFixed(2)}</p>
          </div>
        </div>

        <Button
          type="submit"
          disabled={
            saleLoading ||
            pdfLoading || // Bloquear si se está generando el PDF
            saleData.items.length === 0 ||
            !saleData.customer_name.trim()
          }
        >
          {saleLoading
            ? "Creating Sale..."
            : pdfLoading
              ? "Downloading Invoice..."
              : "Create Sale"}
        </Button>

        {errorAlert && (
          <Alert
            className={
              "bg-red-100 border-red-400 text-red-700 dark:bg-red-900 dark:border-red-600 dark:text-red-300"
            }
          >
            <OctagonX className="h-4 w-4" />
            <AlertTitle>{errorAlert}</AlertTitle>
          </Alert>
        )}

        {successAlert && (
          <Alert className="bg-green-100 border-green-400 text-green-700 dark:bg-green-900 dark:border-green-600 dark:text-green-300">
            <CheckCircle2 className="h-4 w-4" />
            <AlertTitle>Sale created successfully</AlertTitle>
          </Alert>
        )}
      </div>
    </form>
  );
};
