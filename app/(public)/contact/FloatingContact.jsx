"use client";

import { FaWhatsapp, FaTelegramPlane } from "react-icons/fa";

export default function FloatingContact() {
  return (
    <div className="fixed bottom-5 right-5 flex flex-col gap-3 z-50">
      {/* WhatsApp */}
      <a
        href="https://wa.me/251923708473"
        target="_blank"
        rel="noopener noreferrer"
        className="w-12 h-12 flex items-center justify-center rounded-full bg-green-500 text-white shadow-lg hover:scale-110 transition"
      >
        <FaWhatsapp size={22} />
      </a>

      {/* Telegram */}
      <a
        href="https://t.me/DjNaticars"
        target="_blank"
        rel="noopener noreferrer"
        className="w-12 h-12 flex items-center justify-center rounded-full bg-blue-500 text-white shadow-lg hover:scale-110 transition"
      >
        <FaTelegramPlane size={22} />
      </a>
    </div>
  );
}
