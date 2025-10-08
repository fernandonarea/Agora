import useSupplier from "@/hooks/useSupplier";
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

export const DeleteSupplier = ({ id_supplier, token, onRefresh }) => {
  const { DeleteSupplier, error } = useSupplier();
  const [showAlert, setShowAlert] = useState(false);

  const handleDelete = async () => {
    const result = await DeleteSupplier(id_supplier, token);
    if (result) {
      if (onRefresh) {
        onRefresh();
      }
      console.log("Proveedor eliminado con éxito");
    } else {
      console.log("Error al eliminar el proveedor:", error);
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
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. Your supplier will be permanently deleted.
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
