"use client";

import { useInventory } from "@/hooks/features/use-inventory";
import { Filter, Plus, Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";
import CategoryGroup from "@/components/category-group";
import { useState } from "react";
import { Category, DialogMode, GearItem } from "@/types";
import GearItemDialog from "@/components/gear-item-dialog";

export default function InventoryPage() {
  const {
    items,
    categories,
    isLoading,
    error,
    createItem,
    deleteItem,
    updateItem,
    isSubmitting,
    isDeleting,
  } = useInventory();

  const [open, setOpen] = useState<boolean>(false);
  const [mode, setMode] = useState<DialogMode>("add");
  const [editingItem, setEditingItem] = useState<GearItem | null>(null);

  //Handles submit for both add and edit
  const handleSubmit = async (name: string, categoryId: string) => {
    if (mode === "edit" && editingItem) {
      await updateItem({
        id: editingItem.id,
        data: {
          name,
          category_id: categoryId,
        },
      });
    } else {
      await createItem({
        name,
        category_id: categoryId,
        brand: "",
        weight_grams: 0,
        description: "",
        is_consumable: false,
        is_worn: false,
      });
    }

    //reset form and close modal
    setOpen(false);
    setEditingItem(null);
  };

  //Opens dialog window for add mode
  const handleOpenAdd = () => {
    setMode("add");
    setEditingItem(null);
    setOpen(true);
  };

  //Opens dialog window for edit mode
  const handleOpenEdit = (item: GearItem) => {
    setMode("edit");
    setEditingItem(item);
    setOpen(true);
  };

  const handleDelete = async (item: GearItem) => {
    await deleteItem(item.id);
  };

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
              onEdit={handleOpenEdit}
              onDelete={handleDelete}
            />
          );
        })}
      </section>

      {/* FOOTER SECTION (ADD BUTTON) */}
      <section className="fixed bottom-0 left-0 right-0 p-4 bg-emerald-900 border-t border-emerald-800">
        <Button
          size="lg"
          className="w-full bg-emerald-600 hover:bg-emerald-700"
          onClick={handleOpenAdd}
        >
          <Plus size={18} />
          Add Item
        </Button>
        <GearItemDialog
          key={editingItem?.id ?? "add"}
          open={open}
          onOpenChange={setOpen}
          mode={mode}
          editingItem={editingItem}
          categories={categories}
          onSubmit={handleSubmit}
          isSubmitting={isSubmitting}
        />
      </section>
    </div>
  );
}
