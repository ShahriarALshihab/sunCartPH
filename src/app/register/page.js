"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signUp, signIn } from "@/lib/auth-client";
import toast from "react-hot-toast";

export default function RegisterPage() {
  const [form, setForm] = useState({ name: "", email: "", photoUrl: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const router = useRouter();

  const handleChange = (e) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleRegister = async (e) => {
    e.preventDefault();
    if (form.password.length < 6) {
      toast.error("Password must be at least 6 characters.");
      return;
    }
    setLoading(true);
    try {
      const { data, error } = await signUp.email({
        name: form.name,
        email: form.email,
        password: form.password,
        image: form.photoUrl || undefined,
      });
      if (error) {
        toast.error(error.message || "Registration failed. Try again.");
      } else if (data) {
        toast.success("Account created! Please login. 🎉");
        router.push("/login");
      }
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = async () => {
    setGoogleLoading(true);
    try {
      await signIn.social({ provider: "google", callbackURL: "/" });
    } catch {
      toast.error("Google login failed. Please try again.");
      setGoogleLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-sky-50 via-amber-50 to-rose-50 flex items-center justify-center px-4 py-16">
      {/* Decorative blobs */}
      <div className="absolute top-0 right-0 w-72 h-72 bg-sky-300/20 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-amber-300/20 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2" />

      <div className="relative w-full max-w-md">
        <div className="glass-card p-8 md:p-10">
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="w-14 h-14 bg-linear-to-br from-sky-400 to-amber-500 rounded-full flex items-center justify-center text-2xl mx-auto mb-3 shadow-lg">
              🌊
            </div>
            <h1 style={{ fontFamily: "'Playfair Display', serif" }} className="text-3xl font-bold text-stone-900">
              Create Account
            </h1>
            <p className="text-stone-500 mt-1 text-sm">Join SunCart — it&apos;s free!</p>
          </div>

         
          <button
            onClick={handleGoogle}
            disabled={googleLoading}
            className="w-full flex items-center justify-center gap-3 bg-white border-2 border-stone-200 hover:border-amber-300 text-stone-700 font-semibold py-3 px-4 rounded-xl transition-all duration-200 hover:shadow-md mb-5 disabled:opacity-60"
          >
            {googleLoading ? (
              <div className="w-5 h-5 border-2 border-stone-400 border-t-transparent rounded-full animate-spin" />
            ) : (
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
              </svg>
            )}
            {googleLoading ? "Connecting..." : "Sign up with Google"}
          </button>

        
          <div className="flex items-center gap-3 mb-5">
            <div className="flex-1 h-px bg-stone-200" />
            <span className="text-stone-400 text-xs font-medium uppercase tracking-wider">or</span>
            <div className="flex-1 h-px bg-stone-200" />
          </div>

          {/* Form */}
          <form onSubmit={handleRegister} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-stone-700 mb-1.5">Full Name</label>
              <input
                type="text"
                name="name"
                required
                placeholder="Rahim Hossain"
                value={form.name}
                onChange={handleChange}
                className="input-field"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-stone-700 mb-1.5">Email Address</label>
              <input
                type="email"
                name="email"
                required
                placeholder="you@example.com"
                value={form.email}
                onChange={handleChange}
                className="input-field"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-stone-700 mb-1.5">
                Photo URL <span className="text-stone-400 font-normal">(optional)</span>
              </label>
              <input
                type="url"
                name="photoUrl"
                placeholder="https://example.com/photo.jpg"
                value={form.photoUrl}
                onChange={handleChange}
                className="input-field"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-stone-700 mb-1.5">Password</label>
              <input
                type="password"
                name="password"
                required
                placeholder="Min 6 characters"
                value={form.password}
                onChange={handleChange}
                className="input-field"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-sun w-full py-3 text-base mt-2 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Creating Account...
                </>
              ) : (
                "Register →"
              )}
            </button>
          </form>

          <p className="text-center text-stone-500 text-sm mt-6">
            Already have an account?{" "}
            <Link href="/login" className="text-orange-500 font-semibold hover:underline">
              Login 
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}