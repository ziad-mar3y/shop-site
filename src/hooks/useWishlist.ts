import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiServices } from "@/apiServices/apiServices";
import toast from "react-hot-toast";
import { useEffect } from "react";

// Query keys
export const wishlistKeys = {
  all: ["wishlist"] as const,
  items: () => [...wishlistKeys.all, "items"] as const,
  count: () => [...wishlistKeys.all, "count"] as const,
};

// Get wishlist items
export function useWishlist(token: string) {
  const query = useQuery({
    queryKey: wishlistKeys.items(),
    queryFn: () => apiServices.getWishlist(token),
    enabled: !!token,
    staleTime: 60 * 1000, // 1 minute
    gcTime: 5 * 60 * 1000, // 5 minutes
    retry: (failureCount, error: any) => {
      // Don't retry on 500 errors to avoid hammering server
      if (error?.message?.includes('500')) {
        return false;
      }
      return failureCount < 2; // Retry other errors twice
    },
    retryDelay: attemptIndex => Math.min(1000 * 2 ** attemptIndex, 30000), // Exponential backoff
  });

  // Handle errors with useEffect
  useEffect(() => {
    if (query.error) {
      console.error("Error fetching wishlist:", query.error);
      // Don't show toast for 500 errors to avoid spamming user during server issues
      if (query.error instanceof Error && !query.error.message.includes('500')) {
        toast.error("Failed to load wishlist");
      }
    }
  }, [query.error]);

  return query;
}

// Add product to wishlist mutation
export function useAddToWishlist() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ productId, token }: { productId: string; token: string }) =>
      apiServices.addToWishlist(productId, token),
    onSuccess: () => {
      toast.success("Item added to wishlist");
      // Invalidate wishlist queries
      queryClient.invalidateQueries({ queryKey: wishlistKeys.all });
    },
    onError: (error: any) => {
      console.error("Error adding to wishlist:", error);
      toast.error("Failed to add item to wishlist");
    },
  });
}

// Remove product from wishlist mutation
export function useRemoveFromWishlist() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ productId, token }: { productId: string; token: string }) =>
      apiServices.removeFromWishlist(productId, token),
    onSuccess: () => {
      toast.success("Item removed from wishlist");
      // Invalidate wishlist queries
      queryClient.invalidateQueries({ queryKey: wishlistKeys.all });
    },
    onError: (error: any) => {
      console.error("Error removing from wishlist:", error);
      toast.error("Failed to remove item from wishlist");
    },
  });
}
