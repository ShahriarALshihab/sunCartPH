import Link from "next/link";
import Image from "next/image";
import StarRating from "@/components/ui/StarRating";

export default function ProductCard({ product }) {
  return (
    <div className="glass-card overflow-hidden card-hover group flex flex-col">
      <div className="relative h-52 overflow-hidden">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <span className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm text-amber-700 text-xs font-bold px-3 py-1 rounded-full shadow">
          {product.category}
        </span>
        {product.stock <= 10 && (
          <span className="absolute top-3 left-3 bg-rose-500 text-white text-xs font-bold px-2 py-1 rounded-full">
            Low Stock
          </span>
        )}
      </div>

      <div className="p-5 flex flex-col flex-1">
        <p className="text-xs text-sky-500 font-semibold uppercase tracking-wider mb-1">
          {product.brand}
        </p>
        <h3
          style={{ fontFamily: "'Playfair Display', serif" }}
          className="text-base font-bold text-stone-900 mb-2 line-clamp-2 flex-1"
        >
          {product.name}
        </h3>
        <StarRating rating={product.rating} />
        <p className="text-stone-500 text-sm mt-2 mb-4 line-clamp-2">
          {product.description}
        </p>

        <div className="flex items-center justify-between mt-auto">
          <div>
            <p
              style={{ fontFamily: "'Playfair Display', serif" }}
              className="text-xl font-bold text-orange-600"
            >
              <span className="text-sm">BDT</span>{" "}
              {product.price.toLocaleString()}
            </p>
            <p className="text-xs text-stone-400">{product.stock} in stock</p>
          </div>
          <Link
            href={`/product/${product.id}`}
            className="btn-sun text-sm py-2 px-5"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}
