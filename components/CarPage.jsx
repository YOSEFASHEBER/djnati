const cars = [
  {
    id: 1,
    name: "Toyota Land Cruiser 2018",
    price: "4,500,000 ETB",
    images: [
      "https://res.cloudinary.com/demo/image/upload/c_scale,w_500/v1610123456/car2.jpg",
    ],
    video: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    whatsapp: "251912345678",
    telegram: "djnaticars",
    messenger: "djnaticars",
  },
  {
    id: 2,
    name: "Hyundai Tucson 2020",
    price: "3,200,000 ETB",
    images: [
      "https://res.cloudinary.com/demo/image/upload/c_scale,w_500/v1610123456/car1.jpg",
    ],
    video: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    whatsapp: "251912345678",
    telegram: "djnaticars",
    messenger: "djnaticars",
  },
];

export default function CarPage({ params }) {
  const id = Number(params.id);
  const car = cars.find((c) => c.id === id);

  if (!car) return <p className="p-5">Car not found</p>;

  const whatsappLink = `https://wa.me/${car.whatsapp}?text=Hello%2C%20I%20am%20interested%20in%20${encodeURIComponent(
    car.name,
  )}`;
  const telegramLink = `https://t.me/${car.telegram}`;
  const messengerLink = `https://m.me/${car.messenger}`;

  return (
    <div className="p-5">
      <h1 className="text-3xl font-bold">{car.name}</h1>
      <p className="text-xl text-gray-600 mb-4">{car.price}</p>

      <div className="flex gap-3 flex-wrap">
        {car.images.map((img, index) => (
          <img key={index} src={img} alt="" className="w-48 rounded-lg" />
        ))}
      </div>

      <div className="my-5">
        <iframe
          width="560"
          height="315"
          src={car.video}
          title={car.name}
          className="rounded-lg"
          allowFullScreen
        />
      </div>

      <h3 className="text-xl font-semibold mb-2">Contact Seller:</h3>

      <div className="flex gap-3">
        <a
          href={whatsappLink}
          target="_blank"
          className="px-4 py-2 bg-green-500 text-white rounded"
        >
          WhatsApp
        </a>

        <a
          href={telegramLink}
          target="_blank"
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Telegram
        </a>

        <a
          href={messengerLink}
          target="_blank"
          className="px-4 py-2 bg-blue-600 text-white rounded"
        >
          Messenger
        </a>
      </div>
    </div>
  );
}
