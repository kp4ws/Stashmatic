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
import { useState, useEffect } from "react";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  mode: DialogMode;
  editingItem: TripItem | null;
  gear_items: GearItem[];
  onSubmit: (gearItemIds: string | string[]) => void;
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
  const [selectedMultiple, setSelectedMultiple] = useState<Set<string>>(new Set());

  useEffect(() => {
    if (open && mode === "add") {
      setSelectedMultiple(new Set());
    }
    if (open && mode === "edit") {
      setSelectedGearItem(editingItem?.gear_item_id ?? "");
    }
  }, [open, mode, editingItem]);

  const handleSubmit = () => {
    if (mode === "edit") {
      if (!selectedGearItem) return;
      onSubmit(selectedGearItem);
    } else {
      if (selectedMultiple.size === 0) return;
      onSubmit(Array.from(selectedMultiple));
    }
  };

  const toggleSelection = (itemId: string) => {
    const newSelected = new Set(selectedMultiple);
    if (newSelected.has(itemId)) {
      newSelected.delete(itemId);
    } else {
      newSelected.add(itemId);
    }
    setSelectedMultiple(newSelected);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {mode === "edit" ? "Change Gear Item" : "Select Gear Items"}
          </DialogTitle>
          <DialogDescription>
            {mode === "edit"
              ? "Change your gear item"
              : "Select one or more gear items to add"}
          </DialogDescription>
        </DialogHeader>
        <FieldGroup>
          {mode === "edit" ? (
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
          ) : (
            <Field>
              <Label>Gear Items</Label>
              <div className="space-y-2 max-h-64 overflow-y-auto border border-slate-200 rounded-lg p-3">
                {gear_items.length === 0 ? (
                  <p className="text-slate-500 text-sm">No items available</p>
                ) : (
                  gear_items.map((item) => (
                    <label key={item.id} className="flex items-center gap-2 cursor-pointer hover:bg-slate-50 p-2 rounded">
                      <input
                        type="checkbox"
                        checked={selectedMultiple.has(item.id)}
                        onChange={() => toggleSelection(item.id)}
                        className="rounded"
                      />
                      <span className="text-sm text-slate-800">{item.name}</span>
                    </label>
                  ))
                )}
              </div>
            </Field>
          )}
        </FieldGroup>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button
            type="button"
            onClick={handleSubmit}
            disabled={isSubmitting || (mode === "edit" ? !selectedGearItem : selectedMultiple.size === 0)}
          >
            {isSubmitting ? "Saving..." : "Save changes"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
