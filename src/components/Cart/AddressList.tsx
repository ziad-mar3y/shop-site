"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Plus, Check } from "lucide-react";
import { Address, ShippingAddress } from "@/types/cashOnDelivery";

interface AddressListProps {
  addresses: Address[];
  selectedAddress: Address | null;
  onSelectAddress: (address: Address) => void;
  onAddNewAddress: () => void;
}

export default function AddressList({
  addresses,
  selectedAddress,
  onSelectAddress,
  onAddNewAddress
}: AddressListProps) {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MapPin size={20} />
          Choose Shipping Address
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {addresses.length === 0 ? (
          <div className="text-center py-8 text-slate-500">
            <MapPin className="w-12 h-12 mx-auto mb-3 opacity-50" />
            <p>No saved addresses found</p>
          </div>
        ) : (
          addresses.map((address) => (
            <div
              key={address._id}
              className={`p-4 border rounded-lg cursor-pointer transition-all ${
                selectedAddress?._id === address._id
                  ? 'border-green-500 bg-green-50'
                  : 'border-slate-200 hover:border-slate-300'
              }`}
              onClick={() => onSelectAddress(address)}
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  {address.name && (
                    <p className="font-medium text-slate-800 mb-1">{address.name}</p>
                  )}
                  <p className="text-sm text-slate-600 mb-1">{address.details}</p>
                  <p className="text-sm text-slate-600 mb-1">{address.city}</p>
                  <p className="text-sm text-slate-800">{address.phone}</p>
                </div>
                {selectedAddress?._id === address._id && (
                  <div className="flex items-center justify-center w-6 h-6 bg-green-600 rounded-full">
                    <Check className="w-4 h-4 text-white" />
                  </div>
                )}
              </div>
            </div>
          ))
        )}

        <Button
          onClick={onAddNewAddress}
          variant="outline"
          className="w-full mt-4"
        >
          <Plus size={16} className="mr-2" />
          Add New Address
        </Button>
      </CardContent>
    </Card>
  );
}
