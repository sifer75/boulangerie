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
import { DaysState } from "@/lib/type";
import { useState } from "react";

function UpdateProduct({ title }: { title: string }) {
  const [days, setDays] = useState<DaysState>({
    title: "",
    mardi: null,
    mercredi: null,
    jeudi: null,
    vendredi: null,
    samedi: null,
    dimanche: null,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setDays((prevDays) => ({
      ...prevDays,
      [id as keyof DaysState]: value ? 0 : Number(value),
    }));
  };

  return (
    <Dialog>
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
        {Object.keys(days).map((day) => (
          <div key={day}>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor={day} className="text-right">
                {day}
              </Label>
              <Input
                id={day}
                value={days[day as keyof DaysState] as number}
                onChange={handleInputChange}
                className="col-span-3"
                placeholder={
                  day === "title"
                    ? title
                    : day.charAt(0).toUpperCase() + day.slice(1)
                }
              />
            </div>
          </div>
        ))}
        <DialogFooter>
          <Button type="submit">Sauvegarder</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default UpdateProduct;
