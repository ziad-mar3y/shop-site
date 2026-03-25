"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, Package, Truck, CheckCircle, X, RefreshCw } from "lucide-react";
import { Order } from "@/types/cashOnDelivery";
import { apiServices } from "@/apiServices/apiServices";

interface OrderTrackingProps {
  orderId: string;
  token: string | null;
  onClose: () => void;
}

export default function OrderTracking({ orderId, token, onClose }: OrderTrackingProps) {
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted || !token) return;
    
    fetchOrderDetails();
  }, [isMounted, token, orderId]);

  const fetchOrderDetails = async () => {
    try {
      console.log('Fetching order details for:', orderId);
      console.log('Token present:', token ? 'yes' : 'no');
      
      const response = await apiServices.getOrderById(orderId, token || undefined);
      console.log('Order tracking response:', response);
      
      if (response.status === 'success' || response.success) {
        setOrder(response.data);
        console.log('Order data set:', response.data);
      } else {
        console.error('Failed to fetch order:', response);
      }
    } catch (error) {
      console.error('Error fetching order details:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await fetchOrderDetails();
    setRefreshing(false);
  };

  const getTrackingSteps = (status: string) => {
    const steps = [
      { key: 'pending', label: 'Order Placed', completed: true, current: status === 'pending' },
      { key: 'processing', label: 'Processing', completed: ['processing', 'shipped', 'delivered'].includes(status), current: status === 'processing' },
      { key: 'shipped', label: 'Shipped', completed: ['shipped', 'delivered'].includes(status), current: status === 'shipped' },
      { key: 'delivered', label: 'Delivered', completed: status === 'delivered', current: status === 'delivered' }
    ];

    if (status === 'cancelled') {
      return [
        { key: 'pending', label: 'Order Placed', completed: true, current: false },
        { key: 'cancelled', label: 'Cancelled', completed: true, current: true }
      ];
    }

    return steps;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (!isMounted) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b p-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Truck className="w-6 h-6 text-blue-600" />
            <h2 className="text-xl font-bold text-slate-800">Track Your Order</h2>
          </div>
          <div className="flex items-center gap-2">
            <Button
              onClick={handleRefresh}
              variant="ghost"
              size="sm"
              disabled={refreshing}
            >
              <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />
            </Button>
            <Button onClick={onClose} variant="ghost" size="sm">
              <X size={20} />
            </Button>
          </div>
        </div>

        <div className="p-6">
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="w-8 h-8 animate-spin text-slate-400" />
              <span className="ml-2 text-slate-600">Loading order details...</span>
            </div>
          ) : order ? (
            <div className="space-y-6">
              {/* Order Header */}
              <div className="text-center py-4">
                <Package className="w-12 h-12 text-blue-600 mx-auto mb-3" />
                <h3 className="text-lg font-bold text-slate-800 mb-1">
                  Order #{order._id.slice(-8)}
                </h3>
                <p className="text-sm text-slate-600">
                  Placed on {formatDate(order.createdAt)}
                </p>
              </div>

              {/* Tracking Timeline */}
              <Card>
                <CardHeader>
                  <CardTitle>Order Status</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {getTrackingSteps(order.status || 'pending').map((step, index) => (
                      <div key={step.key} className="flex items-center gap-4">
                        <div className="flex flex-col items-center">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                            step.completed 
                              ? step.current 
                                ? 'bg-blue-600 text-white' 
                                : 'bg-green-600 text-white'
                              : 'bg-gray-200 text-gray-400'
                          }`}>
                            {step.completed ? (
                              <CheckCircle className="w-5 h-5" />
                            ) : (
                              <div className="w-2 h-2 bg-gray-400 rounded-full" />
                            )}
                          </div>
                          {index < getTrackingSteps(order.status || 'pending').length - 1 && (
                            <div className={`w-0.5 h-8 mt-2 ${
                              step.completed ? 'bg-green-600' : 'bg-gray-200'
                            }`} />
                          )}
                        </div>
                        <div className="flex-1">
                          <p className={`font-medium ${
                            step.current ? 'text-blue-600' : step.completed ? 'text-green-600' : 'text-gray-400'
                          }`}>
                            {step.label}
                          </p>
                          {step.current && (
                            <p className="text-sm text-slate-600 mt-1">
                              Your order is currently {step.label.toLowerCase()}
                            </p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Order Details */}
              <Card>
                <CardHeader>
                  <CardTitle>Order Details</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-slate-600">Total Amount</span>
                      <span className="font-semibold">EGP {order.totalOrderPrice || 0}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Payment Method</span>
                      <span className="font-semibold">Cash on Delivery</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Items</span>
                      <span className="font-semibold">{order.cartItems.length} products</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Delivery Address</span>
                      <span className="font-semibold text-right max-w-xs">
                        {order.shippingAddress?.details}, {order.shippingAddress?.city}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Items Preview */}
              <Card>
                <CardHeader>
                  <CardTitle>Items ({order.cartItems.length})</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {order.cartItems.slice(0, 3).map((item) => (
                      <div key={item._id} className="flex items-center gap-3 p-2 border rounded">
                        <div className="w-10 h-10 bg-slate-100 rounded flex items-center justify-center">
                          <Package className="w-5 h-5 text-slate-400" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-slate-800">{item.product.title}</p>
                          <p className="text-xs text-slate-600">Qty: {item.count}</p>
                        </div>
                        <p className="text-sm font-semibold">EGP {(item.price || 0) * (item.count || 0)}</p>
                      </div>
                    ))}
                    {order.cartItems.length > 3 && (
                      <p className="text-sm text-slate-600 text-center py-2">
                        +{order.cartItems.length - 3} more items
                      </p>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Action Button */}
              <Button
                onClick={onClose}
                className="w-full"
                variant="outline"
              >
                Close Tracking
              </Button>
            </div>
          ) : (
            <div className="text-center py-12">
              <Package className="w-12 h-12 text-slate-300 mx-auto mb-3" />
              <h3 className="text-lg font-medium text-slate-700 mb-2">
                Order Not Found
              </h3>
              <p className="text-slate-600">Unable to load order details</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
