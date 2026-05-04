"use client";

import { use } from "react";
import { useSession } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { products } from "@/data/products";
import Image from "next/image";
import Link from "next/link";
import StarRating from "@/components/ui/StarRating";
import toast from "react-hot-toast";

export default function ProductDetailPage({ params }) {
  const { id } = use(params);
  const { data: session, isPending } = useSession();
  const router = useRouter();

  const product = products.find((p) => p.id === parseInt(id));

  useEffect(() => {
    if (!isPending && !session?.user) {
      toast.error("Please login to view product details!");
      router.push(`/login?redirect=/product/${id}`);
    }
  }, [session, isPending, id, router]);

  if (isPending) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-amber-50">
        <div className="text-center">
          <div className="w-14 h-14 border-4 border-amber-400 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-stone-500">Loading...</p>
        </div>
      </div>
    );
  }

  if (!session?.user) return null;

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-amber-50">
        <div className="text-center">
          <p className="text-6xl mb-4">😕</p>
          <h2 className="text-2xl font-bold text-stone-800 mb-2">
            Product Not Found
          </h2>
          <Link href="/products" className="btn-sun mt-4 inline-block">
            Back to Products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-b from-amber-50 to-white py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2 text-sm text-stone-500 mb-8">
          <Link href="/" className="hover:text-orange-500 transition-colors">
            Home
          </Link>
          <span>/</span>
          <Link
            href="/products"
            className="hover:text-orange-500 transition-colors"
          >
            Products
          </Link>
          <span>/</span>
          <span className="text-stone-800 font-medium line-clamp-1">
            {product.name}
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Image */}
          <div className="relative h-96 lg:h-125 rounded-3xl overflow-hidden shadow-2xl group">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute top-4 right-4">
              <span className="bg-white/90 backdrop-blur-sm text-amber-700 text-sm font-bold px-4 py-1.5 rounded-full shadow">
                {product.category}
              </span>
            </div>
            {product.stock <= 10 && (
              <div className="absolute top-4 left-4">
                <span className="bg-rose-500 text-white text-sm font-bold px-4 py-1.5 rounded-full">
                  Only {product.stock} left!
                </span>
              </div>
            )}
          </div>

          <div className="flex flex-col justify-center">
            <p className="text-sm text-sky-500 font-bold uppercase tracking-widest mb-2">
              {product.brand}
            </p>
            <h1
              style={{ fontFamily: "'Playfair Display', serif" }}
              className="text-3xl md:text-4xl font-bold text-stone-900 mb-4 leading-tight"
            >
              {product.name}
            </h1>

            <div className="flex items-center gap-3 mb-6">
              <StarRating rating={product.rating} />
              <span className="text-stone-500 text-sm">•</span>
              <span className="text-sm text-stone-500">
                {product.stock} in stock
              </span>
            </div>

            <div className="bg-linear-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-2xl p-5 mb-6">
              <p
                style={{ fontFamily: "'Playfair Display', serif" }}
                className="text-4xl font-bold text-orange-600 mb-1"
              >
                <span className="text-sm">BDT</span>
                {product.price.toLocaleString()}
              </p>
              <p className="text-stone-500 text-sm">
                Free delivery on orders above BDT 1000
              </p>
            </div>

            <div className="mb-8">
              <h3 className="font-bold text-stone-800 mb-2 text-sm uppercase tracking-wider">
                Description
              </h3>
              <p className="text-stone-600 leading-relaxed">
                {product.description}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-8">
              {[
                { label: "Category", value: product.category },
                { label: "Brand", value: product.brand },
                { label: "Rating", value: `${product.rating} / 5.0` },
                { label: "Stock", value: `${product.stock} units` },
              ].map(({ label, value }) => (
                <div
                  key={label}
                  className="bg-white rounded-xl p-3 border border-amber-100"
                >
                  <p className="text-xs text-stone-400 uppercase tracking-wider mb-0.5">
                    {label}
                  </p>
                  <p className="font-semibold text-stone-800 text-sm">
                    {value}
                  </p>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="flex gap-3">
              <button
                onClick={() =>
                  toast.success("Added to cart! (Feature coming soon)")
                }
                className="btn-sun flex-1 py-3 text-base"
              >
                🛒 Add to Cart
              </button>
              <button
                onClick={() => toast.success("Added to wishlist!")}
                className="btn-outline-sun py-3 px-5 text-xl"
                aria-label="Add to wishlist"
              >
                🤍
              </button>
            </div>
          </div>
        </div>

        <div className="mt-16 text-center">
          <Link href="/products" className="btn-ocean inline-block">
            ← Browse More Products
          </Link>
        </div>
      </div>
    </div>
  );
}
