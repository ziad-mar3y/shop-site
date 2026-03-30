"use client";

import { apiServices } from "@/apiServices/apiServices";
import { LoadingSpinner, ProductCard } from "@/components";
import HeroCarousel from "@/components/HeroCarousel";
import { ProductResponse } from "@/types";
import { Product } from "@/interfaces";
import { useState, useEffect, useRef, useCallback } from "react";
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
  const [visibleProducts, setVisibleProducts] = useState<Product[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const lastProductRef = useRef<HTMLDivElement | null>(null);
  const productsPerPage = 20;

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

  // Load more products when intersection is observed
  const loadMoreProducts = useCallback(() => {
    if (!hasMore) return;
    
    const nextPage = currentPage + 1;
    const startIndex = (nextPage - 1) * productsPerPage;
    const endIndex = startIndex + productsPerPage;
    const nextProducts = filteredProducts.slice(startIndex, endIndex);
      
    setVisibleProducts(prev => [...prev, ...nextProducts]);
    setCurrentPage(nextPage);
    
    if (endIndex >= filteredProducts.length) {
      setHasMore(false);
    }
  }, [currentPage, hasMore, filteredProducts, productsPerPage]);

  // Setup intersection observer for lazy loading
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const target = entries[0];
        if (target.isIntersecting && hasMore) {
          loadMoreProducts();
        }
      },
      {
        threshold: 0.1,
        rootMargin: '100px'
      }
    );

    observerRef.current = observer;

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [loadMoreProducts, hasMore]);

  // Initialize visible products and setup observer
  useEffect(() => {
    const initialProducts = filteredProducts.slice(0, productsPerPage);
    setVisibleProducts(initialProducts);
    setCurrentPage(1);
    setHasMore(filteredProducts.length > productsPerPage);
  }, [filteredProducts, productsPerPage]);

  // Observe last product element
  useEffect(() => {
    if (lastProductRef.current && observerRef.current) {
      observerRef.current.observe(lastProductRef.current);
    }
  }, [visibleProducts, observerRef]);

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
              Showing {visibleProducts.length} of {filteredProducts.length} results
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
          {visibleProducts.length === 0 ? (
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
            visibleProducts.map((product, index) => (
              <div
                key={product._id}
                ref={index === visibleProducts.length - 1 ? lastProductRef : null}
              >
                <ProductCard
                  product={product}
                  viewMode={viewMode}
                />
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}