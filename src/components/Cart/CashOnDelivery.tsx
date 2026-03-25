"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Truck, X } from "lucide-react";
import { apiServices } from "@/apiServices/apiServices";
import { Address, ShippingAddress, CashOnDeliveryRequest, Order } from "@/types/cashOnDelivery";
import AddressList from "./AddressList";
import AddressForm from "./AddressForm";
import OrderConfirmation from "./OrderConfirmation";
import OrderTracking from "./OrderTracking";
import toast from "react-hot-toast";

interface CashOnDeliveryProps {
  cartOrderId: string;
  token: string | null;
  onSuccess: () => void;
  onClose: () => void;
}

export default function CashOnDelivery({
  cartOrderId,
  token,
  onSuccess,
  onClose
}: CashOnDeliveryProps) {
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showTracking, setShowTracking] = useState(false);
  const [placedOrder, setPlacedOrder] = useState<Order | null>(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted || !token) return;
    
    fetchAddresses();
  }, [isMounted, token]);

  const fetchAddresses = async () => {
    try {
      const response = await apiServices.getAddresses(token || undefined);
      if (response.success && response.data) {
        setAddresses(response.data);
      }
    } catch (error) {
      console.error('Error fetching addresses:', error);
    }
  };

  const handleSelectAddress = (address: Address) => {
    setSelectedAddress(address);
  };

  const handleAddNewAddress = () => {
    setShowAddressForm(true);
  };

  const handleAddressFormSubmit = async (address: ShippingAddress) => {
    try {
      setLoading(true);
      
      console.log('Placing cash on delivery order with:', {
        cartOrderId,
        shippingAddress: address,
        token: token ? 'present' : 'missing'
      });
      
      // Place cash on delivery order
      const response = await apiServices.cashOnDelivery(
        cartOrderId,
        address,
        token || undefined
      );

      console.log('API Response:', response);

      if (response.status === 'success') {
        toast.success("Cash on delivery order placed successfully!");
        console.log('Order response data:', response.data);
        if (response.data) {
          setPlacedOrder(response.data);
          console.log('Setting showConfirmation to true');
          setShowConfirmation(true);
        } else {
          console.log('No order data in response');
        }
        onSuccess();
      } else {
        const errorMessage = response.message || response.error || "Unknown error";
        console.error('Order failed:', response);
        toast.error("Failed to place order: " + errorMessage);
      }
    } catch (error) {
      console.error('Error placing order:', error);
      toast.error("An error occurred while placing your order. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSelectedAddressOrder = async () => {
    if (!selectedAddress) {
      toast.error("Please select a shipping address");
      return;
    }

    const shippingAddress: ShippingAddress = {
      details: selectedAddress.details,
      phone: selectedAddress.phone,
      city: selectedAddress.city
    };

    await handleAddressFormSubmit(shippingAddress);
  };

  const handleAddressFormCancel = () => {
    setShowAddressForm(false);
  };

  const handleTrackOrder = (orderId: string) => {
    console.log('Track order clicked for:', orderId);
    console.log('Placed order:', placedOrder);
    setShowConfirmation(false);
    setShowTracking(true);
  };

  const handleTrackingClose = () => {
    setShowTracking(false);
    onClose();
  };

  const handleConfirmationClose = () => {
    setShowConfirmation(false);
    onClose();
  };

  if (!isMounted) return null;

  // Show order confirmation modal
  if (showConfirmation && placedOrder) {
    console.log('Rendering OrderConfirmation modal with order:', placedOrder);
    return (
      <OrderConfirmation
        order={placedOrder}
        onClose={handleConfirmationClose}
        onTrackOrder={handleTrackOrder}
      />
    );
  }

  // Show order tracking modal
  if (showTracking) {
    console.log('Rendering OrderTracking modal');
    return (
      <OrderTracking
        orderId={placedOrder?._id || cartOrderId}
        token={token}
        onClose={handleTrackingClose}
      />
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b p-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Truck className="w-6 h-6 text-green-600" />
            <h2 className="text-xl font-bold text-slate-800">Cash on Delivery</h2>
          </div>
          <Button
            onClick={onClose}
            variant="ghost"
            size="sm"
            disabled={loading}
          >
            <X size={20} />
          </Button>
        </div>

        <div className="p-6">
          {showAddressForm ? (
            <AddressForm
              onSubmit={handleAddressFormSubmit}
              onCancel={handleAddressFormCancel}
              loading={loading}
            />
          ) : (
            <div className="space-y-6">
              <AddressList
                addresses={addresses}
                selectedAddress={selectedAddress}
                onSelectAddress={handleSelectAddress}
                onAddNewAddress={handleAddNewAddress}
              />

              {selectedAddress && (
                <div className="border-t pt-6">
                  <Button
                    onClick={handleSelectedAddressOrder}
                    disabled={loading}
                    className="w-full bg-green-600 hover:bg-green-700 text-white py-3"
                    size="lg"
                  >
                    {loading ? (
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Processing Order...
                      </div>
                    ) : (
                      "Place Cash on Delivery Order"
                    )}
                  </Button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
