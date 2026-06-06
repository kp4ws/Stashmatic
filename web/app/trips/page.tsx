"use client";

import { Button } from "@/components/ui/Button";
import { Plus, MoreHorizontal } from "lucide-react";

export default function TripsPage() {
  return (
    <div className="min-h-screen px-6 py-4 pb-24">
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-lg md:text-4xl text-white font-bold">Trips</h1>
      </header>

      {/* TRIPS */}
      <section className="bg-white divide-y divide-gray-100">
        {/* TRIP */}
        <div className="px-4 py-3 flex justify-between items-center w-full">
          {/* LEFT SIDE */}
          <div className="flex flex-col gap-0.5">
            <p className="font-medium text-sm">Garibaldi Lake</p>
            <p className="text-gray-400 text-xs">Aug 2025 3 nights 14.3 lb</p>
          </div>

          {/* RIGHT SIDE */}
          <div className="flex items-center gap-3">
            <span className="text-xs px-2 py-1 rounded-full bg-emerald-100 text-emerald-700 font-medium">
              Ready
            </span>
            <button>
              <MoreHorizontal size={18} />
            </button>
          </div>
        </div>

        {/* TRIP */}
        <div className="px-4 py-3 flex justify-between items-center w-full">
          {/* LEFT SIDE */}
          <div className="flex flex-col gap-0.5">
            <p className="font-medium text-sm">Juan de Fuca trail</p>
            <p className="text-gray-400 text-xs">Sep 2025 · 4 nights · 9.1 lb</p>
          </div>

          {/* RIGHT SIDE */}
          <div className="flex items-center gap-3">
            <span className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-700 font-medium">
              Draft
            </span>
            <button>
              <MoreHorizontal size={18} />
            </button>
          </div>
        </div>

      </section>

      {/* FOOTER SECTION (ADD BUTTON) */}
      <section className="fixed bottom-0 left-0 right-0 p-4 bg-emerald-900 border-t border-emerald-800">
        <Button
          size="lg"
          className="w-full bg-emerald-600 hover:bg-emerald-700"
        >
          <Plus size={18} />
          New Trip
        </Button>
      </section>
    </div>
  );
}
