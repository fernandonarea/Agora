import { useSale } from "@/hooks/useSale";
import { useMemo, useState } from "react";
import { useProducts } from "@/hooks/useProducts";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertTitle } from "@/components/ui/alert";
import { CheckCircle2 } from "lucide-react";

export const CreateSalesForm = ({ token }) => {
  //CUSTOM HOOKS
  const { createNewSale, loading, error } = useSale();
  const { productByName, selectedProduct } = useProducts();

  //HOOKS
  const [customer_name, setCustomerName] = useState("");
  const [productname, setProductName] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [items, setItems] = useState([]);
  const [alert, setAlert] = useState(false);

  //Manejadores de Eventos
  const handleSearchProduct = async (e) => {
    e.preventDefault();
    try {
      await productByName(productname, token);
    } catch (error) {
      setAlert(error);
      console.error("Error buscando producto:", error);
    }
  };

  const handleAddItem = () => {
    if (!selectedProduct) return;

    const newItem = {
      id_product : selectedProduct.id_product,
      product_name: selectedProduct.product_name,
      price: selectedProduct.product_price,
      quantity: quantity,
    };

    setItems([...items, newItem]);
    setProductName("");
    setQuantity(1);
  };

  const handleCreateSale = async (e) => {
    e.preventDefault();
    try {
      await createNewSale(customer_name, items, token);
      setCustomerName("");
      setAlert(true);
      setCustomerName("")
      setItems([])
      setQuantity(0)
      setTimeout(() => setAlert(false), 2000);
    } catch (error) {
      console.error("Error creando la venta:", error);
    }
  };

  //Logica de negocio
  const { subtotal, total } = useMemo(() => {
    const calculatedSubtotal = items.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
    return {
      subtotal: calculatedSubtotal,
      total: calculatedSubtotal,
    };
  }, [items]); 

  return (
    <form onSubmit={handleCreateSale} className="flex justify-between gap-6">
      <div className="flex flex-col gap-5 w-full">
        <div className="flex items-end justify-between gap-2">
          <div className="flex flex-col gap-2 w-full">
            <Label>Buscar producto</Label>
            <Input
              type="text"
              value={productname}
              onChange={(e) => setProductName(e.target.value)}
              placeholder="Ej: Teclado Mecánico"
            />
          </div>

          <Button type="button" onClick={handleSearchProduct}>
            Buscar
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
                  {selectedProduct.product_price}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Input
                type="number"
                min="1"
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
              />
              <Button
                type="button"
                onClick={handleAddItem}
                disabled={quantity < 1}
              >
                Añadir
              </Button>
            </div>
          </div>
        )}
      </div>

      <div className="flex flex-col w-full gap-6 p-6 rounded-md border-1 border-gray-200 dark:border-gray-500">
        <div className="flex flex-col gap-6 ">
          <h2 className="text-2xl font-semibold">Resumen de Venta</h2>
          <ul className="flex flex-col gap-1.5">
            <div className="flex justify-between text-xs font-semibold text-muted-foreground">
              <span>PRODUCTO</span>
              <span>CANT.</span>
            </div>

            <hr className="my-2" />

            {items.map((item, i) => (
              <li key={i} className="flex justify-between">
                <div className="flex flex-col">
                  {item.product_name}
                  <span className="text-gray-400 font-normal">
                    {item.price}
                  </span>
                </div>
                <span>{item.quantity}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <Label>Cliente</Label>
            <Input
              type="text"
              value={customer_name}
              onChange={(e) => setCustomerName(e.target.value)}
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

        <Button type="submit" disabled={loading}>
          {loading ? "Creando..." : "Crear venta"}
        </Button>

        {alert && (
          <Alert>
            <CheckCircle2 className="h-4 w-4" />
            <AlertTitle>Venta creada correctamente</AlertTitle>
          </Alert>
        )}

        {error && (
          <Alert variant="destructive">
            <AlertTitle>{error}</AlertTitle>
          </Alert>
        )}
      </div>
    </form>
  );
};
