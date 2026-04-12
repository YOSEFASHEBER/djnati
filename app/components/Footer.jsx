import Link from "next/link";
import {
  FaFacebookF,
  FaInstagram,
  FaTiktok,
  FaWhatsapp,
  FaTelegramPlane,
  FaTelegram,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-slate-950 border-t border-slate-900 pt-16 pb-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
        {/* Brand + Social */}
        <div>
          <div className="flex flex-col mb-4">
            <span className="text-2xl font-black text-white">DJ NATI</span>
            <span className="text-xs font-bold tracking-[0.4em] text-red-600 uppercase">
              CARS
            </span>
          </div>
          <p className="text-gray-500 text-sm leading-relaxed">
            Trusted marketplace for new and used cars in Addis Ababa.
          </p>
          <div className="flex space-x-4 mt-4">
            <Link
              href="https://web.facebook.com/profile.php?id=100068660768855"
              target="_blank"
              className="text-blue-600 text-lg"
            >
              <FaFacebookF />
            </Link>
            <Link
              href="https://t.me/NatiCarMarket"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white"
            >
              <FaTelegram />
            </Link>
            <Link
              href="https://www.instagram.com/djnaticars/"
              target="_blank"
              className="text-pink-500 text-lg"
            >
              <FaInstagram />
            </Link>
            <Link
              href="https://tiktok.com"
              target="_blank"
              className="bg-white p-1 rounded-full text-black text-lg"
            >
              <FaTiktok />
            </Link>
          </div>
        </div>

        {/* Navigation Links */}
        <div>
          <h4 className="text-white font-bold mb-6 uppercase text-sm tracking-widest">
            Navigation
          </h4>
          <ul className="space-y-4 text-gray-500 text-sm">
            <li>
              <Link
                href="/cars"
                className="hover:text-red-500 transition-colors"
              >
                Inventory
              </Link>
            </li>
            <li>
              <Link
                href="/sell"
                className="hover:text-red-500 transition-colors"
              >
                Sell Your Car
              </Link>
            </li>
            <li>
              <Link
                href="/contact"
                className="hover:text-red-500 transition-colors"
              >
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h4 className="text-white font-bold mb-6 uppercase text-sm tracking-widest">
            Visit Us
          </h4>
          <p className="text-gray-500 text-sm mb-2">Addis Ababa, Ethiopia</p>
          <p className="text-gray-500 text-sm mb-2">Phone: +251 931 429 999</p>
          <p className="text-red-600 text-sm font-bold">
            Open: Mon-Sat (9am - 6pm)
          </p>
        </div>

        {/* Chat Buttons */}
        <div>
          <h4 className="text-white font-bold mb-6 uppercase text-sm tracking-widest">
            Chat With Us
          </h4>
          <div className="flex flex-col space-y-4">
            <a
              href="https://wa.me/251900000000"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center px-4 py-2 bg-green-500 text-white font-bold rounded-md shadow"
            >
              <FaWhatsapp className="mr-2" /> WhatsApp
            </a>
            <a
              href="https://t.me/@DjNaticars"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center px-4 py-2 bg-blue-500 text-white font-bold rounded-md shadow"
            >
              <FaTelegramPlane className="mr-2" /> Telegram
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto border-t border-slate-900 pt-8 text-center">
        <p className="text-gray-600 text-xs">
          © 2026 DJ NATI CARS. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
