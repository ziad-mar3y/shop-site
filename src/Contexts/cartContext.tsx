"use client";
import { apiServices } from "@/apiServices/apiServices";
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";

type HandleAddToCart = (
  productId: string,
  setAddToCartLoading: React.Dispatch<React.SetStateAction<boolean>>
) => Promise<void>;

type HandleUpdateProductCart = (
  productId: string,
  count: number,
  updateCart: () => Promise<void>
) => Promise<void>;

export const cartContext = createContext<{
  cartCount: number;
  setCartCount: Dispatch<SetStateAction<number>>;
  isLoading: boolean;
  handleAddToCart: HandleAddToCart;
  handleUpdateProductCart: HandleUpdateProductCart
}>({
  cartCount: 0,
  setCartCount: () => {},
  isLoading: true,
  handleAddToCart: async () => {},
  handleUpdateProductCart : async () => {}
});

export default function CartContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const { data: session, status } = useSession();
  const token = session?.token ?? null;
  const [cartCount, setCartCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  async function handleAddToCart(
    productId: string,
    setAddToCartLoading: React.Dispatch<React.SetStateAction<boolean>>
  ) {
    // Check if user is authenticated
    if (!token || status !== "authenticated") {
      toast.error("Please login to add products to cart");
      return;
    }
    
    setAddToCartLoading(true);
    const data = await apiServices.addProductToCart(productId, token);
    setCartCount(data.numOfCartItems);
    toast.success(data.message);
    setAddToCartLoading(false);
  }

   async function handleUpdateProductCart(productId: string, count: number , updateCart: ()=>Promise<void> ){
    // Check if user is authenticated
    if (!token || status !== "authenticated") {
      toast.error("Please login to update cart");
      return;
    }
    
    try {
      const response = await apiServices.updateCartProductCount(productId, count, token);
      toast.success("Cart updated successfully");
      updateCart();
    } catch (error) {
      console.error('Error updating cart:', error);
      toast.error("Failed to update cart");
      // Revert the count by calling updateCart to get fresh data
      updateCart();
    }
  }

  async function GetCart() {
    if (status === "loading") return;
    if (!token || status === "unauthenticated") {
      setCartCount(0);
      setIsLoading(false);
      return;
    }
    setIsLoading(true);
    try {
      const response = await apiServices.getUserCart(token);
      console.log(response);
      
      setCartCount(response.numOfCartItems);
    } catch (error) {
      console.error('Error fetching cart:', error);
      // Set cart count to 0 on error to prevent app crash
      setCartCount(0);
      // Don't show toast for every error to avoid spamming user
      if (error instanceof Error && !error.message.includes('500')) {
        toast.error("Failed to load cart data");
      }
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    GetCart();
  }, [status, token]);

  return (
    <cartContext.Provider
      value={{ cartCount, setCartCount, isLoading, handleAddToCart ,handleUpdateProductCart }}
    >
      {children}
    </cartContext.Provider>
  );
}
