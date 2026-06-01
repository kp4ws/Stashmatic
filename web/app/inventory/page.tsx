"use client";

import { useInventory } from "@/hooks/features/use-inventory";
import { Button } from "@/components/ui/Button";
import { Filter, MoreHorizontal } from "lucide-react";
import { logger } from "@/lib/logger";

export default function InventoryPage() {
  // const { items, categories, isLoading, error, deleteItem } = useInventory();

  // if (isLoading) {
  //   // TODO: Refactor loading widget
  //   return <p>Loading ...</p>;
  // }

  // if (error) {
  //   // TODO: Refactor error widget
  //   return (
  //     <div className="">
  //       <h2 className="text-white">Failed to load inventory</h2>
  //     </div>
  //   );
  // }

  return (
    <div className="min-h-screen px-6 py-4">
      {/* TODO: Error/Warning bar at top */}
      {/* <div></div> */}
      {/* Inventory Header */}
      <header className="flex justify-between items-center mb-6">
        {/* TODO: Consider hiding page headers on desktop screens */}
        <h1 className="text-lg md:text-4xl text-white font-bold">Inventory</h1>

        {/* IMPORT/EXPORT BUTTONS & FILTER */}
        <div className="flex justify-center items-center">
          <div className="px-4">
            <Button size="lg">Import</Button>
            <Button size="lg">Export</Button>
          </div>

          <Filter color="white" size={24} />
        </div>
      </header>

      {/* CATEGORY SECTIONS */}
      <section className="flex flex-col gap-4">
        {/* CATEGORY CARD */}
        <div>
          {/* CATEGORY HEADER */}
          <div className="bg-emerald-600 px-4 py-3 flex justify-between items-center w-full">
            <h3 className="text-white font-bold uppercase text-sm tracking-wider">
              Pack
            </h3>
            <div className="text-gray-50 text-sm">2 items</div>
          </div>

          {/* CATEGORY ITEM LIST */}
          <ul className="bg-white divide-y divide-gray-100">
            {/* ITEM */}
            <li className="px-4 py-3 flex justify-between items-center w-full">
              {/* ITEM DESCRIPTION */}
              <div className="flex flex-col gap-0.5">
                <p className="font-medium text-sm">Atmos AG 65</p>
                <p className="text-gray-400 text-xs">
                  Osprey - Fits torso 18-20"
                </p>
              </div>
              {/* ITEM RIGHT SIDE */}
              <div className="flex items-center gap-3">
                <span className="text-gray-500 text-sm">4.6 lb</span>
                <button className="text-gray-400 p-1"><MoreHorizontal size={18}/></button>
              </div>
            </li>
          </ul>
        </div>

      </section>

      {/* FOOTER SECTION (ADD BUTTON) */}
      <section className="fixed bottom-0 left-0 right-0 ">
        <Button size="lg" className="w-full">Add</Button>
      </section>
    </div>
  );
}
