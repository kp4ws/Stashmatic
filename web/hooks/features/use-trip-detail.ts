import { useQueryClient, useQuery, useMutation } from "@tanstack/react-query";
import { useTripService } from "../services/use-trip-service";
import { useTripItemService } from "../services/use-trip-item-service";
import { useCategoryService } from "../services/use-category_service";
import { TripItemCreate, TripItemUpdate } from "@/types";

export const useTripDetail = (id: string) => {
  const queryClient = useQueryClient();
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

  const createItem = useMutation({
    mutationFn: (newItem: TripItemCreate) => tripItemService.create(newItem),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["trip_items", id] }),
  });

  const updateItem = useMutation({
    mutationFn: ({ id: itemId, data }: { id: string; data: TripItemUpdate }) =>
      tripItemService.update(itemId, data),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["trip_items", id] }),
  });

  const deleteItem = useMutation({
    mutationFn: (itemId: string) => tripItemService.remove(itemId),
    onSuccess: () => queryClient.invalidateQueries({queryKey: ["trip_items", id]}),
  });

  return {
    trip,
    tripItems,
    categories,
    error: tripError || itemsError,
    isLoading: isLoadingTrip || isLoadingItems || isLoadingCategories,
    createItem: createItem.mutateAsync,
    updateItem: updateItem.mutateAsync,
    deleteItem: deleteItem.mutateAsync,
    isSubmitting: createItem.isPending || updateItem.isPending,
    isDeleting: deleteItem.isPending
  };
};
