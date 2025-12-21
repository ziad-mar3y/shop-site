"use client";
import { getCartResponse } from "@/interfaces";
import { ArrowRight, Loader2, ShoppingBag, Trash2 } from "lucide-react";
import CartProduct from "../../../components/product/CartProduct";
import { Button } from "../../../components/ui";
import Link from "next/link";
import { useState } from "react";
import { apiServices } from "@/apiServices/apiServices";
import toast from "react-hot-toast";

interface innerCartProps {
  cartData: getCartResponse;
  key: string;
}

export default function InnerCart({ cartData, key }: innerCartProps) {
  const [innerCartData, setInnerCartData] = useState<getCartResponse>(cartData);
  const [isCartRemoed, setIsCartRemoed] = useState(false);


  async function updateCart() {
    const newCartData = await apiServices.getUserCart();
    setInnerCartData(newCartData);
  }

  async function handleRemoveItem(
    productId: string,
    setIsProductRemoving: (vlaue: boolean) => void
  ) {
    setIsProductRemoving(true);
    const response = await apiServices.removeSingleProduct(productId);
    toast.success("product removed successfully");
    setIsProductRemoving(false);
    updateCart();
  }

  async function clearUserCart() {
    setIsCartRemoed(true);
    const response = await apiServices.clearCart();
    toast.success("Cart Removed successfully");
    updateCart();
    setIsCartRemoed(false);
  }

  async function handleUpdateProductCart(productId: string, count: number) {
    const response = await apiServices.updateCartProductCount(productId, count);
    updateCart();
  }

  return (
    <>
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <ShoppingBag className="w-8 h-8 text-slate-700" />
          <h1 className="text-3xl font-bold text-slate-800">Shopping Cart</h1>
          <span className="ml-2 px-3 py-1 bg-slate-700 text-white text-sm font-semibold rounded-full">
            {innerCartData.numOfCartItems}{" "}
            {innerCartData.numOfCartItems === 1 ? "item" : "items"}
          </span>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            {innerCartData.numOfCartItems === 0 ? (
              <div className="bg-white rounded-2xl shadow-sm p-12 text-center">
                <ShoppingBag className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-slate-700 mb-2">
                  Your cart is empty
                </h3>
                <p className="text-slate-500">Add some items to get started!</p>
              </div>
            ) : (
              innerCartData.data.products.map((item) => (
                <CartProduct
                  item={item}
                  handleRemoveItem={handleRemoveItem}
                  handleUpdateProductCart={handleUpdateProductCart}
                />
              ))
            )}
            {innerCartData.data.products.length > 0 && (
              <Button disabled={isCartRemoed} onClick={clearUserCart}>
                Clear Cart
                {isCartRemoed ? (
                  <Loader2 className="animate-spin" />
                ) : (
                  <Trash2 />
                )}
              </Button>
            )}
          </div>

          <div className="lg:col-span-1  xs:w-xs">
            <div className="bg-white rounded-2xl shadow-sm p-6 sticky top-8">
              <h2 className="text-xl font-bold text-slate-800 mb-6">
                Order Summary
              </h2>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-slate-600">
                  <span>Subtotal</span>
                  <span className="font-semibold">
                    ${innerCartData.data.totalCartPrice.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Shipping</span>
                  <span className="font-semibold">{"Free"}</span>
                </div>

                <div className="border-t border-slate-200 pt-4">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-bold text-slate-800">
                      Total
                    </span>
                    <span className="text-2xl font-bold text-slate-800">
                      ${innerCartData.data.totalCartPrice.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>

              <Button
                disabled={innerCartData.data.products.length === 0}
                className="w-full  bg-slate-800 mb-3   text-white py-6 rounded-xl font-semibold hover:bg-slate-700 transition-colors disabled:bg-slate-300 disabled:cursor-not-allowed flex items-center justify-center gap-2 group"
              >
                Proceed to Checkout
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Link href={"/products"} className="mt-4">
                <Button className="w-full  bg-slate-800 text-white py-6 rounded-xl font-semibold hover:bg-slate-700 transition-colors disabled:bg-slate-300 disabled:cursor-not-allowed flex items-center justify-center gap-2 group">
                  Continue Shopping
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>

              <div className="mt-6 p-4 bg-green-50 rounded-xl">
                <p className="text-sm text-green-800 text-center">
                  🎉 Free shipping on orders over $100!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
