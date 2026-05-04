import Link from "next/link";
import Image from "next/image";
import { products } from "@/data/products";

function StarRating({ rating }) {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          className={`text-sm ${star <= Math.round(rating) ? "text-amber-400" : "text-stone-300"}`}
        >
          ★
        </span>
      ))}
      <span className="text-xs text-stone-500 ml-1">({rating})</span>
    </div>
  );
}

export default function PopularProducts() {
  const popular = [...products].sort((a, b) => b.rating - a.rating).slice(0, 3);

  return (
    <section className="py-20 bg-linear-to-b from-white to-amber-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
       
        <div className="text-center mb-14">
          <span className="inline-block bg-amber-100 text-amber-700 px-4 py-1 rounded-full text-sm font-semibold mb-3">
            🔥 Trending Now
          </span>
          <h2 className="section-title mb-3">
            Popular <span className="gradient-text">Products</span>
          </h2>
          <p className="text-stone-500 max-w-lg mx-auto text-sm">
            Bangladesh&apos;s most-loved summer essentials, handpicked for the
            season.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {popular.map((product, i) => (
            <div
              key={product.id}
              className="glass-card overflow-hidden card-hover group"
            >
              <div className="relative h-56 overflow-hidden">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <span className="absolute top-3 right-3 bg-white/90 text-amber-600 text-xs font-bold px-3 py-1 rounded-full shadow">
                  {product.category}
                </span>
                {i === 0 && (
                  <span className="absolute top-3 left-3 bg-rose-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                    ⭐ Top Rated
                  </span>
                )}
              </div>

              <div className="p-5">
                <p className="text-xs text-sky-500 font-semibold uppercase tracking-wider mb-1">
                  {product.brand}
                </p>
                <h3
                  style={{ fontFamily: "'Playfair Display', serif" }}
                  className="text-lg font-bold text-stone-900 mb-2 line-clamp-1"
                >
                  {product.name}
                </h3>
                <StarRating rating={product.rating} />
                <p className="text-stone-500 text-sm mt-2 mb-4 line-clamp-2">
                  {product.description}
                </p>
                <div className="flex items-center justify-between">
                  <p
                    style={{ fontFamily: "'Playfair Display', serif" }}
                    className="text-2xl font-bold text-orange-600"
                  >
                  <span className="text-sm">BDT</span> {product.price.toLocaleString()}
                  </p>
                  <Link
                    href={`/product/${product.id}`}
                    className="btn-sun text-sm py-2 px-5"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link href="/products" className="btn-ocean">
            View All Products →
          </Link>
        </div>
      </div>
    </section>
  );
}
