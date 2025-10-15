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
  const { deleteProducts } = useProducts();
  const [showAlert, setShowAlert] = useState(false);

  const handleDelete = async () => {
    const result = await deleteProducts(id_product, token);
    if (result) {
      if (onRefresh) {
        onRefresh();
      }
      setShowAlert(true);
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
            This action cannot be undone. Your product will be permanently deleted.
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
