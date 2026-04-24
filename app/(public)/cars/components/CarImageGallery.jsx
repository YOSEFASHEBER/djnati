"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

export function CarImageGallery({ images = [], name = "car" }) {
  const safeImages = useMemo(
    () => images?.filter((img) => img?.url) || [],
    [images],
  );

  const [index, setIndex] = useState(0);
  const [fullscreen, setFullscreen] = useState(false);

  const hasMultiple = safeImages.length > 1;

  const currentImage = safeImages[index]?.url || "/placeholder.png";

  // ================= NAVIGATION =================
  const prev = () => {
    setIndex((i) => (i === 0 ? safeImages.length - 1 : i - 1));
  };

  const next = () => {
    setIndex((i) => (i === safeImages.length - 1 ? 0 : i + 1));
  };

  // ================= KEYBOARD CONTROL =================
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

  // ================= RESET ON IMAGE CHANGE =================
  useEffect(() => {
    setIndex(0);
  }, [safeImages.length]);

  // ================= PRELOAD NEXT IMAGE =================
  useEffect(() => {
    if (!hasMultiple) return;

    const img = new window.Image();
    img.src = safeImages[(index + 1) % safeImages.length]?.url || "";
  }, [index, safeImages, hasMultiple]);

  return (
    <>
      {/* ================= MAIN IMAGE ================= */}
      <div className="space-y-4">
        <div
          className="relative rounded-2xl overflow-hidden border shadow-md bg-white cursor-zoom-in group"
          onClick={() => safeImages.length && setFullscreen(true)}
        >
          <Image
            src={currentImage}
            alt={`${name} main image`}
            width={900}
            height={600}
            priority
            className="w-full h-[420px] object-cover transition group-hover:scale-105 duration-300"
          />

          {/* NAV BUTTONS */}
          {hasMultiple && (
            <div className="absolute inset-0 flex items-center justify-between px-3 opacity-0 group-hover:opacity-100 transition">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  prev();
                }}
                className="bg-black/50 text-white p-2 rounded-full hover:bg-black/70"
              >
                <ChevronLeft size={26} />
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  next();
                }}
                className="bg-black/50 text-white p-2 rounded-full hover:bg-black/70"
              >
                <ChevronRight size={26} />
              </button>
            </div>
          )}
        </div>

        {/* ================= THUMBNAILS ================= */}
        {hasMultiple && (
          <div className="mt-4">
            <p className="text-sm font-semibold text-slate-600 mb-2">
              More Photos
            </p>

            <div className="flex gap-3 overflow-x-auto pb-2 px-1">
              {safeImages.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setIndex(i)}
                  className={`relative shrink-0 rounded-xl overflow-hidden border-2 transition ${
                    index === i
                      ? "border-red-500 scale-105"
                      : "border-slate-200 hover:border-slate-400"
                  }`}
                >
                  <Image
                    src={img.url}
                    alt={`${name} thumbnail ${i + 1}`}
                    width={120}
                    height={90}
                    className="w-[120px] h-[85px] object-cover"
                  />

                  {index === i && (
                    <div className="absolute inset-0 bg-red-500/10" />
                  )}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* ================= FULLSCREEN ================= */}
      {fullscreen && (
        <div
          className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center"
          onClick={() => setFullscreen(false)}
        >
          {/* CLOSE */}
          <button
            onClick={() => setFullscreen(false)}
            className="absolute top-5 right-5 bg-white/20 text-white p-2 rounded-full"
          >
            <X />
          </button>

          {/* PREV */}
          {hasMultiple && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                prev();
              }}
              className="absolute left-5 text-white"
            >
              <ChevronLeft size={38} />
            </button>
          )}

          {/* IMAGE */}
          <Image
            src={currentImage}
            alt={`${name} fullscreen image`}
            width={1400}
            height={900}
            className="max-h-[85vh] object-contain"
            onClick={(e) => e.stopPropagation()}
            priority
          />

          {/* NEXT */}
          {hasMultiple && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                next();
              }}
              className="absolute right-5 text-white"
            >
              <ChevronRight size={38} />
            </button>
          )}
        </div>
      )}
    </>
  );
}
