const tips = [
  {
    icon: "🧴",
    title: "Apply Sunscreen Daily",
    desc: "Use SPF 50+ sunscreen every morning, even on cloudy days. Reapply every 2 hours during outdoor activities.",
    color: "from-orange-100 to-amber-50",
    border: "border-orange-200",
  },
  {
    icon: "💧",
    title: "Stay Hydrated",
    desc: "Drink at least 8–10 glasses of water daily. Coconut water and electrolyte drinks are great for replenishing minerals.",
    color: "from-sky-100 to-blue-50",
    border: "border-sky-200",
  },
  {
    icon: "👒",
    title: "Wear Protective Clothing",
    desc: "Choose light-colored, loose-fitting linen or cotton clothes. A wide-brim hat blocks up to 50% of UV radiation.",
    color: "from-amber-100 to-yellow-50",
    border: "border-amber-200",
  },
  {
    icon: "🌿",
    title: "Soothe Sun-Exposed Skin",
    desc: "After sun exposure, apply aloe vera gel or after-sun lotion to cool and repair skin. Avoid hot showers.",
    color: "from-green-100 to-emerald-50",
    border: "border-green-200",
  },
  {
    icon: "😎",
    title: "Protect Your Eyes",
    desc: "Always wear UV400-rated sunglasses outdoors. Sun exposure without eye protection can cause long-term damage.",
    color: "from-violet-100 to-purple-50",
    border: "border-violet-200",
  },
  {
    icon: "🕐",
    title: "Avoid Peak Sun Hours",
    desc: "The sun is strongest between 10AM–4PM in Bangladesh. Stay in shade or indoors during these peak hours.",
    color: "from-rose-100 to-pink-50",
    border: "border-rose-200",
  },
];

export default function SummerCareTips() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-14">
          <span className="inline-block bg-green-100 text-green-700 px-4 py-1 rounded-full text-sm font-semibold mb-3">
            🌿 Summer Wellness
          </span>
          <h2 className="section-title mb-3">
            Summer <span className="gradient-text">Care Tips</span>
          </h2>
          <p className="text-stone-500 max-w-lg mx-auto text-sm">
            Expert tips to keep you healthy, hydrated, and glowing all summer
            long in Bangladesh.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {tips.map((tip, i) => (
            <div
              key={i}
              className={`bg-linear-to-br ${tip.color} border ${tip.border} rounded-2xl p-6 card-hover`}
            >
              <div className="text-4xl mb-4">{tip.icon}</div>
              <h3
                style={{ fontFamily: "'Playfair Display', serif" }}
                className="text-lg font-bold text-stone-900 mb-2"
              >
                {tip.title}
              </h3>
              <p className="text-stone-600 text-sm leading-relaxed">
                {tip.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
