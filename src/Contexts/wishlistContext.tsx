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
  const [serverErrorCount, setServerErrorCount] = useState(0);
  const { data: session } = useSession();

 const fetchWishlistCount = async () => {
  if (!session) {
    setWishlistCount(0);
    setWishlistItems([]);
    return;
  }

  if (serverErrorCount >= 3) {
    console.log("Circuit breaker active");
    return;
  }

  const token = (session as any)?.token;
  if (!token) return;

  setIsLoading(true);

  try {
    const res = await apiServices.getWishlist(token);
    console.log(res);
    
    const items = Array.isArray(res?.data)
      ? res.data
      : Array.isArray(res)
      ? res
      : [];

    setWishlistItems(items);
    setWishlistCount(items.length);

    setServerErrorCount(0);
  } catch (error: any) {
    setWishlistItems([]);
    setWishlistCount(0);
    setServerErrorCount(prev => prev + 1);

    if (!error?.message?.includes("500")) {
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
    if (session?.token) {
      fetchWishlistCount();
    }
  }, [session?.token]);

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
