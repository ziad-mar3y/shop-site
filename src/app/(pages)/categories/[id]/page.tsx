"use client";
import { SingleCategoryResponse } from "@/types";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { Calendar, Tag, Clock, Sparkles, Share2, Heart } from "lucide-react";
import { Category } from "@/interfaces";

export default function CategoryCard() {
  const { id } = useParams();
  const [category, setCategory] = useState<Category | null>(null);
  const [loading, setLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);

  async function getSingleCategory() {
    setLoading(true)
    const data: SingleCategoryResponse = await fetch(
      "https://ecommerce.routemisr.com/api/v1/categories/" + id
    ).then((res) => res.json());
    setCategory(data.data);
    setLoading(false)
  }

  useEffect(() => {
    getSingleCategory();
  }, []);

    if (loading) {
      return (
        <div className="min-h-screen bg-linear-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
          <div className="text-center space-y-4">
            <div className="relative">
              <div className="w-16 h-16 border-4 border-purple-400 border-t-transparent rounded-full animate-spin mx-auto"></div>
              <Sparkles className="w-6 h-6 text-yellow-300 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-pulse" />
            </div>
            <p className="text-white text-lg font-semibold">Loading...</p>
          </div>
        </div>
      );
    }

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
      {/* Category Card */}
      <div className="w-full max-w-md bg-white/10 backdrop-blur-xl rounded-3xl overflow-hidden shadow-2xl border border-white/20 transform hover:scale-105 transition-all duration-500 hover:shadow-purple-500/50">
        {/* Image Section */}
        <div className="relative h-64 overflow-hidden group">
          <img
            src={category?.image}
            alt={category?.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent"></div>

          {/* Top Actions */}
          <div className="absolute top-4 right-4 flex gap-2">
            <button
              onClick={() => setIsFavorite(!isFavorite)}
              className="bg-white/90 backdrop-blur-sm rounded-full p-2 hover:bg-white transition-all duration-300 hover:scale-110"
            >
              <Heart
                className={`w-5 h-5 transition-colors ${
                  isFavorite ? "fill-red-500 text-red-500" : "text-gray-700"
                }`}
              />
            </button>
            <button className="bg-white/90 backdrop-blur-sm rounded-full p-2 hover:bg-white transition-all duration-300 hover:scale-110">
              <Share2 className="w-5 h-5 text-gray-700" />
            </button>
          </div>

          {/* Category Badge */}
          <div className="absolute top-4 left-4">
            <div className="bg-linear-to-r from-purple-500 to-pink-500 text-white px-4 py-1 rounded-full text-xs font-bold shadow-lg flex items-center gap-2">
              <Sparkles className="w-3 h-3" />
              <span>CATEGORY</span>
            </div>
          </div>

          {/* Category Name Overlay */}
          <div className="absolute bottom-4 left-4 right-4">
            <h2 className="text-3xl font-bold text-white drop-shadow-2xl mb-2">
              {category?.name}
            </h2>
            <div className="flex items-center gap-2 text-purple-200">
              <Tag className="w-4 h-4" />
              <span className="font-mono text-sm">/{category?.slug}</span>
            </div>
          </div>
        </div>

        {/* Details Section */}
        <div className="p-6 space-y-4">
          {/* Date Info */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-linear-to-br from-green-500/20 to-emerald-500/20 rounded-xl p-3 border border-green-300/30">
              <div className="flex items-center gap-2 mb-1">
                <Calendar className="w-4 h-4 text-green-300" />
                <span className="text-xs text-green-300 font-semibold">
                  Created
                </span>
              </div>
              <p className="text-white text-sm font-semibold">
                {category?.createdAt}
              </p>
            </div>

            <div className="bg-linear-to-br from-orange-500/20 to-amber-500/20 rounded-xl p-3 border border-orange-300/30">
              <div className="flex items-center gap-2 mb-1">
                <Clock className="w-4 h-4 text-orange-300" />
                <span className="text-xs text-orange-300 font-semibold">
                  Updated
                </span>
              </div>
              <p className="text-white text-sm font-semibold">
                {category?.updatedAt}
              </p>
            </div>
          </div>

          {/* ID Section */}
          <div className="bg-black/30 rounded-xl p-3 border border-white/10">
            <span className="text-xs text-purple-300 font-semibold uppercase tracking-wider">
              ID
            </span>
            <p className="text-white font-mono text-xs mt-1 break-all opacity-70">
              {category?._id}
            </p>
          </div>

          {/* Action Button */}
          <button className="w-full bg-linear-to-r from-purple-500 to-pink-500 text-white py-3 rounded-xl font-semibold hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2">
            <Tag className="w-5 h-5" />
            View Products
          </button>
        </div>
      </div>

      {/* Decorative Background Elements */}
      <div className="fixed top-20 left-10 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl animate-pulse pointer-events-none"></div>
      <div
        className="fixed bottom-20 right-10 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl animate-pulse pointer-events-none"
        style={{ animationDelay: "1s" }}
      ></div>
    </div>
  );
}
