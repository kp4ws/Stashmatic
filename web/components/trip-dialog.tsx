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
import { DialogMode, Trip } from "@/types";
import { useState } from "react";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  mode: DialogMode;
  editingTrip: Trip | null;
  onSubmit: (name: string) => void;
  isSubmitting: boolean;
};

export default function TripDialog({
  open,
  onOpenChange,
  mode,
  editingTrip,
  onSubmit,
  isSubmitting,
}: Props) {
  const [name, setName] = useState<string>(editingTrip?.name ?? "");

  const handleSubmit = () => {
    if (!name.trim()) return;
    onSubmit(name);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {mode === "edit" ? "Edit Trip" : "Create Trip"}
          </DialogTitle>
          <DialogDescription>
            {mode === "edit" ? "Update your trip" : "Create new trip"}
          </DialogDescription>
        </DialogHeader>
        <FieldGroup>
          <Field>
            <Label htmlFor="name">Trip Name</Label>
            <Input
              id="name"
              name="name"
              placeholder="Enter name"
              value={name}
              onChange={(e) => setName(e.target.value)}
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
            disabled={isSubmitting || !name.trim()}
          >
            {isSubmitting ? "Saving..." : "Save changes"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
