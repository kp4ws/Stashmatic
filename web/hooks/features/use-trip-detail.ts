import { useQuery } from "@tanstack/react-query";
import { useTripService } from "../services/use-trip-service";
import { useTripItemService } from "../services/use-trip-item-service";
import { useCategoryService } from "../services/use-category_service";

export const useTripDetail = (id: string) => {
  const tripService = useTripService();
  const tripItemService = useTripItemService();
  const categoryService = useCategoryService();

  const {
    data: trip,
    isLoading: isLoadingTrip,
    error: tripError,
  } = useQuery({
    queryKey: ["trips", id],
    queryFn: () => tripService.getOne(id),
  });

  const {
    data: tripItems = [],
    isLoading: isLoadingItems,
    error: itemsError,
  } = useQuery({
    queryKey: ["trip_items", id],
    queryFn: () => tripItemService.fetchByTrip(id),
  });

  const { data: categories = [], isLoading: isLoadingCategories } = useQuery({
    queryKey: ["categories"],
    queryFn: () => categoryService.fetchAll(),
  });

  return {
    trip,
    tripItems,
    categories,
    isLoading: isLoadingTrip || isLoadingItems || isLoadingCategories,
    error: tripError || itemsError,
  };
};
