"use client";
import { apiServices } from "@/apiServices/apiServices";
import { Button, LoadingSpinner, ProductCard } from "@/components";
import { Product } from "@/interfaces";
import { ProductResponse } from "@/types";
import { error } from "console";
import { Grid, List } from "lucide-react";
import React, { useEffect, useState } from "react";

export default function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  async function getAllProducts() {
    setIsLoading(true);
    const data: ProductResponse = await apiServices.getAllProducts()
    setProducts(data.data);
    setIsLoading(false);
  }

  useEffect(() => {
    getAllProducts();
  }, []);

  if (isLoading && products.length == 0) {
    return <LoadingSpinner />;
  }

 

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">Products</h1>
        <p className="text-muted-foreground">
          Discover amazing products from our collection
        </p>
      </div>

      <div className="flex items-center justify-end mb-6">
        <div className="flex items-center border rounded-md">
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

      {/* Products Grid */}
      <div
        className={`grid gap-6 container mx-auto${
          viewMode === "grid"
            ? "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
            : "grid-cols-1"
        }`}
      >
        {products.map((product) => (
          <ProductCard
            key={product._id}
            product={product}
            viewMode={viewMode}
          />
        ))}
      </div>
    </div>
  )
}
