import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff, Lock, Loader2 } from "lucide-react";
import { PasswordForm, ShowPasswords } from "@/interfaces";

interface PasswordChangeCardProps {
  passwordForm: PasswordForm;
  passwordLoading: boolean;
  showPasswords: ShowPasswords;
  onFormChange: (form: PasswordForm) => void;
  onPasswordVisibilityChange: (passwords: ShowPasswords) => void;
  onSubmit: () => void;
}

export default function PasswordChangeCard({
  passwordForm,
  passwordLoading,
  showPasswords,
  onFormChange,
  onPasswordVisibilityChange,
  onSubmit,
}: PasswordChangeCardProps) {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-6 lg:p-8 shadow-sm">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center">
          <Lock className="text-white size-5 sm:size-6" />
        </div>
        <div>
          <h2 className="text-lg sm:text-xl font-semibold text-slate-900">Change Password</h2>
          <p className="text-sm text-slate-500">Update your password to keep your account secure</p>
        </div>
      </div>

      <div className="space-y-4 sm:space-y-6">
        {/* Current Password */}
        <div className="space-y-2 pb-4 border-b border-slate-200">
          <label className="text-sm font-medium text-slate-700">Current Password</label>
          <div className="relative">
            <Input
              type={showPasswords.current ? "text" : "password"}
              placeholder="Enter your current password"
              value={passwordForm.currentPassword || ""}
              onChange={(e) => onFormChange({ ...passwordForm, currentPassword: e.target.value })}
              className="pr-10"
            />
            <button
              type="button"
              onClick={() => onPasswordVisibilityChange({ ...showPasswords, current: !showPasswords.current })}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
            >
              {showPasswords.current ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>

        {/* New Password */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700">New Password</label>
          <div className="relative">
            <Input
              type={showPasswords.new ? "text" : "password"}
              placeholder="Enter your new password"
              value={passwordForm.password || ""}
              onChange={(e) => onFormChange({ ...passwordForm, password: e.target.value })}
              className="pr-10"
            />
            <button
              type="button"
              onClick={() => onPasswordVisibilityChange({ ...showPasswords, new: !showPasswords.new })}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
            >
              {showPasswords.new ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
          <p className="text-xs text-slate-500">Must be at least 6 characters long</p>
        </div>

        {/* Confirm New Password */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700">Confirm New Password</label>
          <div className="relative">
            <Input
              type={showPasswords.confirm ? "text" : "password"}
              placeholder="Confirm your new password"
              value={passwordForm.rePassword}
              onChange={(e) => onFormChange({ ...passwordForm, rePassword: e.target.value })}
              className="pr-10"
            />
            <button
              type="button"
              onClick={() => onPasswordVisibilityChange({ ...showPasswords, confirm: !showPasswords.confirm })}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
            >
              {showPasswords.confirm ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>

        {/* Submit Button */}
        <Button
          onClick={onSubmit}
          disabled={passwordLoading}
          className="w-full rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 transition-all duration-300 shadow-lg hover:shadow-xl"
        >
          {passwordLoading ? (
            <div className="flex items-center gap-2">
              <Loader2 className="animate-spin size-4" />
              Updating Password...
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Lock size={18} />
              Change Password
            </div>
          )}
        </Button>
      </div>
    </div>
  );
}
