"use client";

import { use } from "react";
import { useTripDetail } from "@/hooks/features/use-trip-detail";
import { useInventory } from "@/hooks/features/use-inventory";
import TripItemGroup from "@/components/trip-item-group";

export default function TripBuilder({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const { trip, tripItems, categories, isLoading, error } = useTripDetail(id);

  // TODO: Refactor this out later
  const { items: gearItems } = useInventory();

  if (isLoading) return <p className="text-white">Loading ...</p>;
  if (error) return <p className="text-white">Failed to load trip</p>;

  return (
    <div className="min-h-screen px-6 py-4 pb-24">
      <header className="text-white">{trip?.name}</header>

      {/* CATEGORY SECTIONS */}
      <section>
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
              items={categoryItems}
              onEdit={() => {}}
              onDelete={() => {}}
            />
          );
        })}
      </section>

      
    </div>
  );
}
