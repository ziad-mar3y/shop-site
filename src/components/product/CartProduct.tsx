"use client";
import { Loader2, Minus, Plus, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui";
import { formatPrice } from "@/helpers/currenct";
import { CartProduct as CartProduct1, Product2 } from "@/interfaces";
import { useState } from "react";

interface cartProductProps {
  item: CartProduct1<Product2>;
  handleRemoveItem: (
    productId: string,
    setIsProductRemoving: (value: boolean) => void
  ) => void;
  handleUpdateProductCart: (productId: string, count: number) => Promise<void>;
}

export default function CartProduct({
  item,
  handleRemoveItem,
  handleUpdateProductCart,
}: cartProductProps) {
  const [isProductRemoving, setIsProductRemoving] = useState(false);
  const [productCount, setProductCount] = useState(item.count);
  const [timeOutId, setTimeOutId] = useState<NodeJS.Timeout >()

  async function handleUpdatingCount(count: number) {
    setProductCount(count);
    clearTimeout(timeOutId)
   const id = setTimeout(() => {
      handleUpdateProductCart(item.product._id, count);
    }, 800);
    setTimeOutId(id)
  }

  return (
    <div
      key={item._id}
      className="bg-white rounded-2xl shadow-sm p-6 hover:shadow-md transition-shadow duration-300 "
    >
      <div className="flex gap-6">
        <div className="w-24 h-24 rounded-xl overflow-hidden bg-slate-100 shrink-0">
          <Image
            width={500}
            height={500}
            src={item.product.imageCover}
            alt={item.product.title}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="flex-1 min-w-0 ">
          <div className="flex justify-between items-start mb-2">
            <div>
              <Link href={`/products/${item.product._id}`}>
                {" "}
                <h3 className="text-lg font-semibold text-slate-800 mb-1">
                  {item.product.title}
                </h3>
              </Link>
              <div className="flex gap-4 text-sm text-slate-500">
                <span> {item.product.brand.name}</span>
              </div>
            </div>
            <Button
              onClick={() =>
                handleRemoveItem(item.product._id, setIsProductRemoving)
              }
              className="text-slate-400 bg-white  hover:text-red-500 transition-colors p-2 hover:bg-red-50 rounded-lg"
              aria-label="Remove item"
            >
              {isProductRemoving ? (
                <Loader2 className="animate-spin" />
              ) : (
                <Trash2 className="w-5 h-5" />
              )}
            </Button>
          </div>

          <div className="flex justify-between items-center mt-4 flex-wrap">
            <div className="flex items-center gap-3 bg-slate-100 rounded-lg p-1">
              <Button
                disabled={item.count == 1}
                onClick={() => handleUpdatingCount(productCount - 1)}
                className="p-2 hover:bg-white rounded-md transition-colors bg-white"
                aria-label="Decrease quantity"
              >
                <Minus className="w-4 h-4 text-slate-600 " />
              </Button>
              <span className="w-8 text-center font-semibold text-slate-800">
                {productCount}
              </span>
              <Button
                disabled={item.count === item.product.quantity}
                onClick={() => handleUpdatingCount(productCount + 1)}
                className="p-2 hover:bg-white rounded-md transition-colors bg-white"
                aria-label="Increase quantity"
              >
                <Plus className="w-4 h-4 text-slate-600 " />
              </Button>
            </div>
            <div className="text-right">
              <div className="text-xl font-bold text-slate-800">
                {formatPrice(item.price)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
