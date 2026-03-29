"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useSession } from "next-auth/react";
import { apiServices } from "@/apiServices/apiServices";
import toast from "react-hot-toast";

interface WishlistContextType {
  wishlistCount: number;
  wishlistItems: any[];
  isLoading: boolean;
  fetchWishlistCount: () => Promise<void>;
  fetchWishlistItems: () => Promise<void>;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [wishlistCount, setWishlistCount] = useState<number>(0);
  const [wishlistItems, setWishlistItems] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { data: session } = useSession();

  const fetchWishlistCount = async () => {
    if (!session) {
      setWishlistCount(0);
      setWishlistItems([]);
      return;
    }

    try {
      setIsLoading(true);
      const token = session?.token || (session as any)?.token;
      
      if (!token) {
        setWishlistCount(0);
        setWishlistItems([]);
        return;
      }

      const res = await apiServices.getWishlist(token);
      console.log("Wishlist count response:", res);
      
      let items = [];
      if (res && res.data && Array.isArray(res.data)) {
        items = res.data;
        setWishlistCount(res.data.length);
      } else if (res && Array.isArray(res)) {
        items = res;
        setWishlistCount(res.length);
      } else {
        setWishlistCount(0);
      }
      setWishlistItems(items);
    } catch (error) {
      console.error("Error fetching wishlist count:", error);
      setWishlistCount(0);
      setWishlistItems([]);
      // Don't show toast for 500 errors to avoid spamming user during server issues
      if (error instanceof Error && !error.message.includes('500')) {
        toast.error("Failed to load wishlist data");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const fetchWishlistItems = async () => {
    await fetchWishlistCount();
  };

  useEffect(() => {
    if (session) {
      fetchWishlistCount();
    }
  }, [session]);

  return (
    <WishlistContext.Provider value={{ wishlistCount, wishlistItems, isLoading, fetchWishlistCount, fetchWishlistItems }}>
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlistContext() {
  const context = useContext(WishlistContext);
  if (context === undefined) {
    throw new Error("useWishlistContext must be used within a WishlistProvider");
  }
  return context;
}
