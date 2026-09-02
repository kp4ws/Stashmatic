import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Field, FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Category, DialogMode, GearItem } from "@/types";
import { useEffect, useState } from "react";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  mode: DialogMode;
  editingItem: GearItem | null;
  categories: Category[];
  onSubmit: (name: string, categoryId: string, weightGrams: number) => void;
  isSubmitting: boolean;
};

export default function GearItemDialog({
  open,
  onOpenChange,
  mode,
  editingItem,
  categories,
  onSubmit,
  isSubmitting,
}: Props) {
  const [name, setName] = useState<string>(editingItem?.name ?? "");
  const [selectedCategory, setSelectedCategory] = useState<string>(
    editingItem?.category_id ?? "",
  );
  const [weightGrams, setWeightGrams] = useState<number>(
    editingItem?.weight_grams ?? 0,
  );

  useEffect(() => {
    setName(editingItem?.name ?? "");
    setSelectedCategory(editingItem?.category_id ?? "");
    setWeightGrams(editingItem?.weight_grams ?? 0);
  }, [editingItem, open]);

  const handleSubmit = () => {
    if (!name.trim() || !selectedCategory) return;
    const parsedWeight = Math.max(0, Number(weightGrams) || 0);
    onSubmit(name, selectedCategory, parsedWeight);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {mode === "edit" ? "Edit Gear Item" : "Add Gear Item"}
          </DialogTitle>
          <DialogDescription>
            {mode === "edit"
              ? "Update your gear item"
              : "Add a new gear item into your inventory"}
          </DialogDescription>
        </DialogHeader>
        <FieldGroup>
          <Field>
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              name="name"
              placeholder="Enter name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Field>
          <Field>
            <Label htmlFor="category">Category</Label>
            <Select
              value={selectedCategory}
              onValueChange={setSelectedCategory}
            >
              <SelectTrigger id="category">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {categories.map((category) => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.title}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </Field>
          <Field>
            <Label htmlFor="weight">Weight (g)</Label>
            <Input
              id="weight"
              name="weight"
              type="number"
              min="0"
              step="1"
              placeholder="0"
              value={weightGrams}
              onChange={(e) =>
                setWeightGrams(Math.max(0, Number(e.target.value) || 0))
              }
            />
          </Field>
        </FieldGroup>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button
            type="button"
            onClick={handleSubmit}
            disabled={isSubmitting || !name.trim() || !selectedCategory}
          >
            {isSubmitting ? "Saving..." : "Save changes"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
