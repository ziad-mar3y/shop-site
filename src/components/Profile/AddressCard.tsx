import { Address } from "@/interfaces";

interface AddressCardProps {
  address: Address;
  removeAdrressLoading: boolean;
  onDelete: (id?: string) => void;
}

export default function AddressCard({ address, removeAdrressLoading, onDelete }: AddressCardProps) {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-5 flex justify-between items-center hover:shadow-md transition-all duration-300 hover:-translate-y-0.5">
      <div>
        <p className="font-medium text-slate-900">{address.name}</p>
        <p className="text-sm text-slate-500">{address.details}</p>
        <p className="text-xs text-slate-400 mt-1">
          {address.city} • {address.phone}
        </p>
      </div>

      <button
        onClick={() => onDelete(address._id)}
        disabled={removeAdrressLoading}
        className="text-red-500 hover:text-red-600 hover:bg-red-50 p-2 rounded-lg transition"
      >
        {removeAdrressLoading ? (
          <div className="animate-spin">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          </div>
        ) : (
          <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="3 6 5 6 21 6"></polyline>
            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
            <line x1="10" y1="11" x2="10" y2="17"></line>
            <line x1="14" y1="11" x2="14" y2="17"></line>
          </svg>
        )}
      </button>
    </div>
  );
}
