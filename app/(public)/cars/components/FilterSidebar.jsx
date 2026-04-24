// export default function FiltersSidebar({ searchParams, updateParams }) {
//   return (
//     <aside className="hidden md:block w-72">
//       <div className="bg-white border rounded-2xl p-6 shadow sticky top-28">
//         <h2 className="text-lg font-bold mb-4">Filters</h2>

//         <input
//           placeholder="Search..."
//           defaultValue={searchParams.search || ""}
//           onChange={(e) => updateParams({ search: e.target.value, page: 1 })}
//           className="w-full p-2 border rounded-lg mb-4"
//         />

//         <select
//           defaultValue={searchParams.category || ""}
//           onChange={(e) => updateParams({ category: e.target.value, page: 1 })}
//           className="w-full p-2 border rounded-lg mb-4"
//         >
//           <option value="">All Categories</option>
//           <option value="SUV">SUV</option>
//           <option value="Sedan">Sedan</option>
//           <option value="Truck">Truck</option>
//         </select>

//         <input
//           type="number"
//           placeholder="Min Price"
//           defaultValue={searchParams.minPrice || ""}
//           onChange={(e) => updateParams({ minPrice: e.target.value, page: 1 })}
//           className="w-full p-2 border rounded-lg mb-3"
//         />

//         <input
//           type="number"
//           placeholder="Max Price"
//           defaultValue={searchParams.maxPrice || ""}
//           onChange={(e) => updateParams({ maxPrice: e.target.value, page: 1 })}
//           className="w-full p-2 border rounded-lg"
//         />
//       </div>
//     </aside>
//   );
// }
export default function FiltersSidebar({ searchParams, updateParams }) {
  return (
    <aside className="hidden md:block w-72">
      <div className="bg-white border border-slate-300 rounded-2xl p-6 shadow-lg sticky top-28">
        <h2 className="text-lg font-bold mb-4 text-slate-900">Filters</h2>

        {/* Search */}
        <input
          placeholder="Search..."
          defaultValue={searchParams.search || ""}
          onChange={(e) => updateParams({ search: e.target.value, page: 1 })}
          className="
            w-full p-2 mb-4 rounded-lg
            border border-slate-400
            text-slate-900
            placeholder:text-slate-500
            focus:outline-none focus:ring-2 focus:ring-red-500
          "
        />

        {/* Category */}
        <select
          defaultValue={searchParams.category || ""}
          onChange={(e) => updateParams({ category: e.target.value, page: 1 })}
          className="
            w-full p-2 mb-4 rounded-lg
            border border-slate-400
            text-slate-900
            focus:outline-none focus:ring-2 focus:ring-red-500
          "
        >
          <option value="">All Categories</option>
          <option value="SUV">SUV</option>
          <option value="Sedan">Sedan</option>
          <option value="Truck">Truck</option>
        </select>

        {/* Min Price */}
        <input
          type="number"
          placeholder="Min Price"
          defaultValue={searchParams.minPrice || ""}
          onChange={(e) => updateParams({ minPrice: e.target.value, page: 1 })}
          className="
            w-full p-2 mb-3 rounded-lg
            border border-slate-400
            text-slate-900
            placeholder:text-slate-500
            focus:outline-none focus:ring-2 focus:ring-red-500
          "
        />

        {/* Max Price */}
        <input
          type="number"
          placeholder="Max Price"
          defaultValue={searchParams.maxPrice || ""}
          onChange={(e) => updateParams({ maxPrice: e.target.value, page: 1 })}
          className="
            w-full p-2 rounded-lg
            border border-slate-400
            text-slate-900
            placeholder:text-slate-500
            focus:outline-none focus:ring-2 focus:ring-red-500
          "
        />
      </div>
    </aside>
  );
}
