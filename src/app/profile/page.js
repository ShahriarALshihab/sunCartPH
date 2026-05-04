"use client";

import { useSession, signOut } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import toast from "react-hot-toast";
import LottieAnimation from "@/components/ui/LottieAnimation";

export default function ProfilePage() {
  const { data: session, isPending } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!isPending && !session?.user) {
      router.push("/login");
    }
  }, [session, isPending, router]);

  const handleLogout = async () => {
    await signOut();
    toast.success("Logged out! See you soon ☀️");
    router.push("/");
  };

  if (isPending) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-amber-50">
        <div className="text-center">
          <div className="w-14 h-14 border-4 border-amber-400 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-stone-500">Loading your profile...</p>
        </div>
      </div>
    );
  }

  if (!session?.user) return null;

const user = session?.user;

const joinDate = user?.createdAt
  ? new Date(user.createdAt).toLocaleDateString("en-BD", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  : "N/A";

  return (
    <div className="min-h-screen bg-linear-to-b from-amber-50 to-white py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">

        
        <div className="glass-card overflow-hidden mb-6">
        
          <div className="h-32 bg-linear-to-r from-amber-400 via-orange-400 to-rose-400 relative">
            <div className="absolute inset-0 opacity-20"
              style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")" }}
            />
            <div className="absolute top-3 right-3">
              <LottieAnimation className="w-16 h-16 opacity-80" />
            </div>
          </div>

          
          <div className="px-6 pb-6">
            <div className="flex flex-col sm:flex-row sm:items-end gap-4 mt-3 mb-3">
              <div className="relative w-20 h-20 rounded-2xl overflow-hidden border-4 border-white shadow-xl shrink-0">
                {user.image ? (
                  <Image src={user.image} alt={user.name || "User"} fill className="object-cover" />
                ) : (
                  <div className="w-full h-3/4 bg-linear-to-br from-amber-200 to-rose-400 flex items-center justify-center text-white text-3xl font-bold">
                    {user.name?.[0]?.toUpperCase() || "U"}
                  </div>
                )}
              </div>
              <div className="flex-1 sm:mb-2">
                <h1 style={{ fontFamily: "'Playfair Display', serif" }} className="text-2xl font-bold text-stone-900">
                  {user.name}
                </h1>
                <p className="text-stone-500 text-sm">{user.email}</p>
              </div>
              <Link href="/update-profile" className="btn-sun text-sm py-2 px-5 self-start sm:self-auto sm:mb-2">
                ✏️ Edit Profile
              </Link>
            </div>
          </div>
        </div>

        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          {[
            { icon: "👤", label: "Full Name", value: user.name },
            { icon: "✉️", label: "Email Address", value: user.email },
            { icon: "✅", label: "Email Verified", value: user.emailVerified ? "Verified" : "Not Verified" },
            { icon: "📅", label: "Member Since", value: joinDate },
          ].map(({ icon, label, value }) => (
            <div key={label} className="bg-white rounded-2xl p-5 border border-amber-100 shadow-sm">
              <p className="text-xs text-stone-400 uppercase tracking-wider mb-1">{icon} {label}</p>
              <p className="font-semibold text-stone-800 break-all">{value}</p>
            </div>
          ))}
        </div>

       
        <div className="glass-card p-6">
          <h2 style={{ fontFamily: "'Playfair Display', serif" }} className="text-lg font-bold text-stone-800 mb-4">
            Account Actions
          </h2>
          <div className="flex flex-col sm:flex-row gap-3">
            <Link href="/update-profile" className="btn-sun text-sm py-2.5 px-6 text-center">
              ✏️ Update Profile
            </Link>
            <Link href="/products" className="btn-ocean text-sm py-2.5 px-6 text-center">
              🛍️ Browse Products
            </Link>
            <button
              onClick={handleLogout}
              className="border-2 border-rose-300 text-rose-600 font-bold px-6 py-2.5 rounded-full hover:bg-rose-50 transition-all duration-200 text-sm"
            >
              🚪 Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}