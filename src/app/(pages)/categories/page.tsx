"use client";
import React, { useState } from "react";
import {
  ShoppingBag,
  Grid3x3,
  List,
  ChevronRight,
} from "lucide-react";
import { Category } from "@/interfaces";
import { LoadingSpinner } from "@/components";
import Image from "next/image";
import Link from "next/link";
import HeroCarousel from "@/components/HeroCarousel";
import { useCategories } from "@/hooks/useCategories";

const CategoriesPage = () => {
  const [viewMode, setViewMode] = useState("grid");
  const { data: categoriesData, isLoading, error } = useCategories();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0f172a]">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0f172a]">
        <div className="text-red-400">Error loading categories</div>
      </div>
    );
  }

  const categories = categoriesData?.data || [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#1e1b4b] to-[#312e81] text-white">

      {/* 🔥 HERO */}
      <div className="relative bg-linear-to-br from-purple-500 to-pink-500">
        {/* <HeroCarousel /> */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
              <div className="flex items-center justify-between ">
                <div className="">
                  <div className="flex items-center mb-3 ">
                    <ShoppingBag className="w-10 h-10 mr-3" />
                    <h1 className="text-5xl font-bold">Shop by Categories</h1>
                  </div>
                  <p className="text-xl text-white/90 max-w-2xl">
                    Explore our curated collection of {categories.length} amazing
                    categories
                  </p>
                </div>

              </div>
            </div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/30 to-black/80" />
      </div>

      {/* HEADER */}
      <div className="max-w-7xl mx-auto px-4 mt-16 mb-10 flex flex-col md:flex-row justify-between items-center gap-6">

        <div>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
            Shop by Category
          </h1>
          <p className="text-gray-300 mt-2">
            Explore {categories.length} curated categories
          </p>
        </div>

        <div className="flex bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-1">
          <button
            onClick={() => setViewMode("grid")}
            className={`p-2 rounded-lg ${
              viewMode === "grid" ? "bg-white/20" : ""
            }`}
          >
            <Grid3x3 />
          </button>
          <button
            onClick={() => setViewMode("list")}
            className={`p-2 rounded-lg ${
              viewMode === "list" ? "bg-white/20" : ""
            }`}
          >
            <List />
          </button>
        </div>

      </div>

      {/* GRID */}
      <div className="max-w-7xl mx-auto px-4 pb-20">

        {categories.length === 0 ? (
          <div className="text-center text-gray-400 py-20">
            No categories found
          </div>
        ) : viewMode === "grid" ? (

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">

            {categories.map((category) => (
              <Link
                href={`/products?category=${category._id}`}
                key={category._id}
                className="group"
              >
                <div className="relative rounded-2xl overflow-hidden bg-white/5 backdrop-blur-xl border border-white/10 hover:border-indigo-400/40 shadow-lg hover:shadow-indigo-500/20 transition duration-500">

                  {/* Glow */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500 bg-gradient-to-br from-indigo-500/10 to-purple-500/10" />

                  {/* Image */}
                  <div className="relative h-44">
                    <Image
                      src={category.image}
                      alt={category.name}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                      unoptimized
                    />
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    <h3 className="text-lg font-semibold group-hover:text-indigo-300 transition">
                      {category.name}
                    </h3>

                    <p className="text-sm text-gray-400 mt-1">
                      {category.slug}
                    </p>

                    <div className="flex items-center justify-between mt-4 text-sm text-gray-300">
                      <span>Explore</span>
                      <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition" />
                    </div>
                  </div>

                </div>
              </Link>
            ))}

          </div>

        ) : (

          <div className="space-y-4">
            {categories.map((category) => (
              <Link
                href={`/products?category=${category._id}`}
                key={category._id}
                className="flex items-center gap-4 bg-white/5 backdrop-blur-lg border border-white/10 p-4 rounded-xl hover:bg-white/10 transition"
              >
                <div className="w-20 h-20 relative rounded-lg overflow-hidden">
                  <Image
                    src={category.image}
                    alt={category.name}
                    fill
                    className="object-cover"
                    unoptimized
                  />
                </div>

                <div className="flex-1">
                  <h3 className="text-lg font-semibold">{category.name}</h3>
                  <p className="text-sm text-gray-400">{category.slug}</p>
                </div>

                <ChevronRight className="text-gray-400" />
              </Link>
            ))}
          </div>

        )}

      </div>
    </div>
  );
};

export default CategoriesPage;