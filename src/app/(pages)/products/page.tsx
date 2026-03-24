"use client";
import { apiServices } from "@/apiServices/apiServices";
import { Button, LoadingSpinner, ProductCard } from "@/components";
import HeroCarousel from "@/components/HeroCarousel";
import { Product } from "@/interfaces";
import { ProductResponse } from "@/types";
import { error } from "console";
import { Grid, Grid3x3, List, ShoppingBag } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

export default function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const searchParams = useSearchParams();
  const categoryFilter = searchParams.get('category');
  const brandFilter = searchParams.get('brand');

  async function getAllProducts() {
    setIsLoading(true);
    const data: ProductResponse = await apiServices.getAllProducts()
    
    // Filter products by category if category filter exists
    let filteredProducts = data.data;
    if (categoryFilter) {
      filteredProducts = data.data.filter(product => 
        product.category?.slug === categoryFilter
      );
    }
    
    // Filter products by brand if brand filter exists
    if (brandFilter) {
      filteredProducts = data.data.filter(product => 
        product.brand?.slug === brandFilter
      );
    }
    
    setProducts(filteredProducts);
    setIsLoading(false);
  }

  useEffect(() => {
    getAllProducts();
  }, [categoryFilter, brandFilter]);

  if (isLoading && products.length == 0) {
    return <LoadingSpinner />;
  }

 

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-white to-slate-100">
      <HeroCarousel />

      <div className="relative overflow-hidden bg-linear-to-r from-indigo-600 via-purple-600 to-pink-600 text-white">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNnoiIHN0cm9rZT0iI2ZmZiIgc3Ryb2tlLW9wYWNpdHk9Ii4xIi8+PC9nPjwvc3ZnPg==')] opacity-20"></div>

        {/* <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="flex items-center justify-between ">
            <div className="">
              <div className="flex items-center mb-3 ">
                <ShoppingBag className="w-10 h-10 mr-3" />
                <h1 className="text-5xl font-bold">Shop by Products</h1>
              </div>
              <p className="text-xl text-white/90 max-w-2xl">
                Explore our curated collection of {products.length} amazing
                categories
              </p>
            </div>

            <div className="hidden md:flex gap-2 bg-white/10 backdrop-blur-sm rounded-lg p-1">
             <Button
            variant={viewMode === "grid" ? "default" : "ghost"}
            size="sm"
            onClick={() => setViewMode("grid")}
            className="rounded-r-none"
          >
            <Grid className="h-4 w-4" />
          </Button>
          <Button
            variant={viewMode === "list" ? "default" : "ghost"}
            size="sm"
            onClick={() => setViewMode("list")}
            className="rounded-l-none"
          >
            <List className="h-4 w-4" />
          </Button>
            </div>
          </div>
        </div> */}
      </div>
    <div className="container mx-auto px-5 py-8">
      {/* Header */}
       

      <div className="flex items-center justify-end mb-6">
        <div className="flex items-center border rounded-md">
   
        </div>
      </div>

      {/* Products Grid */}
      <div
        className={`grid gap-6 container mx-auto${
          viewMode === "grid"
            ? "grid-cols-1 xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
            : "grid-cols-1"
        }`}
      >
        {products.length === 0 ? (
          <div className="col-span-full text-center py-20">
            <div className="text-gray-400 text-6xl mb-4">📦</div>
            <h3 className="text-2xl font-bold text-gray-700 mb-2">
              No products found
            </h3>
            <p className="text-gray-500">
              {categoryFilter && brandFilter 
                ? `No products available in "${categoryFilter}" category and "${brandFilter}" brand.`
                : categoryFilter 
                  ? `No products available in "${categoryFilter}" category.`
                  : brandFilter
                    ? `No products available in "${brandFilter}" brand.`
                    : "No products available."
              }
            </p>
          </div>
        ) : (
          products.map((product) => (
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
  )
}
