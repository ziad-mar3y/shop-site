"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2, Package, X } from "lucide-react";
import { Order } from "@/types/cashOnDelivery";
import { apiServices } from "@/apiServices/apiServices";

interface OrderHistoryProps {
  userId: string;
  token: string | null;
  onClose: () => void;
}

export default function OrderHistory({ userId, token, onClose }: OrderHistoryProps) {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted || !token) return;
    fetchUserOrders();
  }, [isMounted, token, userId]);

  const fetchUserOrders = async () => {
    try {
      const response = await apiServices.getUserOrders(userId, token || undefined);
      if (response.status === "success" || response.success) {
        setOrders(response.data || []);
      }
    } catch (error) {
      console.error("Error fetching user orders:", error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusStyles = (status: string) => {
    switch (status) {
      case "pending": return "bg-yellow-100 text-yellow-700";
      case "processing": return "bg-blue-100 text-blue-700";
      case "shipped": return "bg-purple-100 text-purple-700";
      case "delivered": return "bg-green-100 text-green-700";
      case "cancelled": return "bg-red-100 text-red-700";
      default: return "bg-gray-100 text-gray-700";
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  if (!isMounted) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
      <div className="w-full max-w-5xl max-h-[90vh] overflow-hidden rounded-3xl bg-white shadow-2xl animate-in fade-in zoom-in-95">

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b bg-white/80 backdrop-blur">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-blue-50">
              <Package className="w-5 h-5 text-blue-600" />
            </div>
            <h2 className="text-lg font-semibold text-slate-800">Order History</h2>
          </div>

          <Button onClick={onClose} variant="ghost" size="icon" className="rounded-full">
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[75vh]">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-16 gap-3">
              <Loader2 className="w-8 h-8 animate-spin text-slate-400" />
              <p className="text-slate-500">Loading your orders...</p>
            </div>
          ) : orders.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <Package className="w-14 h-14 text-slate-300 mb-4" />
              <h3 className="text-lg font-medium text-slate-700">No orders yet</h3>
              <p className="text-sm text-slate-500">Start shopping to see your orders here</p>
            </div>
          ) : (
            <div className="space-y-5">
              {orders.map((order) => (
                <Card key={order._id} className="rounded-2xl border hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-5 space-y-4">

                    {/* Top */}
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-semibold text-slate-800">
                          Order #{order._id.slice(-6)}
                        </p>
                        <p className="text-xs text-slate-500">
                          {formatDate(order.createdAt)}
                        </p>
                      </div>

                      <span className={`px-3 py-1 text-xs rounded-full font-medium ${getStatusStyles(order.status || "pending")}`}>
                        {order.status}
                      </span>
                    </div>

                    {/* Items */}
                    <div className="space-y-2">
                      {order.cartItems.slice(0, 2).map((item) => (
                        <div key={item._id} className="flex items-center justify-between bg-slate-50 rounded-lg px-3 py-2">
                          <div>
                            <p className="text-sm font-medium text-slate-700 line-clamp-1">
                              {item.product.title}
                            </p>
                            <p className="text-xs text-slate-500">Qty: {item.count}</p>
                          </div>
                          <p className="text-sm font-semibold">
                            EGP {(item.price || 0) * (item.count || 0)}
                          </p>
                        </div>
                      ))}

                      {order.cartItems.length > 2 && (
                        <p className="text-xs text-center text-slate-400">
                          +{order.cartItems.length - 2} more items
                        </p>
                      )}
                    </div>

                    {/* Bottom */}
                    <div className="flex justify-between items-center pt-3 border-t">
                      <div className="text-sm text-slate-500">
                        {order.shippingAddress?.details}
                      </div>

                      <div className="text-right">
                        <p className="text-xs text-slate-500">Total</p>
                        <p className="font-bold text-slate-800">
                          EGP {order.totalOrderPrice || 0}
                        </p>
                      </div>
                    </div>

                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {/* Footer */}
          <div className="pt-6 mt-6 border-t">
            <Button onClick={onClose} className="w-full rounded-xl">
              Close
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
