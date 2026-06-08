"use client";

import { useInventory } from "@/hooks/features/use-inventory";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Filter, Plus } from "lucide-react";
import CategoryGroup from "@/components/category-group";
import { Field, FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { Category, GearItem } from "@/types";

export default function InventoryPage() {
  const {
    items,
    categories,
    isLoading,
    error,
    createItem,
    deleteItem,
    isCreating,
  } = useInventory();

  const [open, setOpen] = useState<boolean>(false);
  const [name, setName] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");

  if (isLoading) {
    // TODO: Refactor loading widget
    return <p>Loading ...</p>;
  }

  if (error) {
    // TODO: Refactor error widget
    return (
      <div className="">
        <h2 className="text-white">Failed to load inventory</h2>
      </div>
    );
  }

  const handleAdd = async () => {
    if (!name.trim() || !selectedCategory) return;

    await createItem({
      name,
      category_id: selectedCategory,
      brand: "",
      weight_grams: 0,
      description: "",
      is_consumable: false,
      is_worn: false,
    });

    //reset form and close modal
    setOpen(false);
    setName("");
    setSelectedCategory("");
  };

  const handleEdit = () => {};

  const handleDelete = async () => {
    
  };

  return (
    <div className="min-h-screen px-6 py-4 pb-24">
      {/* TODO: Error/Warning bar at top */}
      {/* <div></div> */}
      {/* Inventory Header */}
      <header className="flex justify-between items-center mb-6">
        {/* TODO: Consider hiding page headers on desktop screens */}
        <h1 className="text-lg md:text-4xl text-white font-bold">Inventory</h1>

        {/* IMPORT/EXPORT BUTTONS & FILTER */}
        {/* TODO: Deferred to later version */}
        {/* <div className="flex justify-center items-center">
          <div className="px-4">
            <Button size="lg">Import</Button>
            <Button size="lg">Export</Button>
          </div>

          <Filter color="white" size={24} />
        </div> */}
      </header>

      {/* CATEGORY SECTIONS */}
      <section className="flex flex-col gap-4">
        {/* CATEGORY CARD */}
        {categories.map((category) => {
          const categoryItems = items.filter(
            (item) => item.category_id === category.id,
          );

          return (
            <CategoryGroup
              key={category.id}
              name={category.title}
              items={categoryItems}
            />
          );
        })}
      </section>

      {/* FOOTER SECTION (ADD BUTTON) */}
      <section className="fixed bottom-0 left-0 right-0 p-4 bg-emerald-900 border-t border-emerald-800">
        <Dialog open={open} onOpenChange={setOpen}>
          <form>
            <DialogTrigger asChild>
              <Button
                size="lg"
                className="w-full bg-emerald-600 hover:bg-emerald-700"
                onClick={handleAdd}
              >
                <Plus size={18} />
                Add Item
              </Button>
            </DialogTrigger>
            <DialogContent
            // onPointerDownOutside={(e) => e.preventDefault()}
            // onInteractOutside={(e) => e.preventDefault()}
            >
              <DialogHeader>
                <DialogTitle>Add Gear Item</DialogTitle>
                <DialogDescription>
                  Add a new gear item into your inventory
                </DialogDescription>
              </DialogHeader>
              <FieldGroup>
                <Field>
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    name="name"
                    defaultValue=""
                    placeholder=""
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
              </FieldGroup>
              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="outline">Cancel</Button>
                </DialogClose>
                <Button type="submit" onClick={handleAdd} disabled={isCreating || !name.trim() || !selectedCategory}>
                  {isCreating ? "Saving..." : "Save changes"}
                </Button>
              </DialogFooter>
            </DialogContent>
          </form>
        </Dialog>
      </section>
    </div>
  );
}
