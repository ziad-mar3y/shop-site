// 'use client'
// import { apiServices } from "@/apiServices/apiServices";
// import React, {  ReactNode, useEffect, useState } from "react";
// import { createContext } from "react";
// import toast from "react-hot-toast";


// type CartContextType = {
//   cartCount?: number;
//   setCartCount?: React.Dispatch<React.SetStateAction<number>>;
//   isLoading?: boolean;
//   handleAddToCart?: (productId: string, setAddToCartLoading: any) => Promise<void>
// }

// export const cartContext = createContext<CartContextType>({})




// // export const cartContext = createContext(0)

// export default function CartContextProcider({ children }: { children: ReactNode }) {

//   const [cartCount, setCartCount] = useState(0)
//   const [isLoading, setIsLoading] = useState(false)

//   async function getCart() {
//     setIsLoading(true)
//     const response = await apiServices.getUserCart()
//     setCartCount(response.numOfCartItems)
//     setIsLoading(false)
//   }

  
// async function handleAddToCart(productId: string, setAddToCartLoading: any) {
//   setAddToCartLoading(true)
//   const data = await apiServices.addProductToCart(productId)
//   setCartCount(data.numOfCartItems)
//   toast.success(data.message);
//   setAddToCartLoading(false)
// }

//   useEffect(() => {
//     getCart()
//   }, [])

//   return (
//     <cartContext.Provider value={{ cartCount, setCartCount, isLoading, handleAddToCart }}>
//       {children}
//     </cartContext.Provider>
//   )


// }