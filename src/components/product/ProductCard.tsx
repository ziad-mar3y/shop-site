"use client";

import Image from "next/image";
import Link from "next/link";
import { Product } from "@/interfaces";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Heart } from "lucide-react";
import { renderStars } from "@/helpers/rating";
// import AddToCartButon from "./addToCartButon";
import { useContext, useState } from "react";
import { formatPrice } from "@/helpers/currenct";
import AddToCartButon from "./AddToCartButoon";
import { apiServices } from "@/apiServices/apiServices";
import toast from "react-hot-toast";
// import AddToCartButon from "./AddToCartButoon";
// import { cartContext } from "@/Context/CartContext";

// using this interface here
interface ProductCardProps {
  product: Product;
  viewMode?: "grid" | "list";
}

export function ProductCard({ product, viewMode = "grid" }: ProductCardProps) {
  const [addTocartLoading, setAddToCartLoading] = useState<boolean>(false);
  // const { handleAddToCart } = useContext(cartContext);
 async function handleAddToCart() {
    setAddToCartLoading(true);
    const data = await apiServices.addProductToCart(product!._id);
    toast.success(data.message);
    setAddToCartLoading(false);
  }
 

  if (viewMode === "list") {
    return (
      <div className="flex  gap-4 p-4 border rounded-lg hover:shadow-md transition-shadow container mx-auto">
        <div className="relative w-32 h-32 shrink-0 ">
          <Image
            src={product.imageCover}
            alt={product.title}
            fill
            className="object-cover rounded-md"
            sizes="128px"
          />
        </div>

        <div className="flex-1 min-w-0  ">
          <div className="flex justify-between items-start mb-2">
            <h3 className="font-semibold text-lg line-clamp-2">
              <Link
                href={`/products/${product.id}`}
                className="hover:text-primary transition-colors"
              >
                {product.title}
              </Link>
            </h3>
            <Button variant="ghost" size="sm">
              <Heart className="h-4 w-4" />
            </Button>
          </div>

          <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
            {product.description}
          </p>

          <div className="flex items-start gap-4 mb-3 xs:flex-col">
            <div className="flex items-center gap-1">
              {renderStars(product.ratingsAverage)}
              <span className="text-sm text-muted-foreground ml-1">
                ({product.ratingsQuantity})
              </span>
            </div>

            <span className="text-sm text-muted-foreground ">
              {product.sold} sold
            </span>
          </div>

          <div className="flex items-start justify-between xs:flex-col">
            <div className="flex flex-col gap-1">
              <span className="text-2xl font-bold text-primary  ">
                {formatPrice(product.price)}
              </span>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <span>
                  Brand:{" "}
                  <Link
                    href={``}
                    className="hover:text-primary hover:underline transition-colors"
                  >
                    {product.brand.name}
                  </Link>
                </span>
                <span>
                  Category:{" "}
                  <Link
                    href={``}
                    className="hover:text-primary hover:underline transition-colors"
                  >
                    {product.category.name}
                  </Link>
                </span>
              </div>
            </div>

            <Button className="mt-3">
              <ShoppingCart className="h-4 w-4 mr-2" />
              Add to Cart
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="group relative flex flex-col justify-between bg-white border rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300">
      {/* Product Image */}
      <div className="p-3">
        <div className="relative aspect-square overflow-hidden">
          <Image
            src={product.imageCover}
            alt={product.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          />

          {/* Wishlist Button */}
          <Button
            variant="ghost"
            size="sm"
            className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity bg-white/80 hover:bg-white"
          >
            <Heart className="h-4 w-4" />
          </Button>

          {/* Badge for sold items */}
          {product.sold > 100 && (
            <div className="absolute top-2 left-2 bg-primary text-primary-foreground text-xs px-2 py-1 rounded">
              Popular
            </div>
          )}
        </div>

        {/* Product Info */}
        {/* Brand */}
        <p className="text-xs text-muted-foreground mb-1 uppercase tracking-wide">
          <Link
            href={``}
            className="hover:text-primary hover:underline transition-colors"
          >
            {product.brand.name}
          </Link>
        </p>

        {/* Title */}
        <h3 className="font-semibold text-sm mb-2 line-clamp-2 hover:text-primary transition-colors">
          <Link href={`/products/${product.id}`}>{product.title}</Link>
        </h3>

        {/* Rating */}
        <div className="flex items-center gap-1 mb-2">
          <div className="flex">{renderStars(product.ratingsAverage)}</div>
          <span className="text-xs text-muted-foreground">
            ({product.ratingsQuantity})
          </span>
        </div>

        {/* Category */}
        <p className="text-xs text-muted-foreground mb-2">
          <Link
            href={``}
            className="hover:text-primary hover:underline transition-colors"
          >
            {product.category.name}
          </Link>
        </p>

        {/* Price */}
        <div className="flex items-center justify-between mb-3">
          <span className="text-lg font-bold text-primary">
            {formatPrice(product.price)}
          </span>
          <span className="text-xs text-muted-foreground">
            {product.sold} sold
          </span>
        </div>
      </div>

      {/* Add to Cart Button */}
      <div className="p-4">
        <AddToCartButon
          addTocartLoading={addTocartLoading}
          handleAddToCart={handleAddToCart}
          productQuantity={product.quantity}
        />
      </div>
    </div>
  );
}
