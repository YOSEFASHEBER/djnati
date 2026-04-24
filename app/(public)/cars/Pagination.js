import { ArrowLeft, ArrowRight } from "lucide-react";

export default function Pagination({ page, totalPages, updateParams }) {
  return (
    <div className="flex justify-center mt-12 gap-2 flex-wrap">
      <button
        onClick={() => updateParams({ page: Math.max(page - 1, 1) })}
        className="px-3 py-2 bg-white border rounded-xl"
      >
        <ArrowLeft />
      </button>

      {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
        <button
          key={num}
          onClick={() => updateParams({ page: num })}
          className={`px-3 py-2 border rounded-xl ${
            page === num ? "bg-red-600 text-white" : "bg-white"
          }`}
        >
          {num}
        </button>
      ))}

      <button
        onClick={() => updateParams({ page: Math.min(page + 1, totalPages) })}
        className="px-3 py-2 bg-white border rounded-xl"
      >
        <ArrowRight />
      </button>
    </div>
  );
}
