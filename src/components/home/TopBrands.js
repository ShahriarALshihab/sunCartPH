const brands = [
  {
    name: "Aarong",
    tagline: "Traditional Bangladeshi Crafts",
    icon: "🌺",
    products: "12+ Products",
    color: "from-rose-500 to-pink-400",
    bg: "bg-rose-50",
  },
  {
    name: "Garnier BD",
    tagline: "Skincare & Sun Protection",
    icon: "🌿",
    products: "8+ Products",
    color: "from-green-500 to-emerald-400",
    bg: "bg-green-50",
  },
  {
    name: "Cox's Crafts",
    tagline: "Beach Accessories",
    icon: "🏖️",
    products: "15+ Products",
    color: "from-sky-500 to-blue-400",
    bg: "bg-sky-50",
  },
  {
    name: "SunShade BD",
    tagline: "UV Protection Eyewear",
    icon: "🕶️",
    products: "20+ Products",
    color: "from-amber-500 to-orange-400",
    bg: "bg-amber-50",
  },
];

export default function TopBrands() {
  return (
    <section className="py-20 bg-linear-to-b from-amber-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-14">
          <span className="inline-block bg-amber-100 text-amber-700 px-4 py-1 rounded-full text-sm font-semibold mb-3">
            🏆 Trusted Brands
          </span>
          <h2 className="section-title mb-3">
            Top <span className="gradient-text">Brands</span>
          </h2>
          <p className="text-stone-500 max-w-lg mx-auto text-sm">
            We partner with the best summer brands Bangladesh has to offer.
          </p>
        </div>

       
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {brands.map((brand) => (
            <div key={brand.name} className={`${brand.bg} rounded-2xl p-6 text-center card-hover border border-white shadow-md group`}>
              <div className={`w-16 h-16 mx-auto mb-4 rounded-full bg-linear-to-br ${brand.color} flex items-center justify-center text-2xl shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                {brand.icon}
              </div>
              <h3 style={{ fontFamily: "'Playfair Display', serif" }} className="text-lg font-bold text-stone-900 mb-1">
                {brand.name}
              </h3>
              <p className="text-stone-500 text-xs mb-3">{brand.tagline}</p>
              <span className={`inline-block bg-linear-to-r ${brand.color} text-white text-xs font-semibold px-3 py-1 rounded-full`}>
                {brand.products}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}