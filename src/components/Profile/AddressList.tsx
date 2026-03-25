import { MapPin } from "lucide-react";
import AddressCard from "./AddressCard";
import { Address } from "@/interfaces";

interface AddressListProps {
  addresses: Address[];
  loading: boolean;
  deletingAddressId: string | null;
  onDeleteAddress: (id?: string) => void;
}

export default function AddressList({ 
  addresses, 
  loading, 
  deletingAddressId, 
  onDeleteAddress 
}: AddressListProps) {
  console.log(`📍 AddressList - deletingAddressId: ${deletingAddressId}`);
  
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
      {addresses.map((addr) => {
        const isDeleting = deletingAddressId === addr._id;
        console.log(`📍 Checking ${addr.name} (${addr._id}): isDeleting=${isDeleting}`);
        
        return (
          <AddressCard
            key={addr._id}
            address={addr}
            isDeleting={isDeleting}
            onDelete={onDeleteAddress}
          />
        );
      })}
    </div>
  );
}
