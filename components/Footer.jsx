import { useRef } from "react";
import Link from "next/link";
import {
  FaFacebookF,
  FaInstagram,
  FaTiktok,
  FaWhatsapp,
  FaTelegram,
  FaTelegramPlane,
  FaYoutube,
} from "react-icons/fa";
import { useRouter } from "next/navigation";

export default function Footer() {
  const year = new Date().getFullYear();
  const router = useRouter();

  const clickCount = useRef(0);
  const timer = useRef(null);

  const handleSecretClick = () => {
    clickCount.current += 1;

    // reset after 1.5s
    clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      clickCount.current = 0;
    }, 1500);

    // trigger after 3 clicks
    if (clickCount.current === 3) {
      router.push("/admin");
    }
  };

  return (
    <footer className="bg-gradient-to-b from-slate-950 to-black border-t border-slate-800 pt-16 pb-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
        {/* Brand (SECRET CLICK AREA) */}
        <div onClick={handleSecretClick} className="cursor-default select-none">
          <div className="flex flex-col mb-4">
            <span className="text-2xl font-black text-white tracking-wide">
              DJ NATI
            </span>
            <span className="text-xs font-bold tracking-[0.4em] text-red-500 uppercase">
              Cars
            </span>
          </div>

          <p className="text-gray-400 text-sm leading-relaxed">
            Trusted marketplace for new and used cars in Addis Ababa.
          </p>

          {/* Social */}
          <div className="flex space-x-3 mt-5">
            <SocialIcon
              href="https://www.facebook.com/share/17VoAzciVc/"
              icon={<FaFacebookF />}
              color="hover:bg-blue-600"
            />

            <SocialIcon
              href="https://t.me/NatiCarMarket"
              icon={<FaTelegram />}
              color="hover:bg-sky-500"
            />

            <SocialIcon
              href="https://www.instagram.com/djnaticars/"
              icon={<FaInstagram />}
              color="hover:bg-pink-500"
            />

            <SocialIcon
              href="https://www.tiktok.com/@djnaticarmarket"
              icon={<FaTiktok />}
              color="hover:bg-white hover:text-black"
            />
            <SocialIcon
              href="https://youtube.com/@djnaticarmarket-u2x?si=OS2GFQMHxw6KF7q1"
              icon={<FaYoutube />}
              color="hover:bg-pink-700 hover:text-red"
            />
          </div>
        </div>

        {/* Navigation */}
        <div>
          <h4 className="text-white font-semibold mb-6 text-sm tracking-widest uppercase">
            Navigation
          </h4>

          <ul className="space-y-3 text-gray-400 text-sm">
            <li>
              <Link href="/cars" className="hover:text-red-500 transition">
                Inventory
              </Link>
            </li>

            <li>
              <Link href="/contact" className="hover:text-red-500 transition">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="text-white font-semibold mb-6 text-sm tracking-widest uppercase">
            Visit Us
          </h4>

          <p className="text-gray-400 text-sm mb-2">Addis Ababa, Ethiopia</p>
          <p className="text-gray-400 text-sm mb-2">+251 923 708 473</p>

          <p className="text-red-500 text-sm font-semibold">
            Open: Mon–Sat (9am – 6pm)
          </p>
        </div>

        {/* Chat */}
        <div>
          <h4 className="text-white font-semibold mb-6 text-sm tracking-widest uppercase">
            Chat With Us
          </h4>

          <div className="space-y-3">
            <a
              href="https://wa.me/251923708473?text=Hello%20I%20am%20interested%20in%20a%20car%20from%20your%20website"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-md bg-green-500/90 hover:bg-green-500 text-white font-semibold transition"
            >
              <FaWhatsapp /> WhatsApp
            </a>

            <a
              href="https://t.me/DjNaticars"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-md bg-blue-500/90 hover:bg-blue-500 text-white font-semibold transition"
            >
              <FaTelegramPlane /> Telegram
            </a>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="max-w-7xl mx-auto border-t border-slate-800 pt-6 text-center">
        <p className="text-gray-500 text-xs">
          © {year} DJ NATI CARS. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}

/* SOCIAL ICON */
function SocialIcon({ href, icon, color }) {
  return (
    <Link
      href={href}
      target="_blank"
      className={`w-9 h-9 flex items-center justify-center rounded-full bg-slate-800 text-white transition ${color}`}
    >
      {icon}
    </Link>
  );
}
