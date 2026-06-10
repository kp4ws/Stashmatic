import { useQuery } from "@tanstack/react-query";
import { useTripService } from "../services/use-trip-service";

export const useTripDetail = (id: string) => {
  const tripService = useTripService();

  const {
    data: trip,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["trips", id],
    queryFn: () => tripService.getOne(id),
  });

  return { trip, isLoading, error };
};