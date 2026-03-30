"use client";

import { apiServices } from "@/apiServices/apiServices";
import { LoadingSpinner, ProductCard } from "@/components";
import HeroCarousel from "@/components/HeroCarousel";
import { ProductResponse } from "@/types";
import { Product } from "@/interfaces";
import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";

export default function Products() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const searchParams = useSearchParams();

  // Normalize query params (IMPORTANT for caching)
  const categoryFilter = searchParams.get("category") || "all";
  const brandFilter = searchParams.get("brand") || "all";

  const fetchProducts = async (): Promise<ProductResponse> => {
    const data: ProductResponse = await apiServices.getAllProducts();
    return data;
  };

  const {
    data: productResponse,
    isLoading,
    error,
    isFetching,
  } = useQuery<ProductResponse>({
    queryKey: ["products"],
    queryFn: fetchProducts,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 30 * 60 * 1000, // 30 minutes
  });

  const products = productResponse?.data || [];

  // Filter products based on URL parameters
  const filteredProducts = products.filter((product: Product) => {
    // Add null checks to prevent "Cannot read properties of null" errors
    if (!product) return false;
    
    const categoryId = product.category?._id?.toString() || '';
    const brandId = product.brand?._id?.toString() || '';
    
    const matchesCategory = categoryFilter === "all" || categoryId === categoryFilter;
    const matchesBrand = brandFilter === "all" || brandId === brandFilter;
    
    return matchesCategory && matchesBrand;
  });

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-red-500">Something went wrong while loading products.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <HeroCarousel />

      <div className="container mx-auto px-6 py-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold">Products</h1>
            <p className="text-gray-500">
              Showing {filteredProducts.length} results
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setViewMode("grid")}
              className={`px-4 py-2 rounded-lg border ${
                viewMode === "grid"
                  ? "bg-black text-white"
                  : "bg-white"
              }`}
            >
              Grid
            </button>

            <button
              onClick={() => setViewMode("list")}
              className={`px-4 py-2 rounded-lg border ${
                viewMode === "list"
                  ? "bg-black text-white"
                  : "bg-white"
              }`}
            >
              List
            </button>
          </div>
        </div>

        {/* Loading indicator on refetch */}
        {isFetching && (
          <p className="text-sm text-gray-400 mb-4">Updating...</p>
        )}

        {/* Products */}
        <div
          className={`grid gap-6 ${
            viewMode === "grid"
              ? "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
              : "grid-cols-1"
          }`}
        >
          {filteredProducts.length === 0 ? (
            <div className="col-span-full text-center py-20">
              <div className="text-gray-400 text-6xl mb-4">📦</div>
              <h3 className="text-2xl font-bold text-gray-700 mb-2">
                No products found
              </h3>
              <p className="text-gray-500">
                {categoryFilter !== "all" && brandFilter !== "all"
                  ? `No products in "${categoryFilter}" & "${brandFilter}".`
                  : categoryFilter !== "all"
                  ? `No products in "${categoryFilter}".`
                  : brandFilter !== "all"
                  ? `No products in "${brandFilter}".`
                  : "No products available."}
              </p>
            </div>
          ) : (
            filteredProducts.map((product) => (
              <ProductCard
                key={product._id}
                product={product}
                viewMode={viewMode}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}