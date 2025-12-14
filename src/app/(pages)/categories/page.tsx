"use client";
import React, { useState, useEffect } from "react";
import {
  ShoppingBag,
  Grid3x3,
  List,
  TrendingUp,
  Sparkles,
  ChevronRight,
} from "lucide-react";
import { CategoryResponse } from "@/types";
import { Category } from "@/interfaces";
import { LoadingSpinner } from "@/components";
import { apiServices } from "@/apiServices/apiServices";
import Image from "next/image";
import Link from "next/link";

const CategoriesPage = () => {
  const [categories, setCategories] = useState<Category[] | []>([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState("grid");
  const [hoveredId, setHoveredId] = useState(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      setLoading(true)
      const response: CategoryResponse = await apiServices.getAllCategories()
      setCategories(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching categories:", error);
      setLoading(false);
    }
  };

  const getCategoryColor = (index: any) => {
    const colors = [
      "from-purple-500 to-pink-500",
      "from-blue-500 to-cyan-500",
      "from-green-500 to-emerald-500",
      "from-orange-500 to-red-500",
      "from-indigo-500 to-purple-500",
      "from-rose-500 to-pink-500",
      "from-teal-500 to-green-500",
      "from-amber-500 to-orange-500",
      "from-violet-500 to-fuchsia-500",
      "from-cyan-500 to-blue-500",
    ];
    return colors[index % colors.length];
  };

  if (loading) {
    return (
      <div className="min-h-screen gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
        <div className="text-center">
          <LoadingSpinner/>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-white to-slate-100">
      {/* Hero Header */}
      <div className="relative overflow-hidden bg-linear-to-r from-indigo-600 via-purple-600 to-pink-600 text-white">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNnoiIHN0cm9rZT0iI2ZmZiIgc3Ryb2tlLW9wYWNpdHk9Ii4xIi8+PC9nPjwvc3ZnPg==')] opacity-20"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="flex items-center justify-between ">
            <div className="">
              <div className="flex items-center mb-3 ">
                <ShoppingBag className="w-10 h-10 mr-3" />
                <h1 className="text-5xl font-bold">Shop by Category</h1>
              </div>
              <p className="text-xl text-white/90 max-w-2xl">
                Explore our curated collection of {categories.length} amazing
                categories
              </p>
            </div>

            <div className="hidden md:flex gap-2 bg-white/10 backdrop-blur-sm rounded-lg p-1">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-3 rounded-lg transition-all ${
                  viewMode === "grid"
                    ? "bg-white text-indigo-600"
                    : "text-white hover:bg-white/20"
                }`}
              >
                <Grid3x3 className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-3 rounded-lg transition-all ${
                  viewMode === "list"
                    ? "bg-white text-indigo-600"
                    : "text-white hover:bg-white/20"
                }`}
              >
                <List className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Stats Bar */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-indigo-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">
                  Total Categories
                </p>
                <p className="text-3xl font-bold text-gray-900 mt-1">
                  {categories.length}
                </p>
              </div>
              <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center">
                <Grid3x3 className="w-6 h-6 text-indigo-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-purple-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">
                  Featured Items
                </p>
                <p className="text-3xl font-bold text-gray-900 mt-1">2,450+</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-pink-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium">
                  Trending Now
                </p>
                <p className="text-3xl font-bold text-gray-900 mt-1">Top 5</p>
              </div>
              <div className="w-12 h-12 bg-pink-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-pink-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Categories Grid/List */}
        {viewMode === "grid" ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {categories.map((category, index) => (
              <div
                key={category._id}
                onMouseEnter={() => setHoveredId(null )}
                onMouseLeave={() => setHoveredId(null)}
                className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden cursor-pointer transform hover:-translate-y-2"
              >
                {/* Gradient Overlay */}
                <div
                  className={`absolute inset-0 gradient-to-br ${getCategoryColor(
                    index
                  )} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
                ></div>

                {/* Image Container */}
                <div className="relative h-48 overflow-hidden bg-gray-100">
                  <Image
                    width={500}
                    height={500}
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />

                  {/* Hover Overlay */}
                  <div className="absolute inset-0 gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-4 left-4 right-4">
                      <Link href={`/categories/${category._id}`} className="w-full py-2 bg-white text-gray-900 rounded-lg font-semibold hover:bg-gray-100 transition-colors flex items-center justify-center gap-2">
                        Explore Now
                        <ChevronRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-indigo-600 transition-colors">
                    {category.name}
                  </h3>
                  <p className="text-sm text-gray-500 capitalize mb-3">
                    {category.slug}
                  </p>

                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">View Collection</span>
                    <ChevronRight
                      className={`w-4 h-4 text-indigo-600 transition-transform duration-300 ${
                        hoveredId === category._id ? "translate-x-1" : ""
                      }`}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {categories.map((category, index) => (
              <div
                key={category._id}
                className="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer"
              >
                <div className="flex items-center p-6">
                  <div className="relative w-24 h-24 rounded-lg overflow-hidden shrink-0">
                    <img
                      src={category.image}
                      alt={category.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>

                  <div className="flex-1 ml-6">
                    <h3 className="text-2xl font-bold text-gray-900 mb-1 group-hover:text-indigo-600 transition-colors">
                      {category.name}
                    </h3>
                    <p className="text-gray-500 capitalize">{category.slug}</p>
                  </div>

                  <div
                    className={`w-12 h-12 rounded-full gradient-to-br ${getCategoryColor(
                      index
                    )} flex items-center justify-center text-white shrink-0 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <ChevronRight className="w-6 h-6" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoriesPage;
