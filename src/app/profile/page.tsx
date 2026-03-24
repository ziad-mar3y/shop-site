"use client";

import { useEffect, useState } from "react";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  User,
  Mail,
  MapPin,
  Plus,
  Trash2,
  LogOut,
  Settings,
  Home,
  Loader2,
} from "lucide-react";
import { apiServices } from "@/apiServices/apiServices";
import toast from "react-hot-toast";

type Address = {
  _id?: string;
  name: string;
  details: string;
  city: string;
  phone: string;
};

export default function ProfilePage() {
  const { data, status } = useSession();
  const router = useRouter();
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [activeSection, setActiveSection] = useState<"addresses" | "settings">("addresses");
  const [addAdrressLoading, setAddAdrressLoading] = useState(false);
  const [removeAdrressLoading, setRemoveAdrressLoading] = useState(false);

  // -------------------------
  // AUTHENTICATION PROTECTION
  // -------------------------
  useEffect(() => {
    if (status === "unauthenticated") {
      toast.error("Please log in to access your profile");
      router.push("/auth/login");
    }
  }, [status, router]);

  const [form, setForm] = useState({
    name: "",
    details: "",
    phone: "",
    city: "",
  });

  const user = data?.user as any;

  // -------------------------
  // GET ADDRESSES
  // -------------------------
  const fetchAddresses = async () => {
    try {
      setLoading(true);

      // Get user token from session 
      const token = data?.token || (data as any)?.token;
      
      console.log("Session data:", data);
      console.log("Token from session:", token);
      
      if (!token) {
        console.error("No authentication token found for fetching addresses");
        setAddresses([]);
        return;
      }

      console.log("Fetching addresses with token");
      const res = await apiServices.getAddresses(token);
      console.log("Addresses API response:", res);
      

      // Handle different response structures
      if (res && res.data) {
        setAddresses(res.data);
      } else if (res && Array.isArray(res)) {
        setAddresses(res);
      } else {
        console.log("No addresses found or unexpected response format");
        setAddresses([]);
      }
    } catch (err) {
      console.error("Error fetching addresses:", err);
      setAddresses([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (status === "authenticated") {
      fetchAddresses();
    }
  }, [status]);

  // -------------------------
  // ADD ADDRESS
  // -------------------------
  const addAddress = async () => {
  if (!form.name || !form.city || !form.phone || !form.details) return;

  try {
    setAddAdrressLoading(true);
    console.log("Adding address with data:", form);
    
    // Get user token from session
    const token = data?.token || (data as any)?.token;
    
    console.log("Token for add address:", token);
    
    if (!token) {
      console.error("No authentication token found");
      alert("Please log in again to add an address.");
      return;
    }
    
    const res = await apiServices.addAddress(form.name, form.details, form.phone, form.city, token);
    console.log("API response:", res);

    // Check if response is successful
    if (res && (res.status === 'success' || res.data)) {
      const newAddress = res.data || res;
      console.log("New address added:", newAddress);
      toast.success("Address added successfully!");
      setAddAdrressLoading(false);
      // Add to local state immediately for instant UI update
      if (newAddress) {
        setAddresses((prev) => [...prev, newAddress]);
      }
      
      // Reset form
      setForm({
        name: "",
        details: "",
        phone: "",
        city: "",
      });
      setShowForm(false);
      
      // Refetch addresses to ensure we have the latest data
      setTimeout(() => {
        fetchAddresses();
      }, 500);
      
    } else {
      console.error("Failed to add address - API response:", res);
      // Show user-friendly error message
      alert("Failed to add address. Please check your data and try again.");
    }
  } catch (error) {
    console.error("Error adding address:", error);
    alert("An error occurred while adding address. Please try again.");
  }
};

  // -------------------------
  // DELETE ADDRESS
  // -------------------------
  const deleteAddress = async (id?: string) => {
    if (!id) return;

    try {
        setRemoveAdrressLoading(true)
      // Get user token from session
      const token = data?.token || (data as any)?.token;
      
      if (!token) {
        console.error("No authentication token found for deleting address");
        alert("Please log in again to delete an address.");
        return;
      }

      console.log("Deleting address with ID:", id);
      const res = await apiServices.deleteAddress(id, token);
      console.log("Delete address API response:", res);
      toast.success("Address deleted successfully!");
      setRemoveAdrressLoading(false);
      // Remove address from local state
      setAddresses((prev) => prev.filter((a) => a._id !== id));
      
    } catch (error) {
      console.error("Error deleting address:", error);
      alert("Failed to delete address. Please try again.");
    }
  };

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

 return (
  <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
    <div className="flex min-h-screen">

      {/* SIDEBAR */}
      <aside className="w-72 bg-white/60 backdrop-blur-2xl border-r border-slate-200/50 px-6 py-8 flex flex-col">

        {/* USER CARD */}
        <div className="flex-1">
          <div className="flex items-center gap-4 mb-10">
            {user?.image ? (
              <Image
                src={user.image}
                width={48}
                height={48}
                alt="avatar"
                className="rounded-full ring-2 ring-white shadow-md"
              />
            ) : (
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white font-semibold shadow-md">
                {user?.name?.[0]}
              </div>
            )}

            <div>
              <h2 className="font-semibold text-slate-900">{user?.name}</h2>
              <p className="text-sm text-slate-500">{user?.email}</p>
            </div>
          </div>

          {/* NAV */}
          <nav className="space-y-2">
            {[
              { key: "addresses", label: "My Addresses", icon: MapPin },
              { key: "settings", label: "Settings", icon: Settings },
            ].map((item) => {
              const Icon = item.icon;

              return (
                <button
                  key={item.key}
                  onClick={() => setActiveSection(item.key as any)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300
                    ${
                      activeSection === item.key
                        ? "bg-indigo-50 text-indigo-600 shadow-sm"
                        : "text-slate-600 hover:bg-slate-100"
                    }`}
                >
                  <Icon size={18} />
                  {item.label}
                </button>
              );
            })}
          </nav>
        </div>

        {/* LOGOUT */}
        <Button
          variant="ghost"
          onClick={() => signOut()}
          className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-50 transition"
        >
          <LogOut size={16} className="mr-2" />
          Sign out
        </Button>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 p-10">

        <div className="max-w-5xl mx-auto space-y-8">

          {/* HEADER */}
          <div className="animate-in fade-in slide-in-from-bottom-3 duration-500">
            <h1 className="text-2xl font-semibold text-slate-900">
              {activeSection === "addresses" ? "Your Addresses" : "Settings"}
            </h1>
            <p className="text-slate-500 mt-1">
              Manage your account with ease
            </p>
          </div>

          {/* ADDRESSES */}
          {activeSection === "addresses" && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">

              {/* ADD BUTTON */}
              <div className="flex justify-end">
                <Button
                  onClick={() => setShowForm(!showForm)}
                  className="rounded-full px-5 shadow-sm hover:shadow-md transition"
                >
                  <Plus size={16} className="mr-1" />
                  Add Address
                </Button>
              </div>

              {/* FORM */}
              {showForm && (
                <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-3 shadow-sm animate-in fade-in slide-in-from-top-2 duration-300">

                  <Input placeholder="Address Name"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                  />

                  <Input placeholder="Details"
                    value={form.details}
                    onChange={(e) => setForm({ ...form, details: e.target.value })}
                  />

                  <Input placeholder="City"
                    value={form.city}
                    onChange={(e) => setForm({ ...form, city: e.target.value })}
                  />

                  <Input placeholder="Phone"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  />

                  <Button
                    disabled={addAdrressLoading}
                    onClick={addAddress}
                    className="w-full rounded-xl"
                  >
                    {
                        addAdrressLoading ? <Loader2 className="animate-spin" /> : "Save Address"
                    }
                  </Button>
                </div>
              )}

              {/* LIST */}
              {loading ? (
                <div className="text-slate-500">Loading...</div>
              ) : addresses.length === 0 ? (
                <div className="text-center py-20 text-slate-500">
                  <MapPin className="mx-auto mb-2 opacity-40" />
                  No addresses yet
                </div>
              ) : (
                <div className="grid gap-4">
                  {addresses.map((addr) => (
                    <div
                      key={addr._id}
                      className="bg-white border border-slate-200 rounded-2xl p-5 flex justify-between items-center
                      hover:shadow-md transition-all duration-300 hover:-translate-y-0.5"
                    >
                      <div>
                        <p className="font-medium text-slate-900">
                          {addr.name}
                        </p>
                        <p className="text-sm text-slate-500">
                          {addr.details}
                        </p>
                        <p className="text-xs text-slate-400 mt-1">
                          {addr.city} • {addr.phone}
                        </p>
                      </div>

                      <button
                        onClick={() => deleteAddress(addr._id)}
                        disabled={removeAdrressLoading}
                        className="text-red-500 hover:text-red-600 hover:bg-red-50 p-2 rounded-lg transition"
                      > 
                      
                        {removeAdrressLoading ? <Loader2 className="animate-spin" /> : <Trash2 size={18} />}
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* SETTINGS */}
          {activeSection === "settings" && (
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm animate-in fade-in duration-500">
              <p className="text-slate-500">
                Settings panel coming soon...
              </p>
            </div>
          )}

        </div>
      </main>
    </div>
  </div>
);
}