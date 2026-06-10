import { useQueryClient, useQuery, useMutation } from "@tanstack/react-query";
import { useTripService } from "../services/use-trip-service";
import { TripCreate, TripUpdate } from "@/types";

export const useTrips = () => {
  const queryClient = useQueryClient();
  const tripService = useTripService();

  //Fetch trips
  const {
    data: trips = [],
    isLoading: isLoadingTrips,
    error: tripsError,
  } = useQuery({
    queryKey: ["trips"],
    queryFn: () => tripService.fetchAll(),
  });

  const createTrip = useMutation({
    mutationFn: (newItem: TripCreate) => tripService.create(newItem),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["trips"] }),
  });

  const updateTrip = useMutation({
    mutationFn: ({ id, data }: { id: string; data: TripUpdate }) =>
      tripService.update(id, data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["trips"] }),
  });

  const deleteTrip = useMutation({
    mutationFn: (id: string) => tripService.remove(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["trips"] }),
  });

  return {
    trips,
    isLoading: isLoadingTrips,
    error: tripsError,
    createTrip: createTrip.mutateAsync,
    updateTrip: updateTrip.mutateAsync,
    deleteTrip: deleteTrip.mutateAsync,
    isCreating: createTrip.isPending,
  };
};
