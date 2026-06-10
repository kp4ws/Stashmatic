"use client";

import { use } from "react";
import { useTripDetail } from "@/hooks/features/use-trip-detail";

export default function TripBuilder({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const { trip, isLoading, error } = useTripDetail(id);

  return (
    <div className="min-h-screen px-6 py-4 pb-24">
      <header className="text-white">{trip?.name} Details</header>

      {/* CATEGORY SECTIONS */}
      <section></section>
    </div>
  );
}
