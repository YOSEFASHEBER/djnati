// import { connectDB } from "@/app/(user)/lib/mongodb";
// import Car from "@/app/(user)/lib/Car.model";

// export async function GET(req) {
//   try {
//     await connectDB();

//     const { searchParams } = new URL(req.url);

//     // Pagination
//     const page = parseInt(searchParams.get("page")) || 1;
//     const limit = parseInt(searchParams.get("limit")) || 20;
//     const skip = (page - 1) * limit;

//     // Filters
//     const category = searchParams.get("category");
//     const minPrice = searchParams.get("minPrice");
//     const maxPrice = searchParams.get("maxPrice");
//     const search = searchParams.get("search");

//     let query = {};

//     if (category) {
//       query.category = category;
//     }

//     if (minPrice || maxPrice) {
//       query.price = {};
//       if (minPrice) query.price.$gte = Number(minPrice);
//       if (maxPrice) query.price.$lte = Number(maxPrice);
//     }

//     if (search) {
//       query.name = { $regex: search, $options: "i" };
//     }

//     // Only show available cars for users
//     // query.status = "Available";

//     // Execute queries
//     const [cars, total] = await Promise.all([
//       Car.find(query).sort({ createdAt: -1 }).skip(skip).limit(limit).lean(),

//       Car.countDocuments(query),
//     ]);

//     return Response.json({
//       success: true,
//       data: cars,
//       pagination: {
//         page,
//         limit,
//         total,
//         totalPages: Math.ceil(total / limit),
//       },
//     });
//   } catch (error) {
//     return Response.json({
//       success: false,
//       error: error.message,
//     });
//   }
// }

import { connectDB } from "@/app/(user)/lib/mongodb";
import Car from "@/app/(user)/lib/Car.model";

export async function GET(req) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);

    // ================= PAGINATION =================
    const page = parseInt(searchParams.get("page")) || 1;
    const limit = parseInt(searchParams.get("limit")) || 20;
    const skip = (page - 1) * limit;

    // ================= FILTERS =================
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

    // ================= DATA + STATS (ONE REQUEST) =================
    const [cars, filteredTotal, totalCars, available, sold, reserved] =
      await Promise.all([
        Car.find(query).sort({ createdAt: -1 }).skip(skip).limit(limit).lean(),

        Car.countDocuments(query), // for pagination

        Car.countDocuments(), // ALL cars

        Car.countDocuments({ status: "Available" }),

        Car.countDocuments({ status: "Sold" }),

        Car.countDocuments({ status: "Reserved" }),
      ]);

    // ================= RESPONSE =================
    return Response.json({
      success: true,

      data: cars,

      stats: {
        total: totalCars,
        filteredTotal,
        available,
        sold,
        reserved,
      },

      pagination: {
        page,
        limit,
        total: filteredTotal,
        totalPages: Math.ceil(filteredTotal / limit),
      },
    });
  } catch (error) {
    return Response.json(
      {
        success: false,
        error: error.message,
      },
      { status: 500 },
    );
  }
}
