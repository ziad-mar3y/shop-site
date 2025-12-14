'use client'
import { useState, useEffect } from 'react';
import { Calendar, Tag, Clock, Star, TrendingUp, Heart, Share2, Award, Sparkles } from 'lucide-react';
import { useParams } from 'next/navigation';
import { Brand } from '@/interfaces';

export default function BrandPage() {
    const {id} = useParams()
  const [brand, setBrand] = useState<Brand | null>(null);
  const [loading, setLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    fetch('https://ecommerce.routemisr.com/api/v1/brands/'+id)
      .then(res => res.json())
      .then(data => {
        setBrand(data.data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching brand:', err);
        setLoading(false);
      });
  }, []);




  if (loading) {
    return (
      <div className="min-h-screen bg-linear-to-br from-slate-950 via-blue-950 to-slate-950 flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="relative">
            <div className="w-20 h-20 border-4 border-blue-400 border-t-transparent rounded-full animate-spin mx-auto"></div>
            <Sparkles className="w-8 h-8 text-yellow-300 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-pulse" />
          </div>
          <p className="text-white text-xl font-semibold">Loading brand details...</p>
        </div>
      </div>
    );
  }

  if (!brand) {
    return (
      <div className="min-h-screen bg-linear-to-br from-slate-950 via-blue-950 to-slate-950 flex items-center justify-center">
        <div className="text-center">
          <p className="text-white text-xl">Brand not found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-950 via-blue-950 to-slate-950 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        
        {/* Hero Section */}
        <div className="relative bg-linear-to-r from-blue-600/20 via-purple-600/20 to-pink-600/20 backdrop-blur-xl rounded-3xl overflow-hidden border border-white/20 shadow-2xl mb-8">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1556906781-9a412961c28c?w=1200')] opacity-5 bg-cover bg-center"></div>
          
          <div className="relative p-8 md:p-12">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              
              {/* Brand Logo Section */}
              <div className="flex justify-center md:justify-start">
                <div className="relative group">
                  <div className="absolute inset-0 bg-linear-to-r from-blue-500 to-purple-500 rounded-3xl blur-2xl opacity-50 group-hover:opacity-75 transition-opacity duration-500"></div>
                  <div className="relative bg-white rounded-3xl p-8 shadow-2xl transform group-hover:scale-105 transition-all duration-500">
                    <img 
                      src={brand?.image}
                      alt={brand?.name}
                      className="w-48 h-48 object-contain"
                    />
                  </div>
                </div>
              </div>

              {/* Brand Info Section */}
              <div className="text-center md:text-left space-y-4">
                <div className="flex items-center gap-3 justify-center md:justify-start">
                  <Award className="w-8 h-8 text-yellow-400 animate-pulse" />
                  <span className="text-blue-300 text-sm font-bold uppercase tracking-widest">
                    Premium Brand
                  </span>
                </div>
                
                <h1 className="text-6xl md:text-7xl font-bold text-white drop-shadow-2xl">
                  {brand?.name}
                </h1>
                
                <div className="flex items-center gap-3 text-blue-200 justify-center md:justify-start">
                  <Tag className="w-5 h-5" />
                  <span className="text-xl font-mono">/{brand?.slug}</span>
                </div>

                {/* Stats */}
                <div className="flex gap-4 justify-center md:justify-start pt-4">
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl px-4 py-2 border border-white/20">
                    <div className="flex items-center gap-2">
                      <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                      <span className="text-white font-bold">4.8</span>
                    </div>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl px-4 py-2 border border-white/20">
                    <div className="flex items-center gap-2">
                      <TrendingUp className="w-5 h-5 text-green-400" />
                      <span className="text-white font-bold">Trending</span>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 pt-4 justify-center md:justify-start">
                  <button 
                    onClick={() => setIsFavorite(!isFavorite)}
                    className={`p-3 rounded-xl transition-all duration-300 transform hover:scale-110 ${
                      isFavorite 
                        ? 'bg-red-500 text-white' 
                        : 'bg-white/10 backdrop-blur-sm text-white border border-white/20'
                    }`}
                  >
                    <Heart className={`w-6 h-6 ${isFavorite ? 'fill-white' : ''}`} />
                  </button>
                  <button className="p-3 rounded-xl bg-white/10 backdrop-blur-sm text-white border border-white/20 hover:bg-white/20 transition-all duration-300 transform hover:scale-110">
                    <Share2 className="w-6 h-6" />
                  </button>
                  <button className="flex-1 bg-linear-to-r from-blue-500 to-purple-500 text-white py-3 px-8 rounded-xl font-bold hover:shadow-lg hover:shadow-blue-500/50 transition-all duration-300 transform hover:scale-105">
                    View Products
                  </button>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* Details Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          
          {/* Brand ID Card */}
          <div className="bg-linear-to-br from-purple-500/20 to-pink-500/20 backdrop-blur-xl rounded-2xl p-6 border border-purple-300/30 hover:shadow-lg hover:shadow-purple-500/30 transition-all duration-300 transform hover:-translate-y-1">
            <div className="flex items-start justify-between mb-4">
              <div className="bg-purple-500/30 rounded-xl p-3">
                <Tag className="w-6 h-6 text-purple-200" />
              </div>
              <span className="text-xs text-purple-300 font-bold uppercase tracking-wider">
                Identifier
              </span>
            </div>
            <h3 className="text-sm text-purple-300 font-semibold mb-2 uppercase">Brand ID</h3>
            <p className="text-white font-mono text-xs break-all bg-black/20 rounded-lg p-3">
              {brand?._id}
            </p>
          </div>

          {/* Created Date Card */}
          <div className="bg-linear-to-br from-green-500/20 to-emerald-500/20 backdrop-blur-xl rounded-2xl p-6 border border-green-300/30 hover:shadow-lg hover:shadow-green-500/30 transition-all duration-300 transform hover:-translate-y-1">
            <div className="flex items-start justify-between mb-4">
              <div className="bg-green-500/30 rounded-xl p-3">
                <Calendar className="w-6 h-6 text-green-200" />
              </div>
              <span className="text-xs text-green-300 font-bold uppercase tracking-wider">
                Established
              </span>
            </div>
            <h3 className="text-sm text-green-300 font-semibold mb-2 uppercase">Created At</h3>
            <p className="text-white text-base font-semibold">
              {(brand?.createdAt)}
            </p>
          </div>

          {/* Updated Date Card */}
          <div className="bg-linear-to-br from-orange-500/20 to-amber-500/20 backdrop-blur-xl rounded-2xl p-6 border border-orange-300/30 hover:shadow-lg hover:shadow-orange-500/30 transition-all duration-300 transform hover:-translate-y-1">
            <div className="flex items-start justify-between mb-4">
              <div className="bg-orange-500/30 rounded-xl p-3">
                <Clock className="w-6 h-6 text-orange-200" />
              </div>
              <span className="text-xs text-orange-300 font-bold uppercase tracking-wider">
                Last Modified
              </span>
            </div>
            <h3 className="text-sm text-orange-300 font-semibold mb-2 uppercase">Updated At</h3>
            <p className="text-white text-base font-semibold">
              {(brand?.updatedAt)}
            </p>
          </div>

        </div>

        {/* Featured Products Section */}
        <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/10">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-3xl font-bold text-white mb-2">Featured Products</h2>
              <p className="text-blue-200">Discover popular items from {brand?.name}</p>
            </div>
            <button className="bg-linear-to-r from-blue-500 to-purple-500 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg hover:shadow-blue-500/50 transition-all duration-300">
              View All
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map(i => (
              <div 
                key={i}
                className="bg-white/5 backdrop-blur-sm rounded-2xl p-4 border border-white/10 hover:bg-white/10 transition-all duration-300 transform hover:-translate-y-2 cursor-pointer group"
              >
                <div className="bg-white/10 rounded-xl h-32 mb-3 flex items-center justify-center group-hover:bg-white/20 transition-colors">
                  <Sparkles className="w-8 h-8 text-blue-300" />
                </div>
                <h3 className="text-white font-semibold text-sm mb-1">Product {i}</h3>
                <p className="text-blue-200 text-xs">From {brand?.name}</p>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-white font-bold">$99.99</span>
                  <div className="flex items-center gap-1">
                    <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                    <span className="text-white text-xs">4.8</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Decorative Background Elements */}
      <div className="fixed top-20 left-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse pointer-events-none"></div>
      <div className="fixed bottom-20 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse pointer-events-none" style={{ animationDelay: '1s' }}></div>
    </div>
  );
}