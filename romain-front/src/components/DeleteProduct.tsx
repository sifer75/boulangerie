import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteProduct } from "@/lib/product.request";
function DeleteProduct({
  title,
  productId,
  onClose,
}: {
  title: string;
  productId: number;
  onClose: () => void;
}) {
  const queryClient = useQueryClient();
  const [isOpen, setIsOpen] = useState(false);

  const mutation = useMutation({
    mutationFn: () => deleteProduct({ id: productId }),
    onError: (error) => {
      console.log(error);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["product"] });
      setIsOpen(false);
      onClose();
    },
  });

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="destructive" className="w-fit">
          Supprimer le produit
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-xs w-full h-fit">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>
            Etes vous sur de vouloir supprimer le produit?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button onClick={() => mutation.mutate()} variant="destructive">
            Supprimer le produit
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default DeleteProduct;
