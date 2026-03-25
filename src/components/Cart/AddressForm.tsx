"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, X } from "lucide-react";
import { ShippingAddress } from "@/types/cashOnDelivery";

interface AddressFormProps {
  onSubmit: (address: ShippingAddress) => Promise<void>;
  onCancel: () => void;
  loading?: boolean;
  initialAddress?: Partial<ShippingAddress>;
}

export default function AddressForm({ 
  onSubmit, 
  onCancel, 
  loading = false, 
  initialAddress = {} 
}: AddressFormProps) {
  const [address, setAddress] = useState<Partial<ShippingAddress>>({
    details: "",
    phone: "",
    city: "Cairo",
    ...initialAddress
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!address.details || !address.phone || !address.city) {
      alert("Please fill in all required fields");
      return;
    }

    await onSubmit(address as ShippingAddress);
  };

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Shipping Address</CardTitle>
        <Button
          onClick={onCancel}
          variant="ghost"
          size="sm"
          disabled={loading}
        >
          <X size={16} />
        </Button>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">
              Address Details *
            </label>
            <textarea
              value={address.details || ""}
              onChange={(e) => setAddress({ ...address, details: e.target.value })}
              className="w-full p-3 border rounded-lg resize-none h-20"
              placeholder="Enter your full address"
              disabled={loading}
              required
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                Phone Number *
              </label>
              <input
                type="tel"
                value={address.phone || ""}
                onChange={(e) => setAddress({ ...address, phone: e.target.value })}
                className="w-full p-3 border rounded-lg"
                placeholder="Phone number"
                disabled={loading}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">
                City *
              </label>
              <input
                type="text"
                value={address.city || ""}
                onChange={(e) => setAddress({ ...address, city: e.target.value })}
                className="w-full p-3 border rounded-lg"
                placeholder="City"
                disabled={loading}
                required
              />
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              onClick={onCancel}
              variant="outline"
              disabled={loading}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={loading}
              className="flex-1 bg-green-600 hover:bg-green-700"
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  <Loader2 className="animate-spin" size={16} />
                  Processing...
                </div>
              ) : (
                "Place Order"
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
