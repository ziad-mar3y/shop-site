import { Button } from "@/components/ui/button";
import { LogOut, MapPin, Settings } from "lucide-react";
import { signOut } from "next-auth/react";
import Image from "next/image";

interface SidebarProps {
  user: any;
  activeSection: "addresses" | "settings";
  onSectionChange: (section: "addresses" | "settings") => void;
}

export default function Sidebar({ user, activeSection, onSectionChange }: SidebarProps) {
  const navItems = [
    { key: "addresses" as const, label: "My Addresses", icon: MapPin },
    { key: "settings" as const, label: "Settings", icon: Settings },
  ];

  return (
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
  );
}
