"use client";

import { useState, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "@/lib/auth-client";
import toast from "react-hot-toast";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect") || "/";

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data, error } = await signIn.email({ email, password });
      if (error) {
        toast.error(error.message || "Invalid email or password.");
      } else if (data) {
        toast.success("Welcome back! 🌞");
        router.push(redirect);
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
      await signIn.social({ provider: "google", callbackURL: redirect });
    } catch {
      toast.error("Google login failed. Please try again.");
      setGoogleLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-amber-50 via-orange-50 to-rose-50 flex items-center justify-center px-4 py-16">
      <div className="absolute top-0 left-0 w-72 h-72 bg-amber-300/20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-rose-300/20 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />

      <div className="relative w-full max-w-md">
        <div className="glass-card p-8 md:p-10">
          <div className="text-center mb-8">
            <div className="w-14 h-14 bg-linear-to-br from-amber-400 to-rose-500 rounded-full flex items-center justify-center text-2xl mx-auto mb-3 shadow-lg">
              ☀️
            </div>
            <h1
              style={{ fontFamily: "'Playfair Display', serif" }}
              className="text-3xl font-bold text-stone-900"
            >
              Welcome Back
            </h1>
            <p className="text-stone-500 mt-1 text-sm">
              Login to your SunCart account
            </p>
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
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
            )}
            {googleLoading ? "Connecting..." : "Continue with Google"}
          </button>

          <div className="flex items-center gap-3 mb-5">
            <div className="flex-1 h-px bg-stone-200" />
            <span className="text-stone-400 text-xs font-medium uppercase tracking-wider">
              or
            </span>
            <div className="flex-1 h-px bg-stone-200" />
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-stone-700 mb-1.5">
                Email Address
              </label>
              <input
                type="email"
                required
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input-field"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-stone-700 mb-1.5">
                Password
              </label>
              <input
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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
                  Logging in...
                </>
              ) : (
                "Login →"
              )}
            </button>
          </form>

          {/* Register link */}
          <p className="text-center text-stone-500 text-sm mt-6">
            Don&apos;t have an account?{" "}
            <Link
              href="/register"
              className="text-orange-500 font-semibold hover:underline"
            >
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-amber-50 flex items-center justify-center">
          <div className="w-10 h-10 border-4 border-amber-400 border-t-transparent rounded-full animate-spin" />
        </div>
      }
    >
      <LoginForm />
    </Suspense>
  );
}
