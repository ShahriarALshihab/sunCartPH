"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const slides = [
  {
    title: "Summer Sale",
    highlight: "50% OFF",
    subtitle:
      "Shop the hottest summer picks — sunglasses, skincare, beach gear & more!",
    badge: "🔥 Limited Time Deal",
    cta: "Shop Now",
    bgImage:
      "https://i.ibb.co/bMWTYZXd/slide1.jpg",
    overlay: "from-orange-900/70 via-amber-800/40 to-transparent",
  },
  {
    title: "Cox's Bazar Ready",
    highlight: "Beach Bundles 🌊",
    subtitle:
      "Everything you need for the perfect beach trip — hat, sunscreen & more.",
    badge: "🌊 Sea Season Special",
    cta: "Explore Beach Gear",
    bgImage:
      "https://i.ibb.co/zW2VqwMR/slide2.jpg",
    overlay: "from-sky-900/70 via-blue-800/40 to-transparent",
  },
  {
    title: "Hot Deals Every Day",
    highlight: "New Arrivals 🔥",
    subtitle:
      "New arrivals weekly. Stay cool with Bangladesh's top summer brands.",
    badge: "✨ Just Dropped",
    cta: "Browse Products",
    bgImage:
      "https://i.ibb.co/QjX7v6xg/slide3.jpg",
    overlay: "from-rose-900/70 via-orange-800/40 to-transparent",
  },
];

export default function HeroSection() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  const slide = slides[current];

  return (
    <section
      className="relative overflow-hidden min-h-[92vh] flex items-center transition-all duration-700"
      style={{
        backgroundImage: `url('${slide.bgImage}')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className={`absolute inset-0 bg-linear-to-r ${slide.overlay}`} />
      <div className="absolute inset-0 bg-black/30" />

      <div className="absolute -top-20 -right-20 w-96 h-96 bg-amber-400/10 rounded-full blur-3xl" />
      <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-orange-500/10 rounded-full blur-3xl" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 w-full">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md border border-white/30 text-white px-5 py-2 rounded-full text-sm font-semibold mb-6 animate-fade-up">
            {slide.badge}
          </div>

          <h1
            style={{ fontFamily: "'Playfair Display', serif" }}
            className="text-5xl md:text-7xl font-bold text-white mb-4 text-shadow animate-fade-up animation-delay-100 leading-tight"
          >
            {slide.title}
            <br />
            <span className="text-amber-300">{slide.highlight}</span>
          </h1>

          <p className="text-white/90 text-lg md:text-xl mb-10 leading-relaxed animate-fade-up animation-delay-200">
            {slide.subtitle}
          </p>

          <div className="flex flex-wrap gap-4 animate-fade-up animation-delay-300">
            <Link
              href="/products"
              className="btn-sun text-base py-3 px-8 shadow-2xl"
            >
              {slide.cta} →
            </Link>
            <Link
              href="/products"
              className="bg-white/20 backdrop-blur-sm border border-white/40 text-white font-bold py-3 px-8 rounded-full hover:bg-white/30 transition-all duration-300"
            >
              Browse All
            </Link>
          </div>

          <div className="flex gap-10 mt-14 animate-fade-up animation-delay-400">
            {[
              { num: "12+", label: "Products" },
              { num: "4.6★", label: "Avg Rating" },
              { num: "100%", label: "Authentic" },
            ].map((s) => (
              <div key={s.label}>
                <p
                  style={{ fontFamily: "'Playfair Display', serif" }}
                  className="text-3xl font-bold text-white text-shadow"
                >
                  {s.num}
                </p>
                <p className="text-white/60 text-xs uppercase tracking-widest mt-0.5">
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            aria-label={`Slide ${i + 1}`}
            className={`h-2 rounded-full transition-all duration-400 ${
              i === current ? "bg-amber-400 w-7" : "bg-white/40 w-2"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
