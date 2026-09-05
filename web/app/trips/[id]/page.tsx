"use client";

import { use } from "react";
import { useTripDetail } from "@/hooks/features/use-trip-detail";
import { useInventory } from "@/hooks/features/use-inventory";
import TripItemGroup from "@/components/trip-item-group";
import { Button } from "@/components/ui/button";
import { Loader2, AlertCircle, ArrowLeft, Plus, Weight } from "lucide-react";
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

  const handleSubmit = async (gearItemIds: string | string[]) => {
    const ids = Array.isArray(gearItemIds) ? gearItemIds : [gearItemIds];

    if (mode === "edit" && editingItem && !Array.isArray(gearItemIds)) {
      const selectedGearItem =
        gearItems.find((g) => g.id === gearItemIds) ?? null;

      await updateItem({
        id: editingItem.id,
        data: {
          gear_item_id: gearItemIds,
          recorded_name: selectedGearItem?.name ?? editingItem.recorded_name,
          recorded_weight: selectedGearItem?.weight_grams ?? editingItem.recorded_weight,
        },
      });
    } else {
      // Create multiple items
      for (const gearItemId of ids) {
        const selectedGearItem =
          gearItems.find((g) => g.id === gearItemId) ?? null;

        await createItem({
          trip_id: id,
          gear_item_id: gearItemId,
          quantity: 1,
          is_packed: false,
          recorded_name: selectedGearItem?.name ?? "",
          recorded_weight: selectedGearItem?.weight_grams ?? 0,
        });
      }
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

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center text-emerald-100 gap-2">
          <Loader2 className="h-8 w-8 animate-spin text-emerald-400" />
          <p className="font-medium text-emerald-50">Loading trip builder...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6">
        <div className="bg-red-950/50 border border-red-900/50 rounded-xl p-6 max-w-md w-full flex flex-col items-center text-center gap-3 shadow-lg">
          <AlertCircle className="h-10 w-10 text-red-500" />
          <h2 className="text-red-50 font-bold text-lg">Failed to load trip</h2>
          <p className="text-red-200/70 text-sm">Please check your connection or try again later.</p>
        </div>
      </div>
    );
  }

  const totalWeight = tripItems.reduce((sum, item) => sum + (item.recorded_weight || 0), 0);

  return (
    <div className="min-h-screen bg-emerald-900 px-4 py-4 pb-28 md:px-6 md:flex md:justify-center">
      <div className="w-full md:max-w-xl">
        <header className="mb-5 border-b border-emerald-800 pb-3">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <Link href="/trips">
                <Button
                  variant="outline"
                  size="icon"
                  className="h-9 w-9 rounded-full border-emerald-700 bg-emerald-900 text-emerald-50 hover:bg-emerald-800"
                >
                  <ArrowLeft size={16} />
                </Button>
              </Link>
              <div>
                <h1 className="text-xl md:text-2xl font-semibold tracking-tight text-white">{trip?.name}</h1>
              </div>
            </div>
            <div className="inline-flex items-center gap-1.5 rounded-full bg-emerald-800 px-2.5 py-1 text-xs font-medium text-emerald-50 sm:gap-2 sm:px-3">
              <Weight size={12} className="text-emerald-200" />
              {totalWeight > 0 ? `${totalWeight.toLocaleString()} g` : "No weight"}
            </div>
          </div>
        </header>

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

        {/* <div className="fixed bottom-0 left-0 right-0 bg-emerald-900 p-4 shadow-[0_-8px_20px_rgba(6,78,59,0.28)] ring-1 ring-emerald-800/80">
        <Button
          size="lg"
          className="w-full bg-emerald-600 text-white hover:bg-emerald-500"
          onClick={() => {
            const firstCategory = categories[0];
            if (firstCategory) handleOpenAdd(firstCategory.id);
          }}
        >
          <Plus size={18} className="mr-2" />
          Add Item
        </Button>
      </div> */}
      </div>
    </div>
  );
}
