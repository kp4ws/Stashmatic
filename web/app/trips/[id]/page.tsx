"use client";

import { use } from "react";
import { useTripDetail } from "@/hooks/features/use-trip-detail";
import { useInventory } from "@/hooks/features/use-inventory";
import TripItemGroup from "@/components/trip-item-group";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useState } from "react";
import { DialogMode, TripItem } from "@/types";
import TripItemDialog from "@/components/trip-item-dialog";

export default function TripBuilder({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const {
    trip,
    tripItems,
    categories,
    error,
    createItem,
    updateItem,
    deleteItem,
    isLoading,
    isSubmitting,
  } = useTripDetail(id);

  // TODO: Refactor this out later
  const { items: gearItems } = useInventory();

  const [open, setOpen] = useState<boolean>(false);
  const [mode, setMode] = useState<DialogMode>("add");
  const [editingItem, setEditingItem] = useState<TripItem | null>(null);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);

  const handleSubmit = async (gearItemId: string) => {
    if (mode === "edit" && editingItem) {
      await updateItem({
        id: editingItem.id,
        data: { gear_item_id: gearItemId },
      });
    } else {
      await createItem({
        trip_id: id,
        gear_item_id: gearItemId,
        quantity: 1,
        is_packed: false,
        recorded_name: gearItems.find((g) => g.id == gearItemId)?.name ?? "",
        recorded_weight:
          gearItems.find((g) => g.id == gearItemId)?.weight_grams ?? 0,
      });
    }

    setOpen(false);
    setEditingItem(null);
    setSelectedCategoryId(null);
  };

  const handleDeleteTripItem = async (trip: TripItem) => {
    await deleteItem(trip.id);
  };

  const handleOpenAdd = (categoryId: string) => {
    setMode("add");
    setEditingItem(null);
    setSelectedCategoryId(categoryId);
    setOpen(true);
  };

  const handleOpenEdit = (item: TripItem) => {
    setMode("edit");
    setEditingItem(item);
    const gearItem = gearItems.find((g) => g.id === item.gear_item_id);
    setSelectedCategoryId(gearItem?.category_id ?? null);
    setOpen(true);
  };

  const filteredGearItems = selectedCategoryId ? gearItems.filter((g) => g.category_id === selectedCategoryId) : gearItems;

  if (isLoading) return <p className="text-white">Loading ...</p>;
  if (error) return <p className="text-white">Failed to load trip</p>;

  return (
    <div className="min-h-screen px-6 py-4 pb-24">
      <header className="text-white py-4">
        <div className="flex justify-left items-center gap-4">
          <div className="font-bold text-lg">{trip?.name}</div>
          <Link href="/trips">
            <Button>Back to Trips</Button>
          </Link>
        </div>
      </header>

      {/* CATEGORY SECTIONS */}
      <section className="flex flex-col gap-4">
        {categories.map((category) => {
          const categoryItems = tripItems.filter((tripItem) => {
            const gearItem = gearItems.find(
              (g) => g.id === tripItem.gear_item_id,
            );
            return gearItem?.category_id === category.id;
          });

          return (
            <TripItemGroup
              key={category.id}
              name={category.title}
              categoryId={category.id}
              items={categoryItems}
              onAdd={handleOpenAdd}
              onEdit={handleOpenEdit}
              onDelete={handleDeleteTripItem}
            />
          );
        })}

        <TripItemDialog
          key={editingItem?.id ?? "add"}
          open={open}
          onOpenChange={setOpen}
          mode={mode}
          editingItem={editingItem}
          gear_items={filteredGearItems}
          onSubmit={handleSubmit}
          isSubmitting={isSubmitting}
        />
      </section>
    </div>
  );
}
