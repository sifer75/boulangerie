import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { updateProduct } from "@/lib/product.request";
import { DaysState } from "@/lib/type";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

function UpdateProduct({
  product,
  onUpdate,
}: {
  product: DaysState;
  onUpdate: (arg0: DaysState) => void;
}) {
  const queryClient = useQueryClient();
  const [days, setDays] = useState<DaysState>({
    id: product.id,
    title: product.title ?? 0,
    mardi: product.mardi ?? 0,
    mercredi: product.mercredi ?? 0,
    jeudi: product.jeudi ?? 0,
    vendredi: product.vendredi ?? 0,
    samedi: product.samedi ?? 0,
    dimanche: product.dimanche ?? 0,
    paton: product.paton ?? 0,
  });
  const [isOpen, setIsOpen] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;

    if (id === "title") {
      setDays((prevDays) => ({
        ...prevDays,
        title: value.trim() === "" ? prevDays.title : value,
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
    mutationFn: () => updateProduct({ days }),
    onError: (error) => {
      console.log(error);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["product"] });
      queryClient.refetchQueries({ queryKey: ["product"] });
      setIsOpen(false);
      onUpdate(days);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate();
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button> Modifier la quantité</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Quantité</DialogTitle>
          <DialogDescription>
            Quantité du produit pour chaque jour de la semaine à réaliser
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            {Object.keys(days).map((day) => {
              if (day === "id") return null;
              return (
                <div className="grid grid-cols-4 items-center gap-4" key={day}>
                  <Label htmlFor={day} className="text-right">
                    {day}
                  </Label>
                  <Input
                    id={day}
                    value={days[day as keyof DaysState] ?? ""}
                    onChange={handleInputChange}
                    className="col-span-3"
                    placeholder={
                      day === "title"
                        ? product.title
                        : day.charAt(0).toUpperCase() + day.slice(1)
                    }
                  />
                </div>
              );
            })}
          </div>
          <DialogFooter>
            <Button type="submit">Modifier le produit</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default UpdateProduct;
