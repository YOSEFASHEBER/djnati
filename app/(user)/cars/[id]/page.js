import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { connectDB } from "@/app/(user)/lib/mongodb";
import Car from "@/app/(user)/lib/Car.model";

export const dynamic = "force-dynamic";

async function getCar(id) {
  await connectDB();
  const car = await Car.findById(id).lean();
  if (!car) return null;
  return JSON.parse(JSON.stringify(car));
}

// SEO metadata
export async function generateMetadata({ params }) {
  const car = await getCar(params.id);

  if (!car) {
    return { title: "Car Not Found" };
  }

  return {
    title: `${car.name} for Sale | Genuine Cars`,
    description:
      car.description?.slice(0, 160) || "Buy quality cars in Ethiopia.",
    openGraph: {
      title: car.name,
      images: car.image?.[0] ? [car.image[0]] : [],
    },
  };
}

export default async function CarDetailPage({ params }) {
  const car = await getCar(params.id);
  if (!car) return notFound();

  const phoneNumber = "+251900000000"; // change this
  const whatsappLink = `https://wa.me/${phoneNumber}?text=Hello, I'm interested in the ${car.name}`;

  return (
    <main className="min-h-screen pt-24 bg-gradient-to-br from-white via-red-50 to-white pb-28">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-10">
          {/* IMAGE */}
          <div className="rounded-3xl overflow-hidden border shadow-lg bg-white">
            <Image
              src={car.image?.[0] || "/placeholder.png"}
              alt={car.name}
              width={900}
              height={600}
              className="w-full h-[420px] object-cover"
              priority
            />
          </div>

          {/* INFO */}
          <div className="space-y-5">
            <h1 className="text-4xl font-black">{car.name}</h1>

            {/* Price */}
            <p className="text-3xl font-extrabold text-red-600">
              {car.price?.toLocaleString()} ETB
            </p>

            {/* Availability */}
            <div
              className={`inline-block px-4 py-1 rounded-full font-semibold ${
                car.isAvailable
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {car.isAvailable ? "Available" : "Sold"}
            </div>

            {/* Description */}
            <p className="text-slate-700 leading-relaxed">{car.description}</p>

            {/* Car details */}
            <div className="grid grid-cols-2 gap-4 pt-4 text-slate-800">
              <p>
                <strong>Model:</strong> {car.model}
              </p>
              <p>
                <strong>Year:</strong> {car.year}
              </p>
              <p>
                <strong>Fuel:</strong> {car.fuel}
              </p>
              <p>
                <strong>Category:</strong> {car.category}
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-6">
              <a
                href={`tel:${phoneNumber}`}
                className="bg-black text-white text-center px-6 py-3 rounded-xl font-semibold hover:bg-gray-800 transition"
              >
                📞 Call Now
              </a>

              <a
                href={whatsappLink}
                target="_blank"
                className="bg-green-600 text-white text-center px-6 py-3 rounded-xl font-semibold hover:bg-green-700 transition"
              >
                💬 WhatsApp Seller
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Sticky CTA for mobile */}
      <div className="fixed bottom-0 left-0 w-full bg-white border-t shadow-lg p-3 flex gap-3 md:hidden">
        <a
          href={`tel:${phoneNumber}`}
          className="flex-1 bg-black text-white py-3 rounded-xl text-center font-semibold"
        >
          Call
        </a>

        <a
          href={whatsappLink}
          target="_blank"
          className="flex-1 bg-green-600 text-white py-3 rounded-xl text-center font-semibold"
        >
          WhatsApp
        </a>
      </div>
    </main>
  );
}
