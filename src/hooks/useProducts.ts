import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiServices } from "@/apiServices/apiServices";
import { ProductResponse } from "@/types";
import { Product } from "@/interfaces";
import toast from "react-hot-toast";

// Query keys
export const productKeys = {
  all: ["products"] as const,
  lists: () => [...productKeys.all, "list"] as const,
  list: (filters: string) => [...productKeys.lists(), { filters }] as const,
  details: () => [...productKeys.all, "detail"] as const,
  detail: (id: string) => [...productKeys.details(), id] as const,
};

// Get all products with optional filtering
export function useProducts(category?: string, brand?: string) {
  const filters = new URLSearchParams();
  if (category) filters.append("category", category);
  if (brand) filters.append("brand", brand);
  
  const filterString = filters.toString();

  return useQuery({
    queryKey: productKeys.list(filterString),
    queryFn: async () => {
      const data: ProductResponse = await apiServices.getAllProducts();
      
      // Filter products based on parameters
      let filteredProducts = data.data;
      if (category) {
        filteredProducts = data.data.filter(product => 
          product.category?.slug === category
        );
      }
      if (brand) {
        filteredProducts = data.data.filter(product => 
          product.brand?.slug === brand
        );
      }
      
      return { ...data, data: filteredProducts };
    },
    staleTime: 2 * 60 * 1000, // 2 minutes
    gcTime: 5 * 60 * 1000, // 5 minutes
  });
}

// Get single product details
export function useProduct(id: string) {
  return useQuery({
    queryKey: productKeys.detail(id),
    queryFn: () => apiServices.getProductDetails(id),
    enabled: !!id,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
}

// Add product to cart mutation
export function useAddToCart() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ productId, token }: { productId: string; token: string }) =>
      apiServices.addProductToCart(productId, token),
    onSuccess: (data: any) => {
      toast.success("Item added to cart");
      // Invalidate cart-related queries if they exist
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
    onError: (error: any) => {
      console.error("Error adding to cart:", error);
      toast.error("Failed to add item to cart");
    },
  });
}
