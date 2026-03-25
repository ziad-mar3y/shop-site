import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Edit2, Save, X, Loader2 } from "lucide-react";
import { ProfileForm } from "@/interfaces";

interface ProfileUpdateCardProps {
  profileForm: ProfileForm;
  profileLoading: boolean;
  isEditingProfile: boolean;
  onFormChange: (form: ProfileForm) => void;
  onEditToggle: () => void;
  onSave: () => void;
  onCancel: () => void;
}

export default function ProfileUpdateCard({
  profileForm,
  profileLoading,
  isEditingProfile,
  onFormChange,
  onEditToggle,
  onSave,
  onCancel,
}: ProfileUpdateCardProps) {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
            <div className="text-white size-6 flex items-center justify-center">
              <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
            </div>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-slate-900">Profile Information</h2>
            <p className="text-sm text-slate-500">Update your personal information</p>
          </div>
        </div>

        {!isEditingProfile ? (
          <Button
            onClick={onEditToggle}
            variant="outline"
            size="sm"
            className="rounded-lg border-green-200 text-green-600 hover:bg-green-50"
          >
            <Edit2 size={16} className="mr-1" />
            Edit
          </Button>
        ) : (
          <div className="flex gap-2">
            <Button
              onClick={onCancel}
              variant="outline"
              size="sm"
              className="rounded-lg border-slate-200 text-slate-600 hover:bg-slate-50"
            >
              <X size={16} className="mr-1" />
              Cancel
            </Button>
            <Button
              onClick={onSave}
              disabled={profileLoading}
              size="sm"
              className="rounded-lg bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600"
            >
              {profileLoading ? (
                <Loader2 className="animate-spin size-4" />
              ) : (
                <Save size={16} className="mr-1" />
              )}
              Save
            </Button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Name Field */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700">Full Name</label>
          <Input
            disabled={!isEditingProfile}
            placeholder="Enter your full name"
            value={profileForm.name}
            onChange={(e) => onFormChange({ ...profileForm, name: e.target.value })}
            className={!isEditingProfile ? "bg-slate-50" : ""}
          />
        </div>

        {/* Email Field */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700">Email Address</label>
          <Input
            disabled={!isEditingProfile}
            type="email"
            placeholder="Enter your email"
            value={profileForm.email}
            onChange={(e) => onFormChange({ ...profileForm, email: e.target.value })}
            className={!isEditingProfile ? "bg-slate-50" : ""}
          />
        </div>

        {/* Phone Field */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700">Phone Number</label>
          <Input
            disabled={!isEditingProfile}
            placeholder="Enter your phone number"
            value={profileForm.phone}
            onChange={(e) => onFormChange({ ...profileForm, phone: e.target.value })}
            className={!isEditingProfile ? "bg-slate-50" : ""}
          />
        </div>
      </div>

      {!isEditingProfile && (
        <div className="mt-4 p-4 bg-slate-50 rounded-xl">
          <p className="text-sm text-slate-600">
            <span className="font-medium">Tip:</span> Click the Edit button to update your profile information. Your changes will be saved immediately.
          </p>
        </div>
      )}
    </div>
  );
}
