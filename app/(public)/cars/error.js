"use client";

export default function Error({ error }) {
  return (
    <div className="text-center py-20">
      <h2 className="text-xl font-bold">Something went wrong</h2>
      <p>{error.message}</p>
    </div>
  );
}
