"use client";

import TripDialog from "@/components/trip-dialog";
import TripRow from "@/components/trip-row";
import { Button } from "@/components/ui/button";
import { useTrips } from "@/hooks/features/use-trips";
import { DialogMode, Trip } from "@/types";
import { Plus } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function TripsPage() {
  const router = useRouter();

  const {
    trips,
    isLoading,
    error,
    createTrip,
    deleteTrip,
    updateTrip,
    isCreating,
  } = useTrips();

  const [open, setOpen] = useState<boolean>(false);
  const [mode, setMode] = useState<DialogMode>("add");
  const [editingTrip, setEditingTrip] = useState<Trip | null>(null);

  const handleSubmit = async (name: string) => {
    if (mode === "edit" && editingTrip) {
      await updateTrip({
        id: editingTrip.id,
        data: {
          name,
        },
      });
    } else {
      await createTrip({
        name,
      });
    }

    setOpen(false);
    setEditingTrip(null);
  };

  const handleOpenAdd = () => {
    setMode("add");
    setEditingTrip(null);
    setOpen(true);
  };

  const handleOpenEdit = (trip: Trip) => {
    setMode("edit");
    setEditingTrip(trip);
    setOpen(true);
  };

  const handleDelete = async (trip: Trip) => {
    await deleteTrip(trip.id);
  };

  //Callback to enter trip builder when one of the rows is clicked on
  const handleTripOpen = (trip: Trip) => {
    router.push(`/trips/${trip.id}`);
  }

  if (isLoading) {
    // TODO: Refactor loading widget
    return <p>Loading ...</p>;
  }

  if (error) {
    // TODO: Refactor error widget
    return (
      <div className="">
        <h2 className="text-white">Failed to load trips</h2>
      </div>
    );
  }

  return (
    <div className="min-h-screen px-6 py-4 pb-24">
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-lg md:text-4xl text-white font-bold">Trips</h1>
      </header>

      {/* TRIPS */}
      <section className="bg-white divide-y divide-gray-100">
        {trips.length === 0 ? (
          <div>No Trips Found</div>
        ) : (
          trips.map((trip) => (
            <TripRow
              key={trip.id}
              trip={trip}
              onEdit={handleOpenEdit}
              onDelete={handleDelete}
              onOpen={handleTripOpen}
            />
          ))
        )}
      </section>

      {/* FOOTER SECTION (ADD BUTTON) */}
      <section className="fixed bottom-0 left-0 right-0 p-4 bg-emerald-900 border-t border-emerald-800">
        <Button
          size="lg"
          className="w-full bg-emerald-600 hover:bg-emerald-700"
          onClick={handleOpenAdd}
        >
          <Plus size={18} />
          Create Trip
        </Button>
        <TripDialog
          key={editingTrip?.id ?? "add"}
          open={open}
          onOpenChange={setOpen}
          mode={mode}
          editingTrip={editingTrip}
          onSubmit={handleSubmit}
          isSubmitting={isCreating}
        />
      </section>
    </div>
  );
}
