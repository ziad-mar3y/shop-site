import { Button } from "@/components/ui/button";
import { LogOut, MapPin, Settings, Menu, X } from "lucide-react";
import { signOut } from "next-auth/react";
import Image from "next/image";
import { useState } from "react";

interface SidebarProps {
  user: any;
  activeSection: "addresses" | "settings";
  onSectionChange: (section: "addresses" | "settings") => void;
}

export default function Sidebar({ user, activeSection, onSectionChange }: SidebarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const navItems = [
    { key: "addresses" as const, label: "My Addresses", icon: MapPin },
    { key: "settings" as const, label: "Settings", icon: Settings },
  ];

  const handleSectionChange = (section: "addresses" | "settings") => {
    onSectionChange(section);
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      {/* MOBILE HEADER */}
      <div className="lg:hidden bg-white/60 backdrop-blur-2xl border-b border-slate-200/50 px-4 py-3 flex items-center justify-between sticky top-0 z-40">
        <div className="flex items-center gap-3">
          {user?.image ? (
            <Image
              src={user.image}
              width={40}
              height={40}
              alt="avatar"
              className="rounded-full ring-2 ring-white shadow-md"
            />
          ) : (
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white font-semibold shadow-md">
              {user?.name?.[0]}
            </div>
          )}
          <div>
            <h2 className="font-semibold text-slate-900 text-sm">{user?.name}</h2>
            <p className="text-xs text-slate-500 truncate max-w-[150px]">{user?.email}</p>
          </div>
        </div>
        
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="h-9 w-9"
        >
          {isMobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
        </Button>
      </div>

      {/* MOBILE MENU OVERLAY */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 bg-black/50 z-50" onClick={() => setIsMobileMenuOpen(false)}>
          <div className="bg-white/95 backdrop-blur-2xl w-80 h-full overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="px-6 py-8">
              {/* USER CARD */}
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
              <nav className="space-y-2 mb-6">
                {navItems.map((item) => {
                  const Icon = item.icon;

                  return (
                    <button
                      key={item.key}
                      onClick={() => handleSectionChange(item.key)}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300
                        ${activeSection === item.key
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

              {/* LOGOUT */}
              <Button
                variant="ghost"
                onClick={() => signOut()}
                className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-50 transition"
              >
                <LogOut size={16} className="mr-2" />
                Sign out
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* DESKTOP SIDEBAR */}
      <aside className="hidden lg:flex w-72 bg-white/60 backdrop-blur-2xl border-r border-slate-200/50 px-6 py-8 flex flex-col">
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
            {navItems.map((item) => {
              const Icon = item.icon;

              return (
                <button
                  key={item.key}
                  onClick={() => onSectionChange(item.key)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300
                    ${activeSection === item.key
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
    </>
  );
}
