import { useQuery } from "@tanstack/react-query";
import { apiServices } from "@/apiServices/apiServices";
import { CategoryResponse } from "@/types";
import { Category } from "@/interfaces";

// Query keys
export const categoryKeys = {
  all: ["categories"] as const,
  lists: () => [...categoryKeys.all, "list"] as const,
  list: () => [...categoryKeys.lists()] as const,
  details: () => [...categoryKeys.all, "detail"] as const,
  detail: (id: string) => [...categoryKeys.details(), id] as const,
};

// Get all categories
export function useCategories() {
  return useQuery({
    queryKey: categoryKeys.list(),
    queryFn: () => apiServices.getAllCategories(),
    staleTime: 10 * 60 * 1000, // 10 minutes - categories don't change often
    gcTime: 30 * 60 * 1000, // 30 minutes
  });
}

// Get single category details
export function useCategory(id: string) {
  return useQuery({
    queryKey: categoryKeys.detail(id),
    queryFn: () => apiServices.getSingleCategory(id),
    enabled: !!id,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 15 * 60 * 1000, // 15 minutes
  });
}

// Get all subcategories
export function useSubcategories() {
  return useQuery({
    queryKey: ["subcategories"],
    queryFn: () => apiServices.getAllSubcategories(),
    staleTime: 10 * 60 * 1000, // 10 minutes
    gcTime: 30 * 60 * 1000, // 30 minutes
  });
}
