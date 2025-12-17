import {
  Trash2,
  Plus,
  Minus,
  ShoppingBag,
  ArrowRight,
  Currency,
} from "lucide-react";
import { apiServices } from "@/apiServices/apiServices";
import Image from "next/image";
import { formatPrice } from "@/helpers/currenct";
import { Button } from "@/components";
import Link from "next/link";

export default async function ShopingCart() {
  // const updateQuantity = (id, change) => {
  //   ( I =>
  //     response.map(res =>
  //       res.id === id
  //         ? { ...res, quantity: Math.max(1, res.quantity + change) }
  //         : res
  //     )
  //   );
  // };

  // const removeItem = (id) => {
  //   rating(items => items.filter(item => item.id !== id));
  // };

  // const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  // const shipping = subtotal > 0 ? 10 : 0;
  // const tax = subtotal * 0.08;
  // const total = subtotal + shipping + tax;

  async function fetchCart() {
    const response = await apiServices.getUserCart();
    return response;
  }

  const response = await fetchCart();

  // response.data.products[0].product.

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 to-slate-100 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <ShoppingBag className="w-8 h-8 text-slate-700" />
          <h1 className="text-3xl font-bold text-slate-800">Shopping Cart</h1>
          <span className="ml-2 px-3 py-1 bg-slate-700 text-white text-sm font-semibold rounded-full">
            {response.numOfCartItems}{" "}
            {response.numOfCartItems === 1 ? "item" : "items"}
          </span>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            {response.numOfCartItems === 0 ? (
              <div className="bg-white rounded-2xl shadow-sm p-12 text-center">
                <ShoppingBag className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-slate-700 mb-2">
                  Your cart is empty
                </h3>
                <p className="text-slate-500">Add some items to get started!</p>
              </div>
            ) : (
              response.data.products.map((res) => (
                <div
                  key={res._id}
                  className="bg-white rounded-2xl shadow-sm p-6 hover:shadow-md transition-shadow duration-300"
                >
                  <div className="flex gap-6">
                    <div className="w-24 h-24 rounded-xl overflow-hidden bg-slate-100 shrink-0">
                      <Image
                        width={500}
                        height={500}
                        src={res.product.imageCover}
                        alt={res.product.title}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="text-lg font-semibold text-slate-800 mb-1">
                            {res.product.title}
                          </h3>
                          <div className="flex gap-4 text-sm text-slate-500">
                            <span> {res.product.brand.name}</span>
                            
                          </div>
                        </div>
                        <button
                          // onClick={() => removeItem(item.id)}
                          className="text-slate-400 hover:text-red-500 transition-colors p-2 hover:bg-red-50 rounded-lg"
                          aria-label="Remove item"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>

                      <div className="flex justify-between items-center mt-4">
                        <div className="flex items-center gap-3 bg-slate-100 rounded-lg p-1">
                          <button
                            // onClick={() => updateQuantity(item.id, -1)}
                            className="p-2 hover:bg-white rounded-md transition-colors"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-4 h-4 text-slate-600" />
                          </button>
                          <span className="w-8 text-center font-semibold text-slate-800">
                            {res.count}
                          </span>
                          <button
                            // onClick={() => updateQuantity(item.id, 1)}
                            className="p-2 hover:bg-white rounded-md transition-colors"
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-4 h-4 text-slate-600" />
                          </button>
                        </div>
                        <div className="text-right">
                          <div className="text-xl font-bold text-slate-800">
                            {formatPrice(res.price)}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
            <Button>
              <Trash2/>
              Clear Cart</Button>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-sm p-6 sticky top-8">
              <h2 className="text-xl font-bold text-slate-800 mb-6">
                Order Summary
              </h2>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-slate-600">
                  <span>Subtotal</span>
                  <span className="font-semibold">
                    ${response.data.totalCartPrice.toFixed(2)}
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
                      ${response.data.totalCartPrice.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>

              <Button
                // disabled={cartItems.length === 0}
                className="w-full  bg-slate-800 mb-3   text-white py-6 rounded-xl font-semibold hover:bg-slate-700 transition-colors disabled:bg-slate-300 disabled:cursor-not-allowed flex items-center justify-center gap-2 group"
              >
                Proceed to Checkout
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Link href={"/products"} className="mt-4">
                <Button
                  // disabled={cartItems.length === 0}
                  className="w-full  bg-slate-800 text-white py-6 rounded-xl font-semibold hover:bg-slate-700 transition-colors disabled:bg-slate-300 disabled:cursor-not-allowed flex items-center justify-center gap-2 group"
                >
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
    </div>
  );
}
