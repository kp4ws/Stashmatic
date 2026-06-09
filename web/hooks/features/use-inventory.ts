import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useGearItemService } from "../services/use-gear-item-service";
import { useCategoryService } from "../services/use-category_service";
import { GearItemCreate, GearItemUpdate } from "@/types";

export const useInventory = () => {
  const queryClient = useQueryClient();
  const gearService = useGearItemService();
  const categoryService = useCategoryService();

  //Fetch gear items
  const {
    data: items = [],
    isLoading: isLoadingItems,
    error: itemsError,
  } = useQuery({
    queryKey: ["gear_items"],
    queryFn: () => gearService.fetchAll(),
  });

  //Fetch categories
  const {
    data: categories = [],
    isLoading: isLoadingCategories,
    error: categoriesError,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: () => categoryService.fetchAll(),
  });

  const createItem = useMutation({
    mutationFn: (newItem: GearItemCreate) => gearService.create(newItem),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["gear_items"] }),
  });

  const updateItem = useMutation({
    mutationFn: ({ id, data }: { id: string; data: GearItemUpdate }) =>
      gearService.update(id, data),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["gear_items"] }),
  });

  const deleteItem = useMutation({
    mutationFn: (id: string) => gearService.remove(id),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["gear_items"] }),
  });

  return {
    items,
    categories,
    isLoading: isLoadingItems || isLoadingCategories,
    error: itemsError || categoriesError,
    createItem: createItem.mutateAsync,
    updateItem: updateItem.mutateAsync,
    deleteItem: deleteItem.mutateAsync,
    isSubmitting: createItem.isPending || updateItem.isPending,
    isDeleting: deleteItem.isPending
  };
};
