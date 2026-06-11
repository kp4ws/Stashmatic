import { useApi } from "./use-api";
import { useCrudService } from "./use-crud-service";
import { TripItem, TripItemCreate, TripItemUpdate } from "@/types";

export const useTripItemService = () => {
  const api = useApi();
  const crud = useCrudService<TripItem, TripItemCreate, TripItemUpdate>("/trip_items");

  return {
    ...crud,
    fetchByTrip: (tripId: string): Promise<TripItem[]> =>
      api(`/trip_items?trip_id=${tripId}`),
  }
};
