"use client";

import { useEffect, useState } from "react";

function useCountUp(target, start, duration = 1400) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!start) return;

    let current = 0;
    const increment = target / (duration / 16);

    const timer = setInterval(() => {
      current += increment;

      if (current >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [target, start, duration]);

  return count;
}

export default function StatItem({ label, value, start }) {
  const count = useCountUp(value, start);

  return (
    <div className="transform transition hover:scale-105 duration-300">
      <div className="text-lg sm:text-xl font-bold text-slate-900">
        {count}+
      </div>

      <div className="text-[10px] sm:text-xs font-semibold text-red-500 uppercase tracking-wider">
        {label}
      </div>
    </div>
  );
}
