import { useState, useCallback } from "react";
import { useSession } from "next-auth/react";
import { useWishlistContext } from "@/Contexts/wishlistContext";
import { apiServices } from "@/apiServices/apiServices";
import toast from "react-hot-toast";

interface UseWishlistToggleProps {
  productId: string;
}

export function useWishlistToggle({ productId }: UseWishlistToggleProps) {
  const [wishlistLoading, setWishlistLoading] = useState(false);
  const [optimisticInWishlist, setOptimisticInWishlist] = useState<boolean | null>(null);
  const { data: session } = useSession();
  const { wishlistItems, fetchWishlistCount } = useWishlistContext();

  // Check if product is in wishlist
  const isInWishlist = optimisticInWishlist !== null 
    ? optimisticInWishlist 
    : wishlistItems.some((item: any) => 
        item._id === productId || item.id === productId
      );

  // Toggle wishlist function
  const toggleWishlist = useCallback(async () => {
    if (!session) {
      toast.error("Please log in to manage wishlist");
      return;
    }

    try {
      // setWishlistLoading(true);
      
      // Update local state immediately for instant UI feedback
      setOptimisticInWishlist(!isInWishlist);
      
      const token = session?.token || (session as any)?.token;
      
      if (!token) {
        toast.error("Please log in again to manage wishlist");
        setOptimisticInWishlist(null);
        return;
      }

      if (isInWishlist) {
        // Remove from wishlist
        const res = await apiServices.removeFromWishlist(productId, token);
        console.log("Remove from wishlist response:", res);
        toast.success("Item removed from wishlist!");
      } else {
        // Add to wishlist
        const res = await apiServices.addToWishlist(productId, token);
        console.log("Add to wishlist response:", res);
        toast.success("Item added to wishlist!");
      }
      
      // Refresh wishlist count but DON'T reset optimistic state immediately
      // Let the wishlist context update naturally to avoid flickering
      fetchWishlistCount();
      
      // Small delay before resetting optimistic state to allow context to update
    
      
    } catch (error) {
      console.error("Error toggling wishlist:", error);
      toast.error(`Failed to ${isInWishlist ? 'remove from' : 'add to'} wishlist`);
      // Reset optimistic state on error
      setOptimisticInWishlist(null);
    } finally {
      // setWishlistLoading(false);
    }
  }, [session, isInWishlist, productId, fetchWishlistCount]);

  return {
    isInWishlist,
    wishlistLoading,
    toggleWishlist,
  };
}
