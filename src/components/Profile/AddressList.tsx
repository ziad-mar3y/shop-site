import { MapPin } from "lucide-react";
import AddressCard from "./AddressCard";
import { Address } from "@/interfaces";

interface AddressListProps {
  addresses: Address[];
  loading: boolean;
  removeAdrressLoading: boolean;
  onDeleteAddress: (id?: string) => void;
}

export default function AddressList({ 
  addresses, 
  loading, 
  removeAdrressLoading, 
  onDeleteAddress 
}: AddressListProps) {
  if (loading) {
    return <div className="text-slate-500">Loading...</div>;
  }

  if (addresses.length === 0) {
    return (
      <div className="text-center py-20 text-slate-500">
        <MapPin className="mx-auto mb-2 opacity-40" />
        No addresses yet
      </div>
    );
  }

  return (
    <div className="grid gap-4">
      {addresses.map((addr) => (
        <AddressCard
          key={addr._id}
          address={addr}
          removeAdrressLoading={removeAdrressLoading}
          onDelete={onDeleteAddress}
        />
      ))}
    </div>
  );
}
