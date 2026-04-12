import { connectDB } from "@/app/lib/mongodb";
import Car from "@/app/lib/Car.model";

export async function GET(req) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);

    // Pagination
    const page = parseInt(searchParams.get("page")) || 1;
    const limit = parseInt(searchParams.get("limit")) || 20;
    const skip = (page - 1) * limit;

    // Filters
    const category = searchParams.get("category");
    const minPrice = searchParams.get("minPrice");
    const maxPrice = searchParams.get("maxPrice");
    const search = searchParams.get("search");

    let query = {};

    if (category) {
      query.category = category;
    }

    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }

    if (search) {
      query.name = { $regex: search, $options: "i" };
    }

    // Only show available cars for users
    query.status = "Available";

    // Execute queries
    const [cars, total] = await Promise.all([
      Car.find(query).sort({ createdAt: -1 }).skip(skip).limit(limit).lean(),

      Car.countDocuments(query),
    ]);

    return Response.json({
      success: true,
      data: cars,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    return Response.json({
      success: false,
      error: error.message,
    });
  }
}
