/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useState, useEffect } from "react";
import { useSession, updateUser } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import toast from "react-hot-toast";

export default function UpdateProfilePage() {
  const { data: session, isPending } = useSession();
  const router = useRouter();
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);

useEffect(() => {
  if (!isPending && !session?.user) {
    router.push("/login");
  }
}, [isPending, session, router]);

useEffect(() => {
  if (session?.user) {
    setName((prev) =>
      prev !== (session.user.name || "") ? session.user.name || "" : prev
    );

    setImage((prev) =>
      prev !== (session.user.image || "") ? session.user.image || "" : prev
    );
  }
}, [session?.user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim()) {
      toast.error("Name cannot be empty.");
      return;
    }
    setLoading(true);
    try {
      const { data, error } = await updateUser({
        name: name.trim(),
        image: image.trim() || undefined,
      });
      if (error) {
        toast.error(error.message || "Failed to update profile.");
      } else {
        toast.success("Profile updated successfully! 🎉");
        router.push("/profile");
      }
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (isPending) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-amber-50">
        <div className="w-14 h-14 border-4 border-amber-400 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!session?.user) return null;

  return (
    <div className="min-h-screen bg-linear-to-br from-amber-50 via-orange-50 to-white py-12">
      <div className="max-w-lg mx-auto px-4">

       
        <Link href="/profile" className="inline-flex items-center gap-2 text-stone-500 hover:text-orange-500 transition-colors text-sm mb-6 font-medium">
          ← Back to Profile
        </Link>

        <div className="glass-card p-8 md:p-10">
       
          <div className="text-center mb-8">
            <div className="w-12 h-12 bg-linear-to-br from-amber-400 to-rose-500 rounded-full flex items-center justify-center text-xl mx-auto mb-3 shadow-md">
              ✏️
            </div>
            <h1 style={{ fontFamily: "'Playfair Display', serif" }} className="text-2xl font-bold text-stone-900">
              Update Profile
            </h1>
            <p className="text-stone-500 text-sm mt-1">Change your name and profile photo</p>
          </div>

          
          <div className="flex justify-center mb-8">
            <div className="relative w-24 h-24 rounded-full overflow-hidden border-4 border-amber-300 shadow-lg">
              {image ? (
                <Image src={image} alt="Preview" fill className="object-cover" onError={() => {}} />
              ) : (
                <div className="w-full h-full bg-linear-to-br from-amber-400 to-rose-500 flex items-center justify-center text-white text-3xl font-bold">
                  {name?.[0]?.toUpperCase() || "U"}
                </div>
              )}
            </div>
          </div>

          
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-stone-700 mb-1.5">Full Name</label>
              <input
                type="text"
                required
                placeholder="Your full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="input-field"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-stone-700 mb-1.5">
                Photo URL <span className="text-stone-400 font-normal">(paste image link)</span>
              </label>
              <input
                type="url"
                placeholder="https://example.com/photo.jpg"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                className="input-field"
              />
            
            </div>

            <div className="flex gap-3 pt-2">
              <button
                type="submit"
                disabled={loading}
                className="btn-sun flex-1 py-3 text-base disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Saving...
                  </>
                ) : (
                  "Update Information"
                )}
              </button>
              <Link href="/profile" className="btn-outline-sun py-3 px-5 text-sm flex items-center">
                Cancel
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}