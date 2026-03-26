"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { apiServices } from "@/apiServices/apiServices";
import toast from "react-hot-toast";
import { Heart, ShoppingCart, Trash2, Loader2 } from "lucide-react";
import { useWishlistContext } from "@/Contexts/wishlistContext";
import { useContext } from "react";
import { cartContext } from "@/Contexts/cartContext";
import AddToCartButon from "@/components/product/AddToCartButoon";

type WishlistItem = {
    _id: string;
    id: string;
    title: string;
    price: number;
    images: string[];
    description?: string;
    imageCover: string;
    brand: {
        _id: string;
        name: string;
    };
    category: {
        _id: string;
        name: string;
    };
    sold: number;
    ratingsAverage: number;
    ratingsQuantity: number;
    quantity: number;
};

export default function WishlistPage() {
    const { data, status } = useSession();
    const router = useRouter();
    const [wishlist, setWishlist] = useState<WishlistItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [addToCartLoading, setAddToCartLoading] = useState<string | null>(null);
    const { fetchWishlistCount } = useWishlistContext();
    const { setCartCount } = useContext(cartContext);

    // -------------------------
    // AUTHENTICATION PROTECTION
    // -------------------------
    useEffect(() => {
        if (status === "unauthenticated") {
            toast.error("Please log in to access your wishlist");
            router.push("/auth/login");
        }
    }, [status, router]);

    // -------------------------
    // GET WISHLIST
    // -------------------------
    const fetchWishlist = async () => {
        try {
            setLoading(true);
            const token = data?.token || (data as any)?.token;

            if (!token) {
                console.error("No authentication token found for wishlist");
                setWishlist([]);
                return;
            }

            const res = await apiServices.getWishlist(token);
            console.log("Wishlist API response:", res);

            if (res && res.data && Array.isArray(res.data)) {
                // Filter out any items without proper product data
                const validItems = res.data.filter((item: WishlistItem) =>
                    item &&
                    item._id &&
                    item.title &&
                    item.price
                );
                setWishlist(validItems);
            } else if (res && Array.isArray(res)) {
                // Filter out any items without proper product data
                const validItems = res.filter((item: WishlistItem) =>
                    item &&
                    item._id &&
                    item.title &&
                    item.price
                );
                setWishlist(validItems);
            } else {
                console.log("No wishlist data found or unexpected format");
                setWishlist([]);
            }
        } catch (err) {
            console.error("Error fetching wishlist:", err);
            setWishlist([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (status === "authenticated") {
            fetchWishlist();
        }
    }, [status]);

    // -------------------------
    // REMOVE FROM WISHLIST
    // -------------------------
    const removeFromWishlist = async (productId: string) => {
        if (!productId) {
            console.error("No product ID provided for removal");
            return;
        }

        try {
            const token = data?.token || (data as any)?.token;

            if (!token) {
                toast.error("Please log in again to remove items");
                return;
            }

            // Remove from local state immediately for instant UI feedback
            setWishlist((prev) =>
                prev.filter((item) => item._id !== productId)
            );

            // Call API in background
            const res = await apiServices.removeFromWishlist(productId, token);
            console.log("Remove from wishlist response:", res);

            toast.success("Item removed from wishlist");

            // Refresh wishlist count
            fetchWishlistCount();

        } catch (error) {
            console.error("Error removing from wishlist:", error);
            toast.error("Failed to remove item from wishlist");

            // If API fails, refetch to restore correct state
            setTimeout(() => {
                fetchWishlist();
            }, 500);
        }
    };

    // -------------------------
    // ADD TO CART
    // -------------------------
    const addToCart = async (productId: string) => {
        if (!productId) {
            console.error("No product ID provided for cart");
            return;
        }

        try {
            setAddToCartLoading(productId);
            const token = data?.token || (data as any)?.token;

            if (!token) {
                toast.error("Please log in again to add items to cart");
                return;
            }

            const res = await apiServices.addProductToCart(productId, token);
            console.log("Add to cart response:", res);
            console.log(res);

            // Update cart count in context
            if (res && res.numOfCartItems !== undefined) {
                setCartCount(res.numOfCartItems);
            }

            toast.success("Item added to cart");

        } catch (error) {
            console.error("Error adding to cart:", error);
            toast.error("Failed to add item to cart");
        } finally {
            setAddToCartLoading(null);
        }
    };

    if (status === "loading") {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Loader2 className="animate-spin" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
            <div className="container mx-auto px-4 py-8">

                {/* HEADER */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-slate-900 mb-2">
                        My Wishlist
                    </h1>
                    <p className="text-slate-600">
                        Items you've saved for later
                    </p>
                </div>

                {/* CONTENT */}
                {loading ? (
                    <div className="flex items-center justify-center py-20">
                        <Loader2 className="animate-spin" />
                    </div>
                ) : wishlist.length === 0 ? (
                    <div className="text-center py-20">
                        <Heart className="mx-auto mb-4 text-slate-300 size-16" />
                        <h3 className="text-xl font-semibold text-slate-900 mb-2">
                            Your wishlist is empty
                        </h3>
                        <p className="text-slate-600 mb-6">
                            Start adding items you love to see them here
                        </p>
                        <Link href="/products">
                            <Button className="rounded-full">
                                Continue Shopping
                            </Button>
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {wishlist.map((item) => {
                            // Safety checks
                            if (!item || !item._id || !item.title) {
                                console.warn("Invalid wishlist item found:", item);
                                return null;
                            }

                            return (
                                <div
                                    key={item._id}
                                    className="bg-white border border-slate-200 rounded-2xl overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                                >
                                    {/* PRODUCT IMAGE */}
                                    <div className="relative aspect-square">
                                        <Link href={`/products/${item._id}`}>
                                            {item.imageCover ? (
                                                <Image
                                                    src={item.imageCover}
                                                    alt={item.title}
                                                    fill
                                                    className="object-cover"
                                                />
                                            ) : item.images && item.images[0] ? (
                                                <Image
                                                    src={item.images[0]}
                                                    alt={item.title}
                                                    fill
                                                    className="object-cover"
                                                />
                                            ) : (
                                                <div className="w-full h-full bg-slate-100 flex items-center justify-center">
                                                    <Heart className="text-slate-300 size-8" />
                                                </div>
                                            )}
                                        </Link>

                                        {/* REMOVE BUTTON */}
                                        <button
                                            onClick={() => removeFromWishlist(item._id)}
                                            className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-md hover:bg-red-50 hover:text-red-500 transition-colors"
                                        >
                                            <Trash2 className="size-4" />
                                        </button>
                                    </div>

                                    {/* PRODUCT INFO */}
                                    <div className="p-4">
                                        <Link href={`/products/${item._id}`}>
                                            <h3 className="font-semibold text-slate-900 mb-2 line-clamp-2 hover:text-indigo-600 transition-colors">
                                                {item.title?.split(' ').slice(0, 3).join(' ')}
                                            </h3>
                                        </Link>

                                        <p className="text-sm text-slate-600 mb-3 line-clamp-2">
                                            {item.description || 'Product description'}
                                        </p>

                                        <div className="flex items-center justify-between">
                                            <span className="text-lg font-bold text-slate-900">
                                                ${item.price}
                                            </span>

                                          <AddToCartButon 
                                                productQuantity={item.quantity}
                                                addTocartLoading={addToCartLoading === item._id}
                                                handleAddToCart={() => addToCart(item._id)}
                                            />
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
}

