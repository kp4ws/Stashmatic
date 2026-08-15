"use client";

import TripDialog from "@/components/trip-dialog";
import TripRow from "@/components/trip-row";
import { Button } from "@/components/ui/button";
import { useTrips } from "@/hooks/features/use-trips";
import { DialogMode, Trip } from "@/types";
import { Plus, Loader2, AlertCircle } from "lucide-react";
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
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center text-emerald-100 gap-2">
          <Loader2 className="h-8 w-8 animate-spin text-emerald-400" />
          <p className="font-medium text-emerald-50">Loading trips...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6">
        <div className="bg-red-950/50 border border-red-900/50 rounded-xl p-6 max-w-md w-full flex flex-col items-center text-center gap-3 shadow-lg">
          <AlertCircle className="h-10 w-10 text-red-500" />
          <h2 className="text-red-50 font-bold text-lg">Failed to load trips</h2>
          <p className="text-red-200/70 text-sm">Please check your connection or try again later.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen px-6 py-4 pb-24">
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-lg md:text-4xl text-white font-bold">Trips</h1>
      </header>

      {/* TRIPS */}
      <section className="bg-white divide-y divide-slate-100 rounded-xl shadow-md overflow-hidden border border-emerald-900/10 mb-6">
        {trips.length === 0 ? (
          <div className="px-5 py-8 text-center text-slate-400 italic">No Trips Found</div>
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
