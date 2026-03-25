"use client";

import { useProfileLogic } from "@/hooks/useProfileLogic";
import Loading from "../loading";
import {
  Sidebar,
  AddressForm,
  AddressList,
  ProfileUpdateCard,
  PasswordChangeCard,
  SecurityTips
} from "@/components/Profile";

export default function ProfilePage() {
  const {
    addresses,
    loading,
    showForm,
    activeSection,
    addAdrressLoading,
    removeAdrressLoading,
    passwordForm,
    passwordLoading,
    showPasswords,
    profileForm,
    profileLoading,
    isEditingProfile,
    form,
    user,
    status,
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
  } = useProfileLogic();

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loading />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      <div className="flex min-h-screen">
        <Sidebar 
          user={user} 
          activeSection={activeSection} 
          onSectionChange={setActiveSection} 
        />

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
                <AddressForm
                  form={form}
                  addAdrressLoading={addAdrressLoading}
                  showForm={showForm}
                  onFormChange={setForm}
                  onToggleForm={() => setShowForm(!showForm)}
                  onSubmit={addAddress}
                />
                
                <AddressList
                  addresses={addresses}
                  loading={loading}
                  removeAdrressLoading={removeAdrressLoading}
                  onDeleteAddress={deleteAddress}
                />
              </div>
            )}

            {/* SETTINGS */}
            {activeSection === "settings" && (
              <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <ProfileUpdateCard
                  profileForm={profileForm}
                  profileLoading={profileLoading}
                  isEditingProfile={isEditingProfile}
                  onFormChange={setProfileForm}
                  onEditToggle={() => setIsEditingProfile(true)}
                  onSave={updateProfile}
                  onCancel={resetProfileForm}
                />

                <PasswordChangeCard
                  passwordForm={passwordForm}
                  passwordLoading={passwordLoading}
                  showPasswords={showPasswords}
                  onFormChange={setPasswordForm}
                  onPasswordVisibilityChange={setShowPasswords}
                  onSubmit={changePassword}
                />

                <SecurityTips />
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}