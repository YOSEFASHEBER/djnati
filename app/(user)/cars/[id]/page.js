// ===================== CarDetailPage.jsx =====================
import { notFound } from "next/navigation";
import { connectDB } from "@/app/(user)/lib/mongodb";
import Car from "@/app/(user)/lib/Car.model";
import { CarImageGallery } from "@/app/(user)/components/CarImageGallery";

export const dynamic = "force-dynamic";

async function getCar(id) {
  await connectDB();
  const car = await Car.findById(id).lean();
  if (!car) return null;
  return JSON.parse(JSON.stringify(car));
}

export default async function CarDetailPage({ params }) {
  const car = await getCar(params?.id);
  if (!car) return notFound();

  const phoneNumber = "+251931429999";
  const whatsappLink = `https://wa.me/${phoneNumber}?text=Hello, I'm interested in the ${car.name}`;

  return (
    <main className="min-h-screen pt-24 bg-gradient-to-br from-white via-red-50 to-white pb-28">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-10">
          <CarImageGallery images={car?.images || []} name={car?.name} />

          <div className="space-y-5">
            <h1 className="text-4xl font-black">{car?.name}</h1>

            <p className="text-3xl font-extrabold text-red-600">
              {car?.price?.toLocaleString()} ETB
            </p>

            <div
              className={`inline-block px-4 py-1 rounded-full font-semibold ${
                car?.status == "Available"
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {car.status}
            </div>

            <div className="bg-white border rounded-2xl p-5 shadow-sm">
              <h2 className="text-xl font-bold mb-2">Description</h2>
              <p className="text-slate-700 whitespace-pre-line">
                {car.description || "No description available."}
              </p>
            </div>

            <div className="bg-white border rounded-2xl p-5 shadow-sm">
              <h2 className="text-xl font-bold mb-4">Car Details</h2>
              <div className="grid grid-cols-2 gap-y-3 text-sm">
                <p>
                  <b>Brand:</b> {car?.brand}
                </p>
                <p>
                  <b>Model:</b> {car?.name}
                </p>
                <p>
                  <b>Year:</b> {car?.year}
                </p>
                <p>
                  <b>Fuel:</b> {car?.fuelType}
                </p>
                <p>
                  <b>Category:</b> {car?.category}
                </p>
                <p>
                  <b>Transmission:</b> {car?.transmission}
                </p>
              </div>
            </div>

            <div className="flex gap-4 pt-6">
              <a
                href={`tel:${phoneNumber}`}
                className="bg-black text-white px-6 py-3 rounded-xl"
              >
                📞 Call
              </a>
              <a
                href={whatsappLink}
                target="_blank"
                className="bg-green-600 text-white px-6 py-3 rounded-xl"
              >
                💬 WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
