// export default function AdminLayout({ children }) {
//   return (
//     <div className="min-h-screen bg-gray-100 flex">
//       {/* Sidebar */}
//       <aside className="w-64 bg-black text-white p-6 space-y-6">
//         <h1 className="text-2xl font-bold">Admin Panel</h1>

//         <nav className="space-y-3">
//           <a href="/admin" className="block hover:text-red-400">
//             Dashboard
//           </a>
//           <a href="/admin/cars" className="block hover:text-red-400">
//             Cars
//           </a>
//           <a href="/admin/cars/new" className="block hover:text-red-400">
//             Add Car
//           </a>
//         </nav>
//       </aside>

//       {/* Main Content */}
//       <main className="flex-1 p-6">{children}</main>
//     </div>
//   );
// }
"use client";

import { useState } from "react";
import "../../globals.css";
export default function AdminLayout({ children }) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Top Navbar */}
      <div className="h-16 bg-white shadow flex items-center justify-between px-4">
        <h2 className="font-bold text-lg">Admin Dashboard</h2>
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="md:hidden bg-black text-white px-3 py-1 rounded"
        >
          ☰
        </button>
      </div>

      <div className="flex flex-1">
        {/* Sidebar */}
        <aside
          className={`bg-black text-white transition-all duration-300 ${collapsed ? "w-20" : "w-64"} p-4 space-y-6 hidden md:block`}
        >
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="bg-gray-800 text-white px-2 py-1 rounded w-full"
          >
            {collapsed ? ">" : "<"}
          </button>

          <nav className="space-y-3 mt-4">
            <a href="/admin" className="block hover:text-red-400">
              {collapsed ? "🏠" : "Dashboard"}
            </a>
            <a href="/admin/cars" className="block hover:text-red-400">
              {collapsed ? "🚗" : "Cars"}
            </a>
            <a href="/admin/cars/new" className="block hover:text-red-400">
              {collapsed ? "➕" : "Add Car"}
            </a>
          </nav>
        </aside>

        {/* Mobile Drawer */}
        {collapsed && (
          <div className="md:hidden bg-black text-white p-4 space-y-3">
            <a href="/admin" className="block">
              Dashboard
            </a>
            <a href="/admin/cars" className="block">
              Cars
            </a>
            <a href="/admin/cars/new" className="block">
              Add Car
            </a>
          </div>
        )}

        {/* Content */}
        <main className="flex-1 p-6 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}
