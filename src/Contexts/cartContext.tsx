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
  const [cartCount, setCartCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  async function handleAddToCart(
    productId: string,
    setAddToCartLoading: React.Dispatch<React.SetStateAction<boolean>>
  ) {
    setAddToCartLoading(true);
    const data = await apiServices.addProductToCart(productId);
    setCartCount(data.numOfCartItems);
    toast.success(data.message);
    setAddToCartLoading(false);
  }

   async function handleUpdateProductCart(productId: string, count: number , updateCart: ()=>Promise<void> ){
    const response = await apiServices.updateCartProductCount(productId, count);    
    updateCart();
  }

  

  async function GetCart() {
    setIsLoading(true);
    const response = await apiServices.getUserCart();
    setCartCount(response.numOfCartItems);
    setIsLoading(false);
  }

  useEffect(() => {
    GetCart();
  }, []);

  return (
    <cartContext.Provider
      value={{ cartCount, setCartCount, isLoading, handleAddToCart ,handleUpdateProductCart }}
    >
      {children}
    </cartContext.Provider>
  );
}
