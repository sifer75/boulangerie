import { Label } from "@/components/ui/label";
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
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { DaysState } from "@/lib/type";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createProduct } from "@/lib/product.request";

function CreateProduct() {
  const queryClient = useQueryClient();
  const [days, setDays] = useState<DaysState>({
    title: "",
    mardi: 0,
    mercredi: 0,
    jeudi: 0,
    vendredi: 0,
    samedi: 0,
    dimanche: 0,
    paton: 0,
  });
  const [isOpen, setIsOpen] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    if (id === "title") {
      setDays((prevDays) => ({
        ...prevDays,
        title: value,
      }));
    } else {
      const newValue = value === "" ? 0 : Number(value);

      setDays((prevDays) => ({
        ...prevDays,
        [id as keyof DaysState]: isNaN(newValue) ? 0 : newValue,
      }));
    }
  };

  const mutation = useMutation({
    mutationFn: createProduct,
    onError: (error) => {
      console.log(error);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["product"] });
      setIsOpen(false);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate(days);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="w-fit">Créer un produit</Button>
      </DialogTrigger>
      <DialogContent className="max-w-xs w-full h-fit">
        <DialogHeader>
          <DialogTitle>Produit</DialogTitle>
          <DialogDescription>Création d'un produit </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            {Object.keys(days).map((day) => (
              <div className="grid grid-cols-4 items-center gap-4" key={day}>
                <Label htmlFor={day} className="text-right">
                  {day}
                </Label>
                <Input
                  id={day}
                  value={days[day as keyof DaysState] as number}
                  onChange={handleInputChange}
                  className="col-span-3"
                  placeholder={day}
                />
              </div>
            ))}
          </div>
          <DialogFooter>
            <Button type="submit">Créer le produit</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default CreateProduct;
