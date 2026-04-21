// "use client";

// import { useState, useEffect } from "react";
// import Image from "next/image";
// import { ChevronLeft, ChevronRight, X } from "lucide-react";

// export function CarImageGallery({ images = [], name }) {
//   const [selectedIndex, setSelectedIndex] = useState(0);
//   const [fullscreen, setFullscreen] = useState(false);

//   const selected = images && images[selectedIndex]?.url;

//   const prev = () => {
//     setSelectedIndex((prev) => (prev - 1 + images.length) % images.length);
//   };

//   const next = () => {
//     setSelectedIndex((prev) => (prev + 1) % images.length);
//   };

//   // Keyboard controls
//   useEffect(() => {
//     const handleKey = (e) => {
//       if (!fullscreen) return;
//       if (e.key === "ArrowRight") next();
//       if (e.key === "ArrowLeft") prev();
//       if (e.key === "Escape") setFullscreen(false);
//     };

//     window.addEventListener("keydown", handleKey);
//     return () => window.removeEventListener("keydown", handleKey);
//   }, [fullscreen]);

//   return (
//     <>
//       <div className="space-y-4">
//         {/* MAIN IMAGE */}
//         <div
//           className="relative rounded-3xl overflow-hidden border shadow-lg bg-white cursor-zoom-in"
//           onClick={() => setFullscreen(true)}
//         >
//           <Image
//             src={selected || "/placeholder.png"}
//             alt={name}
//             width={900}
//             height={600}
//             className="w-full h-[420px] object-cover hover:scale-105 transition duration-300"
//             priority
//           />

//           {images.length > 1 && (
//             <div className="absolute inset-0 flex justify-between items-center px-3">
//               <button
//                 onClick={(e) => {
//                   e.stopPropagation();
//                   prev();
//                 }}
//                 className="bg-black/50 text-white p-2 rounded-full"
//               >
//                 <ChevronLeft size={28} />
//               </button>
//               <button
//                 onClick={(e) => {
//                   e.stopPropagation();
//                   next();
//                 }}
//                 className="bg-black/50 text-white p-2 rounded-full"
//               >
//                 <ChevronRight size={28} />
//               </button>
//             </div>
//           )}
//         </div>

//         {/* THUMBNAILS */}
//         <div className="flex gap-3 overflow-x-auto">
//           {images.map((img, i) => (
//             <div
//               key={i}
//               onClick={() => {
//                 setSelectedIndex(i);
//                 setFullscreen(true);
//               }}
//               className={`cursor-pointer border-2 rounded-xl overflow-hidden ${
//                 selectedIndex === i ? "border-red-500" : "border-transparent"
//               }`}
//             >
//               <Image
//                 src={img.url}
//                 alt={`${name}-${i}`}
//                 width={120}
//                 height={80}
//                 className="w-[110px] h-[80px] object-cover"
//               />
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* FULLSCREEN */}
//       {fullscreen && (
//         <div
//           className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center"
//           onClick={() => setFullscreen(false)}
//         >
//           {/* Close */}
//           <button
//             onClick={() => setFullscreen(false)}
//             className="absolute top-5 right-5 bg-white/20 backdrop-blur-md text-white p-2 rounded-full hover:bg-white/30 transition"
//           >
//             <X size={24} />
//           </button>

//           {/* Prev */}
//           <button
//             onClick={(e) => {
//               e.stopPropagation();
//               prev();
//             }}
//             className="absolute left-5 text-white text-4xl z-50"
//           >
//             <ChevronLeft size={28} />
//           </button>

//           {/* Image */}
//           <Image
//             src={selected || "/placeholder.png"}
//             alt={name}
//             width={1400}
//             height={900}
//             className="max-h-[85vh] object-contain"
//             onClick={(e) => e.stopPropagation()}
//           />

//           {/* Next */}
//           <button
//             onClick={(e) => {
//               e.stopPropagation();
//               next();
//             }}
//             className="absolute right-5 text-white text-4xl z-50"
//           >
//             <ChevronRight size={28} />
//           </button>
//         </div>
//       )}
//     </>
//   );
// }

"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

export function CarImageGallery({ images = [], name = "car" }) {
  const safeImages = images?.filter((img) => img?.url) || [];

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [fullscreen, setFullscreen] = useState(false);

  const selected = safeImages[selectedIndex]?.url || "/placeholder.png";

  const hasMultiple = safeImages.length > 1;

  const prev = () => {
    setSelectedIndex((prev) => (prev === 0 ? safeImages.length - 1 : prev - 1));
  };

  const next = () => {
    setSelectedIndex((prev) => (prev === safeImages.length - 1 ? 0 : prev + 1));
  };

  // Keyboard controls (only fullscreen)
  useEffect(() => {
    if (!fullscreen) return;

    const handleKey = (e) => {
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "Escape") setFullscreen(false);
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [fullscreen, safeImages.length]);

  // Reset index if images change
  useEffect(() => {
    setSelectedIndex(0);
  }, [safeImages.length]);

  return (
    <>
      <div className="space-y-4">
        {/* MAIN IMAGE */}
        <div
          className="relative rounded-3xl overflow-hidden border shadow-lg bg-white cursor-zoom-in group"
          onClick={() => safeImages.length && setFullscreen(true)}
        >
          <Image
            src={selected}
            alt={name}
            width={900}
            height={600}
            unoptimized // 🔥 prevents Cloudinary timeout
            className="w-full h-[420px] object-cover transition duration-300 group-hover:scale-105"
          />

          {/* Navigation */}
          {hasMultiple && (
            <div className="absolute inset-0 flex justify-between items-center px-3 opacity-0 group-hover:opacity-100 transition">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  prev();
                }}
                className="bg-black/50 hover:bg-black/70 text-white p-2 rounded-full"
              >
                <ChevronLeft size={28} />
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  next();
                }}
                className="bg-black/50 hover:bg-black/70 text-white p-2 rounded-full"
              >
                <ChevronRight size={28} />
              </button>
            </div>
          )}
        </div>

        {/* THUMBNAILS */}
        {safeImages.length > 0 && (
          <div className="flex gap-3 overflow-x-auto pb-2">
            {safeImages.map((img, i) => (
              <div
                key={i}
                onClick={() => {
                  setSelectedIndex(i);
                  setFullscreen(true);
                }}
                className={`cursor-pointer border-2 rounded-xl overflow-hidden shrink-0 transition ${
                  selectedIndex === i
                    ? "border-red-500"
                    : "border-transparent hover:border-gray-300"
                }`}
              >
                <Image
                  src={img.url}
                  alt={`${name}-${i}`}
                  width={120}
                  height={80}
                  unoptimized
                  className="w-[110px] h-[80px] object-cover"
                />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* FULLSCREEN VIEW */}
      {fullscreen && (
        <div
          className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center"
          onClick={() => setFullscreen(false)}
        >
          {/* Close */}
          <button
            onClick={() => setFullscreen(false)}
            className="absolute top-5 right-5 bg-white/20 backdrop-blur-md text-white p-2 rounded-full hover:bg-white/30 transition"
          >
            <X size={24} />
          </button>

          {/* Prev */}
          {hasMultiple && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                prev();
              }}
              className="absolute left-5 text-white z-50"
            >
              <ChevronLeft size={34} />
            </button>
          )}

          {/* Image */}
          <Image
            src={selected}
            alt={name}
            width={1400}
            height={900}
            unoptimized
            className="max-h-[85vh] object-contain"
            onClick={(e) => e.stopPropagation()}
          />

          {/* Next */}
          {hasMultiple && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                next();
              }}
              className="absolute right-5 text-white z-50"
            >
              <ChevronRight size={34} />
            </button>
          )}
        </div>
      )}
    </>
  );
}
