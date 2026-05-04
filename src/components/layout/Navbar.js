"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession, signOut } from "@/lib/auth-client";
import toast from "react-hot-toast";

export default function Navbar() {
  const { data: session } = useSession();
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();

  const handleLogout = async () => {
    await signOut();
    toast.success("Logged out successfully!");
    router.push("/");
    setMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-amber-200 shadow-sm">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-9 h-9 bg-linear-to-br from-amber-400 to-rose-500 rounded-full flex items-center justify-center text-white text-lg shadow-md group-hover:scale-110 transition-transform">
              ☀️
            </div>
            <span
              style={{ fontFamily: "'Playfair Display', serif" }}
              className="text-xl font-bold text-stone-900"
            >
              Sun<span className="text-orange-500">Cart</span>
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <Link
              href="/"
              className="text-stone-600 hover:text-orange-500 font-medium transition-colors text-sm"
            >
              Home
            </Link>
            <Link
              href="/products"
              className="text-stone-600 hover:text-orange-500 font-medium transition-colors text-sm"
            >
              Products
            </Link>
            {session?.user && (
              <Link
                href="/profile"
                className="text-stone-600 hover:text-orange-500 font-medium transition-colors text-sm"
              >
                My Profile
              </Link>
            )}
          </div>

          <div className="hidden md:flex items-center gap-3">
            {session?.user ? (
              <div className="dropdown dropdown-end">
                <div
                  tabIndex={0}
                  role="button"
                  className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity"
                >
                  <div className="relative w-9 h-9 rounded-full overflow-hidden border-2 border-amber-400 shadow">
                    {session.user.image ? (
                      <Image
                        src={session.user.image}
                        alt={session.user.name || "User"}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-linear-to-br from-amber-400 to-rose-500 flex items-center justify-center text-white font-bold text-sm">
                        {session.user.name?.[0]?.toUpperCase() || "U"}
                      </div>
                    )}
                  </div>
                  <span className="text-sm font-semibold text-stone-800 max-w-27.5 truncate">
                    {session.user.name}
                  </span>
                  <span className="text-stone-400 text-xs">▾</span>
                </div>
                <ul
                  tabIndex={0}
                  className="dropdown-content menu bg-white rounded-2xl shadow-xl border border-amber-100 p-2 w-48 mt-2 z-100"
                >
                  <li>
                    <Link
                      href="/profile"
                      className="rounded-xl text-stone-700 hover:text-orange-600 hover:bg-orange-50"
                    >
                      👤 My Profile
                    </Link>
                  </li>
                  <div className="divider my-1 h-px bg-amber-100"></div>
                  <li>
                    <button
                      onClick={handleLogout}
                      className="rounded-xl text-rose-600 hover:bg-rose-50 w-full text-left"
                    >
                      🚪 Logout
                    </button>
                  </li>
                </ul>
              </div>
            ) : (
              <>
                <Link
                  href="/login"
                  className="text-sm font-semibold text-stone-600 hover:text-orange-500 transition-colors"
                >
                  Login
                </Link>
                <Link href="/register" className="btn-sun text-sm">
                  Register
                </Link>
              </>
            )}
          </div>

          <button
            className="md:hidden flex flex-col gap-1.5 p-2 rounded-lg hover:bg-amber-50 transition-colors"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <span
              className={`block w-5 h-0.5 bg-stone-700 transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-2" : ""}`}
            />
            <span
              className={`block w-5 h-0.5 bg-stone-700 transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`}
            />
            <span
              className={`block w-5 h-0.5 bg-stone-700 transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`}
            />
          </button>
        </div>

        {menuOpen && (
          <div className="md:hidden py-4 border-t border-amber-100 space-y-1 animate-fade-in">
            <Link
              href="/"
              onClick={() => setMenuOpen(false)}
              className="block px-4 py-2.5 text-stone-700 hover:bg-amber-50 rounded-xl font-medium"
            >
              🏠 Home
            </Link>
            <Link
              href="/products"
              onClick={() => setMenuOpen(false)}
              className="block px-4 py-2.5 text-stone-700 hover:bg-amber-50 rounded-xl font-medium"
            >
              🛍️ Products
            </Link>
            {session?.user && (
              <Link
                href="/profile"
                onClick={() => setMenuOpen(false)}
                className="block px-4 py-2.5 text-stone-700 hover:bg-amber-50 rounded-xl font-medium"
              >
                👤 My Profile
              </Link>
            )}
            <div className="pt-3 border-t border-amber-100 px-4 flex flex-col gap-2">
              {session?.user ? (
                <button
                  onClick={handleLogout}
                  className="text-left py-2 text-rose-600 font-semibold"
                >
                  🚪 Logout
                </button>
              ) : (
                <>
                  <Link
                    href="/login"
                    onClick={() => setMenuOpen(false)}
                    className="py-2 text-stone-700 font-medium"
                  >
                    Login
                  </Link>
                  <Link
                    href="/register"
                    onClick={() => setMenuOpen(false)}
                    className="btn-sun text-sm text-center"
                  >
                    Register
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
