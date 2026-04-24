import CarCard from "@/components/ui/CarCard";
import CarSkeleton from "@/components/ui/CarSkeleton";

export default function CarsGrid({ cars, loading }) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <CarSkeleton key={i} />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {cars.map((car) => (
        <CarCard key={car?._id} car={car} />
      ))}
    </div>
  );
}
