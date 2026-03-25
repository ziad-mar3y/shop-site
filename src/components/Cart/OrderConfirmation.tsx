"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Package, Truck, MapPin, Phone, Calendar, X } from "lucide-react";
import { Order } from "@/types/cashOnDelivery";

interface OrderConfirmationProps {
  order: Order;
  onClose: () => void;
  onTrackOrder: (orderId: string) => void;
}

export default function OrderConfirmation({ order, onClose, onTrackOrder }: OrderConfirmationProps) {
  const getStatusColor = (status: string) => {
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
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b p-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <CheckCircle className="w-6 h-6 text-green-600" />
            <h2 className="text-xl font-bold text-slate-800">Order Confirmed!</h2>
          </div>
          <Button onClick={onClose} variant="ghost" size="sm">
            <X size={20} />
          </Button>
        </div>

        <div className="p-6 space-y-6">
          {/* Debug Info */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 text-sm">
            <p><strong>Debug Info:</strong></p>
            <p>Order ID: {order?._id || 'NO ORDER ID'}</p>
            <p>Order Status: {order?.status || 'NO STATUS'}</p>
            <p>Products Count: {order?.cartItems?.length || 0}</p>
            <p>Shipping Address: {JSON.stringify(order?.shippingAddress, null, 2)}</p>
            <p>Full Order Object:</p>
            <pre className="text-xs overflow-auto max-h-32">{JSON.stringify(order, null, 2)}</pre>
          </div>
          {/* Success Message */}
          <div className="text-center py-4">
            <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-slate-800 mb-2">
              Thank you for your order!
            </h3>
            <p className="text-slate-600">
              Your cash on delivery order has been successfully placed.
            </p>
            <p className="text-sm text-slate-500 mt-2">
              Order ID: <span className="font-mono font-semibold">{order?._id}</span>
            </p>
          </div>

          {/* Order Status */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package className="w-5 h-5" />
                Order Status
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div>
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status || 'pending')}`}>
                    {order.status ? order.status.charAt(0).toUpperCase() + order.status.slice(1) : 'Pending'}
                  </span>
                </div>
                <div className="text-sm text-slate-600">
                  <Calendar className="w-4 h-4 inline mr-1" />
                  {formatDate(order.createdAt)}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Order Items */}
          <Card>
            <CardHeader>
              <CardTitle>Order Items ({order?.cartItems.length})</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {order?.cartItems.map((item) => (
                  <div key={item._id} className="flex items-center gap-4 p-3 border rounded-lg">
                    <div className="w-16 h-16 bg-slate-100 rounded-lg flex items-center justify-center">
                      {item.product.imageCover ? (
                        <img 
                          src={item.product.imageCover} 
                          alt={item.product.title}
                          className="w-full h-full object-cover rounded-lg"
                        />
                      ) : (
                        <Package className="w-8 h-8 text-slate-400" />
                      )}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-slate-800">{item.product.title}</h4>
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
              </div>
            </CardContent>
          </Card>

          {/* Shipping Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Truck className="w-5 h-5" />
                Shipping Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-slate-400 mt-0.5" />
                  <div>
                    <p className="font-medium text-slate-800">Delivery Address</p>
                    {order.shippingAddress ? (
                      <>
                        <p className="text-slate-600">{order.shippingAddress.details}</p>
                        <p className="text-slate-600">{order.shippingAddress.city}</p>
                      </>
                    ) : (
                      <div className="text-slate-600">
                        <p>Address information will be available soon</p>
                        <p className="text-sm text-slate-500 mt-1">If you don't see your address, please contact customer support</p>
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-slate-400" />
                  <div>
                    <p className="font-medium text-slate-800">Contact Number</p>
                    {order.shippingAddress ? (
                      <p className="text-slate-600">{order.shippingAddress.phone}</p>
                    ) : (
                      <p className="text-slate-600">No phone number provided</p>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Package className="w-5 h-5 text-slate-400" />
                  <div>
                    <p className="font-medium text-slate-800">Payment Method</p>
                    <p className="text-slate-600">Cash on Delivery</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Order Summary */}
          <Card>
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between text-slate-600">
                  <span>Subtotal</span>
                  <span>EGP {order.totalOrderPrice || 0}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Shipping</span>
                  <span>Free</span>
                </div>
                <div className="border-t pt-2">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-slate-800">Total</span>
                    <span className="font-bold text-slate-800">EGP {order.totalOrderPrice || 0}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <Button
              onClick={() => onTrackOrder(order._id)}
              className="flex-1 bg-green-600 hover:bg-green-700"
            >
              <Truck size={16} className="mr-2" />
              Track Order
            </Button>
            <Button
              onClick={onClose}
              variant="outline"
              className="flex-1"
            >
              Continue Shopping
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
