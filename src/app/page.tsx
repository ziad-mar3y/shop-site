
"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Star } from "lucide-react";
import { motion } from "framer-motion";
import { Product } from "@/interfaces";
import Image from "next/image";
import { ProductCard } from "@/components";
import { useProducts } from "@/hooks/useProducts";
import Link from "next/link";
import { div } from "three/src/nodes/math/OperatorNode.js";

export default function EcommerceLanding() {
  const { data: productsData, isLoading, error } = useProducts();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex items-center justify-center">
        <div className="text-red-500">Error loading products</div>
      </div>
    );
  }

  const products = productsData?.data || [];
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <section className="relative grid md:grid-cols-2 gap-12 items-center px-10 py-20 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-sm font-medium text-gray-500 uppercase tracking-wide">
            Premium Collection
          </span>
          <h1 className="text-5xl md:text-6xl font-extrabold leading-tight mt-4 mb-6">
            Elevate Your Everyday Style
          </h1>
          <p className="text-gray-600 text-lg mb-8 max-w-lg">
            Discover high-quality products designed to match your lifestyle. Minimal, modern, and made for you.
          </p>

          <div className="flex gap-4 xs:flex-col xs:gap-2 lg:flex-row lg:gap-4 2xs:flex-col md:flex-row sm:flex-row">
            <Link href="/products">
              <Button size="lg" className="px-8">Shop Now</Button>
            </Link>
            <Link href="/categories">
              <Button size="lg" variant="outline" className="px-8 ">Browse Categories</Button>
            </Link>
          </div>

          <div className="mt-10 flex items-center gap-6 text-sm text-gray-500">
            <span>✔ Free Shipping</span>
            <span>✔ 30-Day Returns</span>
            <span>✔ Secure Payment</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="relative"
        >
          <img
            src="https://images.unsplash.com/photo-1523275335684-37898b6baf30"
            className="rounded-3xl shadow-2xl "
          />
          <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-2xl shadow-lg">
            <p className="text-sm text-gray-500">Starting from</p>
            <p className="text-xl font-bold">$29.99</p>
          </div>
        </motion.div>
      </section>

      {/* Search + Filter */}
      <section className="max-w-7xl mx-auto px-10 mb-12">
        <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
          <Input placeholder="Search premium products..." className="max-w-md" />
          <div className="flex gap-2">
            <Link href="/products">
              <Button variant="outline">All</Button>
            </Link>
            <Link href="/products?sort=new">
              <Button variant="outline">New</Button>
            </Link>
            <Link href="/products?sort=popular">
              <Button variant="outline">Popular</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="max-w-7xl mx-auto px-10 pb-20">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold">Featured Products</h2>
          <Link href="/products">
            <Button variant="ghost">View All</Button>
          </Link>
        </div>

             <div
                className={`grid gap-6 container mx-auto${
                  "grid"=== "grid"
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
                    
                  </div>
                ) : (
                  products.slice(0, 5).map((product) => (
                    <ProductCard
                      key={product._id}
                      product={product}
                      viewMode="grid"
                    />
                  ))
                )}
              </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-6xl mx-auto px-10 pb-20">
        <div className="bg-black text-white rounded-3xl p-12 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-3xl font-bold mb-2">Exclusive Deals</h3>
            <p className="text-gray-300">
              Sign up now and get 20% off your first order.
            </p>
          </div>
          <div className="flex gap-3 w-full md:w-auto">
            <Input placeholder="Enter your email" className="bg-white text-black" />
            <Button variant="secondary">Get Offer</Button>
          </div>
        </div>
      </section>
    </div>
  );
}
