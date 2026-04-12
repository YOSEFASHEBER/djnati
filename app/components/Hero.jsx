//
import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <div className="relative h-screen w-full overflow-hidden">
      {/* // https://images.unsplash.com/photo-1552519507-da3b142c6e3d */}
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1553440569-bcc63803a83d?q=80&w=2025&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Cars"
          fill
          priority
          className="object-cover opacity-80"
        />

        {/* Softer overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent"></div>
      </div>

      {/* Content */}
      <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 flex items-center">
        <div className="max-w-2xl">
          <h2 className="text-red-500 font-bold tracking-wide uppercase mb-2">
            Reliable & Affordable Cars
          </h2>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white leading-tight mb-5">
            Find Your Next Car Easily
          </h1>

          <p className="text-gray-200 text-base sm:text-lg mb-8">
            Quality new and used cars you can trust in Addis Ababa.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/cars">
              <button className="bg-red-500 hover:bg-red-600 text-white px-8 py-3 font-bold rounded-lg transition">
                Browse Cars
              </button>
            </Link>
            <Link href="/contact">
              <button className="bg-white/80 hover:bg-white text-black px-8 py-3 font-bold rounded-lg transition">
                Contact Seller
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="absolute bottom-0 w-full bg-white/80 backdrop-blur-md border-t">
        <div className="max-w-7xl mx-auto px-4 py-5 grid grid-cols-2 md:grid-cols-4 gap-6 text-center md:text-left">
          {[
            { label: "Cars Sold", value: "200+" },
            { label: "Happy Clients", value: "100+" },
            { label: "Years Experience", value: "5+" },
            { label: "Available", value: "20+" },
          ].map((stat) => (
            <div key={stat.label}>
              <div className="text-xl font-bold text-gray-900">
                {stat.value}
              </div>
              <div className="text-xs font-semibold text-red-500 uppercase">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
