"use client";

import { SingleCategoryResponse } from "@/types";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import {
  Calendar,
  Tag,
  Clock,
  Sparkles,
  Share2,
  Heart,
} from "lucide-react";
import { Category } from "@/interfaces";
import { apiServices } from "@/apiServices/apiServices";
import Image from "next/image";
import Link from "next/link";

export default function CategoryPage() {
  const { id } = useParams();
  const [category, setCategory] = useState<Category | null>(null);
  const [loading, setLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);

  const fetchCategory = async () => {
    try {
      setLoading(true);
      
      const categoryId = Array.isArray(id) ? id[0] : id;

      if (!categoryId) return;

      const res: SingleCategoryResponse =
        await apiServices.getSingleCategory(categoryId);
        
      setCategory(res.data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategory();
  }, [id]);

  const formatDate = (date?: string) => {
    if (!date) return "";
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0f172a]">
        <div className="w-16 h-16 border-4 border-purple-400 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!category) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#1e1b4b] to-[#312e81] text-white px-4 py-12">

      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center">

        {/* IMAGE */}
        <div className="relative group rounded-3xl overflow-hidden shadow-2xl border border-white/10">
          <Image
            src={category.image}
            alt={category.name}
            width={800}
            height={600}
            className="w-full h-[400px] object-cover transition-transform duration-700 group-hover:scale-110"
            unoptimized
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />

          {/* Actions */}
          <div className="absolute top-4 right-4 flex gap-2">
            <button
              onClick={() => setIsFavorite(!isFavorite)}
              className="bg-white/80 rounded-full p-2"
            >
              <Heart
                className={`w-5 h-5 ${
                  isFavorite ? "text-red-500 fill-red-500" : "text-black"
                }`}
              />
            </button>

            <button className="bg-white/80 rounded-full p-2">
              <Share2 className="w-5 h-5 text-black" />
            </button>
          </div>
        </div>

        {/* CONTENT */}
        <div className="space-y-6">

          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
              {category.name}
            </h1>

            <div className="flex items-center gap-2 text-gray-300 mt-2">
              <Tag className="w-4 h-4" />
              <span>/{category.slug}</span>
            </div>
          </div>

          {/* INFO */}
          <div className="grid grid-cols-2 gap-4">

            <div className="bg-white/5 backdrop-blur-lg p-4 rounded-xl border border-white/10">
              <div className="flex items-center gap-2 text-green-400 text-sm">
                <Calendar className="w-4 h-4" />
                Created
              </div>
              <p className="mt-1 font-semibold">
                {formatDate(category.createdAt)}
              </p>
            </div>

            <div className="bg-white/5 backdrop-blur-lg p-4 rounded-xl border border-white/10">
              <div className="flex items-center gap-2 text-orange-400 text-sm">
                <Clock className="w-4 h-4" />
                Updated
              </div>
              <p className="mt-1 font-semibold">
                {formatDate(category.updatedAt)}
              </p>
            </div>

          </div>

          {/* BUTTON */}
          <Link href={`/products?category=${category.slug}`} className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 py-3 rounded-xl font-semibold hover:scale-105 transition px-4">
            View Products
          </Link>

        </div>
      </div>
    </div>
  );
}