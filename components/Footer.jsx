// components/Footer.jsx
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-slate-950 border-t border-slate-900 pt-16 pb-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
        {/* Brand Column */}
        <div className="col-span-1 md:col-span-1">
          <div className="flex flex-col mb-4">
            <span className="text-2xl font-black text-white">DJ NATI</span>
            <span className="text-xs font-bold tracking-[0.4em] text-red-600 uppercase">
              CARS
            </span>
          </div>
          <p className="text-gray-500 text-sm leading-relaxed">
            Premium car dealership in Addis Ababa providing the finest luxury
            and performance vehicles.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-white font-bold mb-6 uppercase text-sm tracking-widest">
            Navigation
          </h4>
          <ul className="space-y-4 text-gray-500 text-sm">
            <li>
              <Link
                href="/inventory"
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
                href="/financing"
                className="hover:text-red-500 transition-colors"
              >
                Financing
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
          <p className="text-gray-500 text-sm mb-2">Phone: +251 900 000 000</p>
          <p className="text-gray-500 text-sm font-bold text-red-600">
            Open: Mon-Sat (8am - 6pm)
          </p>
        </div>

        {/* Newsletter */}
        <div>
          <h4 className="text-white font-bold mb-6 uppercase text-sm tracking-widest">
            Newsletter
          </h4>
          <div className="flex">
            <input
              type="email"
              placeholder="Email"
              className="bg-slate-900 border-none text-white text-sm p-3 w-full focus:ring-1 focus:ring-red-600 outline-none"
            />
            <button className="bg-red-600 px-4 text-white font-bold text-xs uppercase">
              Join
            </button>
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
