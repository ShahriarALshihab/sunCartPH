import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-stone-900 text-stone-300 pt-14 pb-6 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 bg-linear-to-br from-amber-400 to-rose-500 rounded-full flex items-center justify-center text-white text-base">
                ☀️
              </div>
              <span
                style={{ fontFamily: "'Playfair Display', serif" }}
                className="text-xl font-bold text-white"
              >
                Sun<span className="text-amber-400">Cart</span>
              </span>
            </div>
            <p className="text-stone-400 text-sm leading-relaxed">
              Bangladesh&apos;s premier summer essentials destination. Stay
              cool, stay stylish, stay protected all season long.
            </p>

            <div className="flex gap-3 mt-5">
              {[
                { icon: "f", label: "Facebook", color: "bg-blue-600" },
                { icon: "ig", label: "Instagram", color: "bg-pink-600" },
                { icon: "yt", label: "YouTube", color: "bg-red-600" },
              ].map((s) => (
                <a
                  key={s.label}
                  href="#"
                  aria-label={s.label}
                  className={`w-9 h-9 ${s.color} rounded-full flex items-center justify-center text-white text-xs font-bold hover:scale-110 transition-transform`}
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3
              style={{ fontFamily: "'Playfair Display', serif" }}
              className="text-lg font-bold text-white mb-4"
            >
              Contact Us
            </h3>
            <ul className="space-y-3 text-sm text-stone-400">
              <li className="flex items-start gap-2">
                <span>📍</span>
                <span>Gulshan-1, Dhaka 1212, Bangladesh</span>
              </li>
              <li className="flex items-center gap-2">
                <span>📞</span>
                <span>+880 1700-000000</span>
              </li>
              <li className="flex items-center gap-2">
                <span>✉️</span>
                <span>support@suncart.com.bd</span>
              </li>
              <li className="flex items-center gap-2">
                <span>🕐</span>
                <span>Sat–Thu, 10AM – 8PM (BST)</span>
              </li>
            </ul>
          </div>

          <div>
            <h3
              style={{ fontFamily: "'Playfair Display', serif" }}
              className="text-lg font-bold text-white mb-4"
            >
              Quick Links
            </h3>
            <div className="grid grid-cols-2 gap-2 text-sm">
              {[
                { label: "Home", href: "/" },
                { label: "Products", href: "/products" },
                { label: "Privacy Policy", href: "#" },
                { label: "Terms of Service", href: "#" },
                { label: "Shipping Policy", href: "#" },
                { label: "Return Policy", href: "#" },
              ].map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="text-stone-400 hover:text-amber-400 transition-colors py-0.5"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-stone-800 pt-6 text-center text-sm text-stone-500">
          <p>
            © {new Date().getFullYear()} SunCart Bangladesh. All rights
            reserved.
          </p>
          
        </div>
      </div>
    </footer>
  );
}
