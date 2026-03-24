"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { apiServices } from "@/apiServices/apiServices";

export default function RegisterPage() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    rePassword: "",
    phone: "",
  });

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await apiServices.register(
        form.name,
        form.email,
        form.password,
        form.rePassword,
        form.phone
      );

      if (!res || res?.message === "Account Already Exists") {
        setError("Account already exists");
        setLoading(false);
        return;
      }

      // auto login after register
      const login = await signIn("credentials", {
        email: form.email,
        password: form.password,
        redirect: false,
      });

      if (login?.ok) {
        router.push("/products");
      } else {
        setError("Account created but login failed");
      }
    } catch (err: any) {
      setError(err?.message || "Something went wrong");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">

      {/* LEFT SIDE - BRAND */}
      <div className="hidden lg:flex flex-col justify-center px-16 bg-gradient-to-br from-indigo-600 via-purple-600 to-indigo-700 text-white relative overflow-hidden">

        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_30%_20%,white,transparent)]" />

        <h1 className="text-4xl font-semibold leading-tight">
          Create your account 🚀
        </h1>

        <p className="mt-4 text-white/80 max-w-md">
          Join our platform and start managing your products, customers and orders in seconds.
        </p>

        <div className="mt-10 space-y-2 text-white/60 text-sm">
          <p>⚡ Fast onboarding</p>
          <p>🔐 Secure authentication</p>
          <p>📦 Full e-commerce control</p>
        </div>
      </div>

      {/* RIGHT SIDE - FORM */}
      <div className="flex items-center justify-center bg-white px-6 py-10">

        <div className="w-full max-w-md space-y-6">

          {/* HEADER */}
          <div>
            <h2 className="text-2xl font-semibold text-slate-900">
              Create account
            </h2>
            <p className="text-sm text-slate-500 mt-1">
              Start your journey in seconds
            </p>
          </div>

          {/* FORM */}
          <form onSubmit={handleRegister} className="space-y-4">

            <Input
              placeholder="Full name"
              value={form.name}
              onChange={(e) =>
                setForm({ ...form, name: e.target.value })
              }
              className="h-11 rounded-xl"
            />

            <Input
              type="email"
              placeholder="Email address"
              value={form.email}
              onChange={(e) =>
                setForm({ ...form, email: e.target.value })
              }
              className="h-11 rounded-xl"
            />

            <Input
              type="password"
              placeholder="Password"
              value={form.password}
              onChange={(e) =>
                setForm({ ...form, password: e.target.value })
              }
              className="h-11 rounded-xl"
            />

            <Input
              type="password"
              placeholder="Confirm password"
              value={form.rePassword}
              onChange={(e) =>
                setForm({ ...form, rePassword: e.target.value })
              }
              className="h-11 rounded-xl"
            />

            <Input
              type="tel"
              placeholder="Phone number"
              value={form.phone}
              onChange={(e) =>
                setForm({ ...form, phone: e.target.value })
              }
              className="h-11 rounded-xl"
            />

            {/* ERROR */}
            {error && (
              <p className="text-sm text-red-500">{error}</p>
            )}

            {/* BUTTON */}
            <Button
              disabled={loading}
              className="w-full h-11 rounded-xl bg-indigo-600 hover:bg-indigo-700 transition"
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  <Loader2 className="animate-spin w-4 h-4" />
                  Creating account...
                </div>
              ) : (
                "Create account"
              )}
            </Button>
          </form>

          {/* FOOTER */}
          <p className="text-sm text-center text-slate-500">
            Already have an account?{" "}
            <a
              href="/auth/login"
              className="text-indigo-600 hover:underline"
            >
              Sign in
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}