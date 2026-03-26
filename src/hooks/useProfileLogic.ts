import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { apiServices } from "@/apiServices/apiServices";
import { 
  Address, 
  PasswordForm, 
  ProfileForm, 
  ShowPasswords 
} from "@/interfaces";

export function useProfileLogic() {
  const { data, status } = useSession();
  const router = useRouter();
  
  // State
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [activeSection, setActiveSection] = useState<"addresses" | "settings">("addresses");
  const [addAdrressLoading, setAddAdrressLoading] = useState(false);
  const [deletingAddressId, setDeletingAddressId] = useState<string | null>(null);
  const [passwordForm, setPasswordForm] = useState<PasswordForm>({
    currentPassword: "",
    password: "",
    rePassword: "",
  });
  const [passwordLoading, setPasswordLoading] = useState(false);
  const [showPasswords, setShowPasswords] = useState<ShowPasswords>({
    current: false,
    new: false,
    confirm: false,
  });
  const [profileForm, setProfileForm] = useState<ProfileForm>({
    name: "",
    email: "",
    phone: "",
  });
  const [profileLoading, setProfileLoading] = useState(false);
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [form, setForm] = useState({
    name: "",
    details: "",
    phone: "",
    city: "",
  });

  const user = data?.user as any;

  // Initialize profile form with user data when session loads
  useEffect(() => {
    if (status === "authenticated" && data?.user) {
      setProfileForm({
        name: data.user.name || "",
        email: data.user.email || "",
        phone: (data.user as any)?.phone || "",
      });
    }
  }, [status, data]);

  // Authentication protection
  useEffect(() => {
    if (status === "unauthenticated") {
      toast.error("Please log in to access your profile");
      router.push("/auth/login");
    }
  }, [status, router]);

  // Fetch addresses
  const fetchAddresses = async () => {
    try {
      setLoading(true);
      const token = data?.token || (data as any)?.token;

      if (!token) {
        console.error("No authentication token found for fetching addresses");
        setAddresses([]);
        return;
      }

      const res = await apiServices.getAddresses(token);

      if (res && res.data) {
        setAddresses(res.data);
      } else if (res && Array.isArray(res)) {
        setAddresses(res);
      } else {
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

  // Add address
  const addAddress = async () => {
    if (!form.name || !form.city || !form.phone || !form.details) return;

    try {
      setAddAdrressLoading(true);
      const token = data?.token || (data as any)?.token;

      if (!token) {
        toast.error("Please log in again to add an address.");
        return;
      }

      const res = await apiServices.addAddress(form.name, form.details, form.phone, form.city, token);

      if (res && (res.status === 'success' || res.data)) {
        const newAddress = res.data || res;
        toast.success("Address added successfully!");
        setAddAdrressLoading(false);
        
        if (newAddress) {
          setAddresses((prev) => [...prev, newAddress]);
        }

        setForm({
          name: "",
          details: "",
          phone: "",
          city: "",
        });
        setShowForm(false);

       
      } else {
        toast.error("Failed to add address. Please check your data and try again.");
      }
    } catch (error) {
      console.error("Error adding address:", error);
      toast.error("An error occurred while adding address. Please try again.");
    }
  };

  // Delete address
  const deleteAddress = async (id?: string) => {
    if (!id) return;

    console.log(`🔥 Starting delete for address ID: ${id}`);
    console.log(`🔥 Current deletingAddressId before: ${deletingAddressId}`);
    
    setDeletingAddressId(id);
    console.log(`🔥 Set deletingAddressId to: ${id}`);

    try {
      const token = data?.token || (data as any)?.token;

      if (!token) {
        toast.error("Please log in again to delete an address.");
        setDeletingAddressId(null);
        console.log(`🔥 Reset deletingAddressId to null (no token)`);
        return;
      }

      const res = await apiServices.deleteAddress(id, token);
      toast.success("Address deleted successfully!");
      setDeletingAddressId(null);
      console.log(`🔥 Reset deletingAddressId to null (success)`);
      setAddresses((prev) => prev.filter((a) => a._id !== id));
    } catch (error) {
      console.error("Error deleting address:", error);
      toast.error("Failed to delete address. Please try again.");
      setDeletingAddressId(null);
      console.log(`🔥 Reset deletingAddressId to null (error)`);
    }
  };

  // Change password
  const changePassword = async () => {
    const { currentPassword, password, rePassword } = passwordForm;

    if (!currentPassword || !password || !rePassword) {
      toast.error("Please fill in all password fields");
      return;
    }

    if (password.length < 6) {
      toast.error("New password must be at least 6 characters long");
      return;
    }

    if (password !== rePassword) {
      toast.error("New passwords do not match");
      return;
    }

    if (currentPassword === password) {
      toast.error("New password must be different from current password");
      return;
    }

    try {
      setPasswordLoading(true);
      const token = data?.token || (data as any)?.token;

      if (!token) {
        toast.error("Please log in again to change password");
        return;
      }

      const res = await apiServices.changePassword(currentPassword, password, rePassword, token);
      toast.success("Password changed successfully!");

      setPasswordForm({
        currentPassword: "",
        password: "",
        rePassword: "",
      });
    } catch (error) {
      console.error("Error changing password:", error);
      toast.error("Failed to change password. Please check your current password and try again.");
    } finally {
      setPasswordLoading(false);
    }
  };

  // Update profile
  const updateProfile = async () => {
    const { name, email, phone } = profileForm;

    if (!name || !email || !phone) {
      toast.error("Please fill in all profile fields");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    if (phone.length < 10) {
      toast.error("Please enter a valid phone number");
      return;
    }

    try {
      setProfileLoading(true);
      const token = (data as any)?.token || '';

      if (!token) {
        toast.error("Please log in again to update your profile");
        return;
      }

      const res = await apiServices.updateProfile(name, email, phone, token);

      if (res.message == "success") {
        toast.success("Profile updated successfully!");
        setIsEditingProfile(false);
      }

      if (res.message === "fail") {
        toast.error(res.errors.msg);
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Failed to update profile. Please try again.");
    } finally {
      setProfileLoading(false);
    }
  };

  // Reset profile form
  const resetProfileForm = () => {
    setProfileForm({
      name: data?.user?.name || "",
      email: data?.user?.email || "",
      phone: (data as any)?.user?.phone || "",
    });
    setIsEditingProfile(false);
  };

  return {
    // State
    addresses,
    loading,
    showForm,
    activeSection,
    addAdrressLoading,
    deletingAddressId,
    passwordForm,
    passwordLoading,
    showPasswords,
    profileForm,
    profileLoading,
    isEditingProfile,
    form,
    user,
    status,
    
    // Actions
    setActiveSection,
    setShowForm,
    setForm,
    setPasswordForm,
    setShowPasswords,
    setProfileForm,
    setIsEditingProfile,
    addAddress,
    deleteAddress,
    changePassword,
    updateProfile,
    resetProfileForm,
  };
}
