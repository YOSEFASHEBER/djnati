import Image from "next/image";

export default function Hero() {
  return (
    <div className="relative h-screen w-full bg-black overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="https://www.mansory.com/cdn-cgi/image/format=avif,quality=90/https://cdn.prod.website-files.com/661d6e0d2e84ef511db18f17/6818c24c1b123c08f62d3ec1_Mercedes-Benz%2520S%2520Coup%25C3%25A9%2520-%2520BLACK%2520EDITION-Hero_image-001.webp"
          alt="Luxury Car"
          fill
          priority
          className="object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/50"></div>
      </div>

      {/* Content */}
      <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center">
        <div className="max-w-2xl">
          <h2 className="text-red-600 font-bold tracking-[0.3em] uppercase mb-2">
            Cars You Rely On
          </h2>

          <h1 className="text-5xl md:text-7xl font-black text-white leading-tight uppercase mb-6">
            Premium New & Used Cars
          </h1>

          <p className="text-gray-300 text-lg mb-10 max-w-lg">
            Trusted seller with over 5+ years of experience in Addis Ababa.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <button className="bg-red-600 hover:bg-red-700 text-white px-10 py-4 font-black uppercase tracking-widest transition-all hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(220,38,38,0.4)]">
              Available Cars
            </button>

            <button className="border-2 border-white/30 hover:border-red-600 text-white px-10 py-4 font-black uppercase tracking-widest backdrop-blur-sm transition-all">
              Contact Us
            </button>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="absolute bottom-0 w-full bg-white/5 backdrop-blur-md border-t border-white/10">
        <div className="max-w-7xl mx-auto px-8 py-6 grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { label: "Cars Sold", value: "200+" },
            { label: "Happy Clients", value: "100+" },
            { label: "Years Exp", value: "5+" },
            { label: "Available Now", value: "20" },
          ].map((stat) => (
            <div key={stat.label} className="text-center md:text-left">
              <div className="text-2xl font-black text-white">{stat.value}</div>
              <div className="text-xs font-bold text-red-600 uppercase tracking-widest">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
