"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function LoginPage() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const res = await signIn("credentials", {
      email: form.email,
      password: form.password,
      redirect: false,
    });

    setLoading(false);

    if (res?.ok) {
      router.push("/products");
    } else {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">

      {/* LEFT SIDE - BRAND (Stripe style) */}
      <div className="hidden lg:flex flex-col justify-center px-16 bg-gradient-to-br from-indigo-600 via-purple-600 to-indigo-700 text-white relative overflow-hidden">

        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_30%_20%,white,transparent)]" />

        <h1 className="text-4xl font-semibold leading-tight">
          Welcome back 👋
        </h1>

        <p className="mt-4 text-white/80 max-w-md">
          Sign in to manage your products, orders, and customer experience in a
          modern SaaS dashboard.
        </p>

        <div className="mt-10 space-y-2 text-white/60 text-sm">
          <p>⚡ Fast checkout system</p>
          <p>📦 Real-time order tracking</p>
          <p>🔐 Secure authentication</p>
        </div>
      </div>

      {/* RIGHT SIDE - FORM */}
      <div className="flex items-center justify-center bg-white px-6">

        <div className="w-full max-w-md space-y-6">

          {/* HEADER */}
          <div>
            <h2 className="text-2xl font-semibold text-slate-900">
              Sign in
            </h2>
            <p className="text-sm text-slate-500 mt-1">
              Enter your credentials to continue
            </p>
          </div>

          {/* FORM */}
          <form onSubmit={handleLogin} className="space-y-4">

            {/* EMAIL */}
            <Input
              type="email"
              placeholder="Email address"
              value={form.email}
              onChange={(e) =>
                setForm({ ...form, email: e.target.value })
              }
              className="h-11 rounded-xl"
            />

            {/* PASSWORD */}
            <Input
              type="password"
              placeholder="Password"
              value={form.password}
              onChange={(e) =>
                setForm({ ...form, password: e.target.value })
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
                  Signing in...
                </div>
              ) : (
                "Sign in"
              )}
            </Button>
          </form>

          {/* FOOTER */}
          <p className="text-sm text-center text-slate-500">
            Don’t have an account?{" "}
            <a
              href="/auth/register"
              className="text-indigo-600 hover:underline"
            >
              Create one
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}