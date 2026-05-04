export default function StarRating({ rating, showCount = true }) {
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
      {showCount && <span className="text-xs text-stone-500 ml-1">({rating})</span>}
    </div>
  );
}