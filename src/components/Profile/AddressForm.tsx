import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, Plus } from "lucide-react";

interface AddressFormProps {
  form: {
    name: string;
    details: string;
    phone: string;
    city: string;
  };
  addAdrressLoading: boolean;
  showForm: boolean;
  onFormChange: (form: any) => void;
  onToggleForm: () => void;
  onSubmit: () => void;
}

export default function AddressForm({ 
  form, 
  addAdrressLoading, 
  showForm, 
  onFormChange, 
  onToggleForm, 
  onSubmit 
}: AddressFormProps) {
  return (
    <>
      {/* ADD BUTTON */}
      <div className="flex justify-end">
        <Button
          onClick={onToggleForm}
          className="rounded-full px-5 shadow-sm hover:shadow-md transition"
        >
          <Plus size={16} className="mr-1" />
          Add Address
        </Button>
      </div>

      {/* FORM */}
      {showForm && (
        <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-3 shadow-sm animate-in fade-in slide-in-from-top-2 duration-300">
          <Input
            placeholder="Address Name"
            value={form.name}
            onChange={(e) => onFormChange({ ...form, name: e.target.value })}
          />
          <Input
            placeholder="Details"
            value={form.details}
            onChange={(e) => onFormChange({ ...form, details: e.target.value })}
          />
          <Input
            placeholder="City"
            value={form.city}
            onChange={(e) => onFormChange({ ...form, city: e.target.value })}
          />
          <Input
            placeholder="Phone"
            value={form.phone}
            onChange={(e) => onFormChange({ ...form, phone: e.target.value })}
          />
          <Button
            disabled={addAdrressLoading}
            onClick={onSubmit}
            className="w-full rounded-xl"
          >
            {addAdrressLoading ? <Loader2 className="animate-spin" /> : "Save Address"}
          </Button>
        </div>
      )}
    </>
  );
}
