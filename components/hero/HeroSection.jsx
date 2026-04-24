import Image from "next/image";
import Link from "next/link";
import Stats from "./Stats";

export default function HeroSection({ availableCars }) {
  return (
    <section className="relative min-h-[100svh] w-full overflow-hidden pt-[80px]">
      <div className="absolute inset-0 scale-105 animate-slowZoom">
        <Image
          src="https://res.cloudinary.com/dznmeumqb/image/upload/v1776802919/dj-nati-cars/bmrikyoquk5eebycuoio.png"
          alt="Cars hero"
          fill
          priority
          className="object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 flex items-center min-h-[calc(100svh-80px)]">
        <div className="max-w-2xl space-y-6 pb-10">
          <div className="inline-flex rounded-full border border-red-300 bg-red-50 px-4 py-1 text-sm font-medium text-red-600">
            Reliable & Affordable Cars in Ethiopia
          </div>

          <h1 className="text-4xl sm:text-6xl font-black text-white leading-tight">
            Find Your Next <span className="text-red-500">Car Easily</span>
          </h1>

          <p className="text-gray-200 text-lg">
            Browse verified cars with transparent pricing and direct seller
            contact.
          </p>

          <div className="flex gap-4">
            <Link
              href="/cars"
              className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 font-bold rounded-2xl"
            >
              Browse Cars
            </Link>

            <Link
              href="/contact"
              className="bg-white text-black px-6 py-3 font-bold rounded-2xl"
            >
              Contact Seller
            </Link>
          </div>
        </div>
      </div>

      <Stats availableCars={availableCars} />
    </section>
  );
}
