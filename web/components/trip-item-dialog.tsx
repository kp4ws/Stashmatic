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
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DialogMode, TripItem, GearItem } from "@/types";
import { useState } from "react";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  mode: DialogMode;
  editingItem: TripItem | null;
  gear_items: GearItem[];
  onSubmit: (tripItemId: string) => void;
  isSubmitting: boolean;
};

export default function TripItemDialog({
  open,
  onOpenChange,
  mode,
  editingItem,
  gear_items,
  onSubmit,
  isSubmitting,
}: Props) {
  const [selectedGearItem, setSelectedGearItem] = useState<string>(
    editingItem?.gear_item_id ?? "",
  );

  const handleSubmit = () => {
    if (!selectedGearItem) return;
    onSubmit(selectedGearItem);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {mode === "edit" ? "Change Gear Item" : "Select Gear Item"}
          </DialogTitle>
          <DialogDescription>
            {mode === "edit"
              ? "Change your gear item"
              : "Select a gear item from your inventory"}
          </DialogDescription>
        </DialogHeader>
        <FieldGroup>
          <Field>
            <Label htmlFor="gear_item">Gear Item</Label>
            <Select
              value={selectedGearItem}
              onValueChange={setSelectedGearItem}
            >
              <SelectTrigger id="gear_item">
                <SelectValue placeholder="Select a gear item" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {gear_items.map((item) => (
                    <SelectItem key={item.id} value={item.id}>
                      {item.name}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </Field>
        </FieldGroup>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button
            type="button"
            onClick={handleSubmit}
            disabled={isSubmitting || !selectedGearItem}
          >
            {isSubmitting ? "Saving..." : "Save changes"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
