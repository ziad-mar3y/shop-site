"use client";

import { apiServices } from "@/apiServices/apiServices";
import HeroCarousel from "@/components/HeroCarousel";
import { Brand } from "@/interfaces";
import { BrandResponse } from "@/types";
import { Search, Grid3x3, List, ShoppingBag } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export default function Brands() {
  const [brands, setBrands] = useState<Brand[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState("grid");

  async function getAllBrands() {
    const response: BrandResponse = await apiServices.getAllBrands();
    setBrands(response.data);
  }

  useEffect(() => {
    getAllBrands();
  }, []);

  const filteredBrands = brands.filter((brand) =>
    brand.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#1e1b4b] to-[#312e81] text-white">

      {/* 🔥 HERO */}
      <div className="relative bg-linear-to-br from-purple-500 to-pink-500">
        {/* <HeroCarousel /> */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
              <div className="flex items-center justify-between  ">
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

        {/* Glow overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/30 to-black/80 pointer-events-none" />
      </div>

      {/* HEADER */}
      <div className="max-w-7xl mx-auto px-4 mt-16 mb-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">

          <div>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
              Explore Brands
            </h1>
            <p className="text-gray-300 mt-2">
              Discover top brands curated for you
            </p>
          </div>

          {/* Search */}
          <div className="flex items-center bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl px-4 py-2 w-full md:w-[350px]">
            <Search className="text-gray-300 mr-2" />
            <input
              type="text"
              placeholder="Search brands..."
              className="bg-transparent w-full outline-none text-white placeholder:text-gray-400"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Toggle */}
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
      </div>

      {/* GRID */}
      <div className="max-w-7xl mx-auto px-4 pb-20">

        {filteredBrands.length === 0 ? (
          <div className="text-center py-20 text-gray-400">
            No brands found
          </div>
        ) : viewMode === "grid" ? (

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">

            {filteredBrands.map((brand) => (
              <Link
                href={`/products?brand=${brand._id}`}
                key={brand._id}
                className="group"
              >
                <div className="relative rounded-2xl overflow-hidden bg-white/5 backdrop-blur-xl border border-white/10 hover:border-indigo-400/40 shadow-lg hover:shadow-indigo-500/20 transition duration-500">

                  {/* Glow effect */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500 bg-gradient-to-br from-indigo-500/10 to-purple-500/10" />

                  {/* Image */}
                  <div className="relative h-44 flex items-center justify-center">
                    <Image
                      src={brand.image}
                      alt={brand.name}
                      width={120}
                      height={120}
                      className="object-contain transition-transform duration-500 group-hover:scale-110"
                      unoptimized
                    />
                  </div>

                  {/* Content */}
                  <div className="p-4 text-center">
                    <h2 className="text-lg font-semibold group-hover:text-indigo-300 transition">
                      {brand.name}
                    </h2>
                  </div>

                </div>
              </Link>
            ))}

          </div>

        ) : (

          <div className="space-y-4">
            {filteredBrands.map((brand) => (
              <Link
                href={`/brands/${brand._id}`}
                key={brand._id}
                className="flex items-center gap-4 bg-white/5 backdrop-blur-lg border border-white/10 p-4 rounded-xl hover:bg-white/10 transition"
              >
                <div className="w-20 h-20 relative bg-white/10 rounded-lg overflow-hidden flex items-center justify-center">
                  <Image
                    src={brand.image}
                    alt={brand.name}
                    width={80}
                    height={80}
                    className="object-contain"
                    unoptimized
                  />
                </div>

                <div>
                  <h2 className="text-lg font-semibold">{brand.name}</h2>
                  <p className="text-sm text-gray-400">View products →</p>
                </div>
              </Link>
            ))}
          </div>

        )}

      </div>
    </div>
  );
}