"use client";
import { apiServices } from "@/apiServices/apiServices";
import { Brand } from "@/interfaces";
import { BrandResponse } from "@/types";
import { Award, Grid3x3, List, Search, ShoppingBag, Sparkles, TrendingUp } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export default function Brands() {
  const [brands, setBrands] = useState<Brand[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [viewMode, setViewMode] = useState("grid");

  async function getAllBrands() {
    const response: BrandResponse = await apiServices.getAllBrands();
    setBrands(response.data);
  }

  useEffect(() => {
    getAllBrands();
  }, []);

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
  return (
    <>
      <div className="min-h-screen  bg-linear-to-br from-slate-50 via-white to-slate-50">
        {/* Hero Section */}
        <div className="mb-16 ">
          <div className="relative overflow-hidden bg-linear-to-r from-indigo-600 via-purple-600 to-pink-600 text-white">
            <div className="absolute inset-0 bg-black opacity-10"></div>
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNnoiIHN0cm9rZT0iI2ZmZiIgc3Ryb2tlLW9wYWNpdHk9Ii4xIi8+PC9nPjwvc3ZnPg==')] opacity-20"></div>

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
              <div className="flex items-center justify-between ">
                <div className="">
                  <div className="flex items-center mb-3 ">
                    <ShoppingBag className="w-10 h-10 mr-3" />
                    <h1 className="text-5xl font-bold">Shop by Brands</h1>
                  </div>
                  <p className="text-xl text-white/90 max-w-2xl">
                    Explore our curated collection of {brands.length} amazing
                    categories
                  </p>
                </div>

              </div>
            </div>
          </div>

          <div className=" mx-auto px-4 sm:px-6 lg:px-8 ">
            {/* Featured Brands */}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {brands.map((brand, index) => (
                <Link
                href={`/brands/${brand._id}`}
                  key={index}
                  className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer transform hover:-translate-y-2"
                >
                  <div
                    className={`h-48 gradient-to-br ${brand.slug} p-6 flex flex-col justify-between`}
                  >
                    <Image
                      src={brand.image}
                      alt={brand.name}
                      width={100}
                      height={100}
                    />
                    <h1 className="text-center font-bold text-2xl">
                      {brand.slug}
                    </h1>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Category Filter */}
          <div className="mb-8">
            {/* <div className="flex flex-wrap gap-3">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                  selectedCategory === category.id
                    ? 'bg-indigo-600 text-white shadow-lg scale-105'
                    : 'bg-white text-gray-700 hover:bg-gray-50 shadow'
                }`}
              >
                {category.name}
                <span className="ml-2 text-sm opacity-75">({category.count})</span>
              </button>
            ))}
          </div> */}
          </div>

          {/* Brands Grid */}
          {/* <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredBrands.map((brand, index) => (
            <div
              key={index}
              className="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden border border-gray-100 hover:border-indigo-200"
            >
              <div className="p-6">
                <div className="w-20 h-20 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-2xl font-bold shadow-lg group-hover:scale-110 transition-transform duration-300">
                  {brand.logo}
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 text-center mb-2 group-hover:text-indigo-600 transition-colors">
                  {brand.name}
                </h3>
                
                <div className="flex items-center justify-center gap-1 mb-3">
                  <span className="text-yellow-400">★</span>
                  <span className="text-gray-700 font-medium">{brand.rating}</span>
                </div>
                
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex justify-between">
                    <span>Products:</span>
                    <span className="font-semibold text-gray-900">{brand.products}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Category:</span>
                    <span className="font-semibold text-gray-900 capitalize">{brand.category}</span>
                  </div>
                </div>
                
                <button className="w-full mt-4 py-2 bg-indigo-50 text-indigo-600 rounded-lg font-medium hover:bg-indigo-600 hover:text-white transition-colors duration-300">
                  View Products
                </button>
              </div>
            </div>
          ))}
        </div> */}

          {brands.length === 0 && (
            <div className="text-center py-16">
              <div className="text-gray-400 text-6xl mb-4">🔍</div>
              <h3 className="text-2xl font-bold text-gray-700 mb-2">
                No brands found
              </h3>
              <p className="text-gray-500">
                Try adjusting your search or filters
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
