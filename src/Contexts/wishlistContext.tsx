"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useSession } from "next-auth/react";
import { apiServices } from "@/apiServices/apiServices";

interface WishlistContextType {
  wishlistCount: number;
  isLoading: boolean;
  fetchWishlistCount: () => Promise<void>;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [wishlistCount, setWishlistCount] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { data: session } = useSession();

  const fetchWishlistCount = async () => {
    if (!session) {
      setWishlistCount(0);
      return;
    }

    try {
      setIsLoading(true);
      const token = session?.token || (session as any)?.token;
      
      if (!token) {
        setWishlistCount(0);
        return;
      }

      const res = await apiServices.getWishlist(token);
      console.log("Wishlist count response:", res);
      
      if (res && res.data && Array.isArray(res.data)) {
        setWishlistCount(res.data.length);
      } else if (res && Array.isArray(res)) {
        setWishlistCount(res.length);
      } else {
        setWishlistCount(0);
      }
    } catch (error) {
      console.error("Error fetching wishlist count:", error);
      setWishlistCount(0);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (session) {
      fetchWishlistCount();
    }
  }, [session]);

  return (
    <WishlistContext.Provider value={{ wishlistCount, isLoading, fetchWishlistCount }}>
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
