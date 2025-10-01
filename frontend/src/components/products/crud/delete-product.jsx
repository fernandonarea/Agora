import { useProducts } from "@/hooks/useProducts";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Trash2 } from "lucide-react";

export const DeleteProduct = ({ id_product, token, onRefresh }) => {
  const { deleteProducts, error } = useProducts();
  const [showAlert, setShowAlert] = useState(false);

  const handleDelete = async () => {
    const result = await deleteProducts(id_product, token);
    if (result) {
      if (onRefresh) {
        onRefresh();
      }
      console.log("Producto eliminado con éxito");
    } else {
      console.log("Error al eliminar el producto:", error);
    }
  };

  return (
    <AlertDialog open={showAlert} onOpenChange={setShowAlert}>
      <AlertDialogTrigger asChild>
        <Button
          variant="outline"
          className={"hover:bg-red-500 hover:text-white dark:hover:bg-red-700"}
        >
          <Trash2 />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Esta completamente seguro?</AlertDialogTitle>
          <AlertDialogDescription>
            Esta acción no se puede deshacer. Su producto será eliminado
            permanentemente.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete}>Eliminar</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
