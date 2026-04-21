"use client";

import { useState } from "react";
import { LayoutDashboard, Car, PlusCircle, Menu, X } from "lucide-react";

export default function AdminLayout({ children }) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const navItems = [
    { label: "Dashboard", icon: LayoutDashboard, href: "/admin" },
    { label: "Cars", icon: Car, href: "/admin/cars" },
    { label: "Add Car", icon: PlusCircle, href: "/admin/cars/new" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-white to-slate-200 flex flex-col">
      {/* TOP BAR */}
      <header className="h-16 bg-white/80 backdrop-blur-md border-b flex items-center justify-between px-4 shadow-sm">
        <h1 className="font-bold text-lg text-slate-800">DJ NATI Admin</h1>

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden p-2 rounded-lg bg-slate-900 text-white"
        >
          {mobileOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      </header>

      <div className="flex flex-1">
        {/* SIDEBAR (DESKTOP) */}
        <aside
          className={`hidden md:flex flex-col transition-all duration-300
          ${collapsed ? "w-20" : "w-64"}
          bg-white/70 backdrop-blur-xl border-r shadow-lg`}
        >
          {/* Toggle */}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="m-3 p-2 rounded-lg bg-slate-900 text-white hover:scale-105 transition"
          >
            {collapsed ? "→" : "←"}
          </button>

          {/* Nav */}
          <nav className="flex flex-col gap-2 mt-2 px-2">
            {navItems.map((item, i) => (
              <a
                key={i}
                href={item.href}
                className="flex items-center gap-3 px-3 py-3 rounded-xl text-slate-700 hover:bg-red-500 hover:text-white transition"
              >
                <item.icon size={18} />
                {!collapsed && (
                  <span className="text-sm font-medium">{item.label}</span>
                )}
              </a>
            ))}
          </nav>
        </aside>

        {/* MOBILE DRAWER */}
        {mobileOpen && (
          <div className="md:hidden absolute top-16 left-0 w-full bg-white border-b shadow-lg z-50">
            <div className="p-4 flex flex-col gap-2">
              {navItems.map((item, i) => (
                <a
                  key={i}
                  href={item.href}
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-red-500 hover:text-white transition"
                >
                  <item.icon size={18} />
                  <span>{item.label}</span>
                </a>
              ))}
            </div>
          </div>
        )}

        {/* MAIN CONTENT */}
        <main className="flex-1 p-6 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}
