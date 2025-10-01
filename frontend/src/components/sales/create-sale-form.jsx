import { useSale } from "@/hooks/useSale";
import { useState } from "react";
import { useProducts } from "@/hooks/useProducts";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertTitle } from "@/components/ui/alert";
import { CheckCircle2 } from "lucide-react";

export const CreateSalesForm = ({ token }) => {
  const { createNewSale, saleId, loading, error } = useSale();
  const { productByName, selectedProduct } = useProducts();

  const [customerName, setCustomerName] = useState("");
  const [product_name, setProductName] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [items, setItems] = useState([]);
  const [alert, setAlert] = useState(false);

  const handleSearchProduct = async (e) => {
    e.preventDefault();
    try {
      await productByName(token, product_name);
    } catch (error) {
      console.error("Error buscando producto:", error);
    }
  };

  const handleAddItem = () => {
    if (!selectedProduct) return;

    const newItem = {
      product_id: selectedProduct.id_product, // asegúrate que la API devuelve este campo
      quantity: quantity,
    };

    setItems([...items, newItem]);
    setProductName("");
    setQuantity(1);
  };

  const handleCreateSale = async (e) => {
    e.preventDefault();
    try {
      await createNewSale(customerName, items, token);
      setCustomerName("");
      setItems([]);
      setAlert(true);
      setTimeout(() => setAlert(false), 2000);
    } catch (error) {
      console.error("Error creando la venta:", error);
    }
  };

  return (
    <form onSubmit={handleCreateSale} className="space-y-4">
      <div>
        <Label>Cliente</Label>
        <Input
          type="text"
          value={customerName}
          onChange={(e) => setCustomerName(e.target.value)}
        />
      </div>

      <div>
        <Label>Buscar producto</Label>
        <Input
          type="text"
          value={product_name}
          onChange={(e) => setProductName(e.target.value)}
        />
        <Button type="button" onClick={handleSearchProduct}>
          Buscar
        </Button>
      </div>

      {selectedProduct && (
        <div className="flex gap-2 items-center">
          <span>{selectedProduct.product_name}</span>
          <Input
            type="number"
            min="1"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
          />
          <Button type="button" onClick={handleAddItem}>
            Añadir
          </Button>
        </div>
      )}

      <div>
        <h3>Items en la venta</h3>
        <ul>
          {items.map((item, i) => (
            <li key={i}>
              Producto ID: {item.product_id} - Cantidad: {item.quantity}
            </li>
          ))}
        </ul>
      </div>

      <Button type="submit" disabled={loading}>
        {loading ? "Creando..." : "Crear venta"}
      </Button>

      {alert && (
        <Alert>
          <CheckCircle2 className="h-4 w-4" />
          <AlertTitle>Venta creada correctamente (ID: {saleId})</AlertTitle>
        </Alert>
      )}

      {error && (
        <Alert variant="destructive">
          <AlertTitle>{error}</AlertTitle>
        </Alert>
      )}
    </form>
  );
};
