"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, Package, Calendar, Truck, RefreshCw } from "lucide-react";
import { Order } from "@/types/cashOnDelivery";
import { apiServices } from "@/apiServices/apiServices";
import { OrderHistory } from "@/components/Cart";

export default function OrdersPage() {
  console.log('=== OrdersPage component mounted ===');
  
  const { data: session } = useSession();
  const token = session?.token ?? null;
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isMounted, setIsMounted] = useState(false);

  console.log('Initial session:', session);
  console.log('Initial token:', token);

  useEffect(() => {
    console.log('=== isMounted effect triggered ===');
    setIsMounted(true);
  }, []);

  useEffect(() => {
    console.log('=== fetchUserOrders effect triggered ===');
    console.log('isMounted:', isMounted);
    console.log('token:', token);
    
    if (!isMounted || !token) {
      console.log('=== Returning early - not mounted or no token ===');
      return;
    }
    
    fetchUserOrders();
  }, [isMounted, token]);

  const fetchUserOrders = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Debug the session structure
      console.log('Full session object:', session);
      console.log('Session user:', session?.user);
      
      // Try different ways to get user ID
      let userId = null;
      if (session?.user) {
        userId = (session.user as any)?.id || 
                  (session.user as any)?._id || 
                  (session.user as any)?.sub ||
                  (session.user as any)?.email; // Use email as fallback
      }
      
      // If still no user ID, use email as unique identifier
      if (!userId) {
        console.log('No user ID found, using email as identifier');
        userId = session?.user ? (session.user as any)?.email || 'unknown' : 'unknown';
      }
      
      console.log('Final userId:', userId);
      
      const response = await apiServices.getUserOrders(userId, token || undefined);
      
      if (response) {
        console.log('Full API response:', response);
        
        // Check different possible success indicators
        if (response.status === 'success' || 
            response.success === true || 
            response.results || 
            response.data) {
          setOrders(response.data || response.results || []);
        } else {
          console.error('API response structure:', response);
          setError('Failed to load orders: ' + (response.message || 'Unknown error'));
        }
      } else {
        console.error('No response received from API');
        setError('No response from server');
      }
    } catch (error) {
      console.error('Error fetching user orders:', error);
      setError('An error occurred while loading orders');
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string | undefined) => {
    switch (status) {
      case 'pending': return 'text-yellow-600 bg-yellow-50';
      case 'processing': return 'text-blue-600 bg-blue-50';
      case 'shipped': return 'text-purple-600 bg-purple-50';
      case 'delivered': return 'text-green-600 bg-green-50';
      case 'cancelled': return 'text-red-600 bg-red-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (!isMounted) {
    return (
      <div className="max-w-6xl mx-auto p-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-800 mb-2">My Orders</h1>
          <p className="text-slate-600">
            Track and manage all your orders in one place
          </p>
        </div>
        <div className="flex items-center justify-center">
          <Loader2 className="w-8 h-8 animate-spin text-slate-400" />
          <span className="ml-2 text-slate-600">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-800 mb-2">My Orders</h1>
        <p className="text-slate-600">
          Track and manage all your orders in one place
        </p>
      </div>

      {/* Header with Refresh */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Package className="w-6 h-6 text-blue-600" />
          <h2 className="text-xl font-semibold text-slate-800">
            Order History ({orders.length})
          </h2>
        </div>
        <Button
          onClick={fetchUserOrders}
          variant="outline"
          disabled={loading}
          className="flex items-center gap-2"
        >
          <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          Refresh
        </Button>
      </div>

      {/* Error State */}
      {error && (
        <Card className="mb-6 border-red-200 bg-red-50">
          <CardContent className="p-4">
            <p className="text-red-600">{error}</p>
          </CardContent>
        </Card>
      )}

      {/* Loading State */}
      {loading && !error && (
        <Card>
          <CardContent className="p-12">
            <div className="flex items-center justify-center">
              <Loader2 className="w-8 h-8 animate-spin text-slate-400" />
              <span className="ml-2 text-slate-600">Loading your orders...</span>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Empty State */}
      {!loading && !error && orders.length === 0 && (
        <Card>
          <CardContent className="p-12">
            <div className="text-center">
              <Package className="w-16 h-16 text-slate-300 mx-auto mb-4" />
              <h3 className="text-xl font-medium text-slate-700 mb-2">
                No orders yet
              </h3>
              <p className="text-slate-600 mb-6">
                You haven't placed any orders yet. Start shopping to see your orders here!
              </p>
              <Button className="bg-blue-600 hover:bg-blue-700">
                Start Shopping
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Orders List */}
      {!loading && !error && orders && orders.length > 0 && (
            <div className="space-y-6">
              {orders.map((order) => (
                <Card key={order._id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                          <Package className="w-6 h-6 text-blue-600" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-slate-800">
                            Order #{order._id ? order._id.slice(-8) : 'Unknown'}
                          </h3>
                          <div className="flex items-center gap-4 text-sm text-slate-600">
                            <span className="flex items-center gap-1">
                              <Calendar className="w-4 h-4" />
                              {formatDate(order.createdAt)}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                          {order.status ? order.status.charAt(0).toUpperCase() + order.status.slice(1) : 'Unknown'}
                        </span>
                      </div>
                    </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Order Items */}
                  <div className="lg:col-span-2">
                    <h4 className="font-medium text-slate-800 mb-4">Order Items</h4>
                    <div className="space-y-3">
                      {order.cartItems ? (
                        <>
                          {order.cartItems.slice(0, 4).map((item) => (
                            <div key={item._id} className="flex items-center gap-4 p-3 border rounded-lg">
                              <div className="w-12 h-12 bg-slate-100 rounded-lg flex items-center justify-center">
                                {item.product.imageCover ? (
                                  <img 
                                    src={item.product.imageCover} 
                                    alt={item.product.title}
                                    className="w-full h-full object-cover rounded-lg"
                                  />
                                ) : (
                                  <Package className="w-6 h-6 text-slate-400" />
                                )}
                              </div>
                              <div className="flex-1">
                                <p className="font-medium text-slate-800">{item.product.title}</p>
                                <p className="text-sm text-slate-600">Quantity: {item.count}</p>
                              </div>
                              <div className="text-right">
                                <p className="font-semibold text-slate-800">
                                  EGP {(item.price || 0) * (item.count || 0)}
                                </p>
                                <p className="text-sm text-slate-600">EGP {item.price || 0} each</p>
                              </div>
                            </div>
                          ))}
                          {order.cartItems.length > 4 && (
                            <p className="text-sm text-slate-600 text-center py-2">
                              +{order.cartItems.length - 4} more items
                            </p>
                          )}
                        </>
                      ) : (
                        <p className="text-slate-600 text-center py-4">No items found</p>
                      )}
                    </div>
                  </div>

                  {/* Order Summary */}
                  <div>
                    <h4 className="font-medium text-slate-800 mb-4">Order Summary</h4>
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between">
                        <span className="text-slate-600">Total Amount</span>
                        <span className="font-semibold">EGP {order.totalOrderPrice || 0}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-600">Payment Method</span>
                        <span className="font-semibold">{order.paymentMethodType === 'cash' ? 'Cash on Delivery' : 'Card'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-600">Items</span>
                        <span className="font-semibold">{order.cartItems ? order.cartItems.length : 0}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-600">isPaid</span>
                        <span className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium ${order.isPaid ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                          {order.isPaid ? 'Paid' : 'Not Paid'}
                        </span>
                      </div>
                      <div className="flex justify-between items-start">
                        <span className="text-slate-600">Delivery Address</span>
                        <span className="font-semibold text-right max-w-xs">
                          {order.shippingAddress ? (
                            <>
                              {order.shippingAddress.city}<br />
                              {order.shippingAddress.details} <br />
                              {order.shippingAddress.phone}
                            </>
                          ) : (
                            'Address not available'
                          )}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Order Total */}
                <div className="mt-6 pt-6 border-t">
                  <div className="flex justify-between items-center">
                    <span className="text-xl font-bold text-slate-800">Order Total</span>
                    <span className="text-xl font-bold text-slate-800">EGP {order.totalOrderPrice || 0}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
