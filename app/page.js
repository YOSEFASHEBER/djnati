import CarCard from "@/components/Carcard";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Inventory from "@/components/Inventory";

const cars = [
  {
    id: 1,
    name: "Toyota Land Cruiser 2018",
    price: "4,500,000 ETB",
    images: [
      "https://res.cloudinary.com/demo/image/upload/c_scale,w_500/v1610123456/car3.jpg",
    ],
  },
  {
    id: 2,
    name: "Hyundai Tucson 2020",
    price: "3,200,000 ETB",
    images: [
      "https://images.unsplash.com/photo-1520031441872-265e4ff70366?q=80&w=500",
    ],
  },
];

export default function Home() {
  return (
    <>
      <Hero />
      <Inventory />
      <Footer />
    </>
  );
}
