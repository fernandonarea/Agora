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
import { toast } from "sonner";
import { Trash2 } from "lucide-react";

export const DeleteProduct = ({ id_product, token, onRefresh, showError }) => {
  const { deleteProducts } = useProducts();
  const [showAlert, setShowAlert] = useState(false);

  const handleDelete = async () => {
    try {
      const response = await deleteProducts(id_product, token);
      if (response) {
        onRefresh();
        toast.success("Producto eliminado")
        setShowAlert(false);
      }
    } catch (err) {
      console.error("Error al eliminar:", err.message);
      showError(err.message || "Error al eliminar el producto");
      toast.error(err.message || "Ocurrió un error eliminando el producto",);
      setShowAlert(false);
    }
  };

  const handleOpenChange = (open) => {
    if (open) {
      showError(null);
    }
    setShowAlert(open);
  };

  return (
    <AlertDialog open={showAlert} onOpenChange={handleOpenChange}>
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
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. Your product will be permanently
            deleted.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete}>Delete</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
