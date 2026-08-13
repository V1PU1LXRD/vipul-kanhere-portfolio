"use client";

import { useEffect, useState } from "react";

export default function LiveClock({ timezone = "Asia/Kolkata" }) {
  const [time, setTime] = useState("");

  useEffect(() => {
    const fmt = () => {
      try {
        return new Intl.DateTimeFormat("en-GB", {
          timeZone: timezone,
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
        }).format(new Date());
      } catch {
        return "";
      }
    };
    setTime(fmt());
    const id = setInterval(() => setTime(fmt()), 1000);
    return () => clearInterval(id);
  }, [timezone]);

  return (
    <span className="inline-flex items-center gap-2 font-mono text-xs tracking-mega text-muted">
      <span className="relative flex h-1.5 w-1.5">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-60" />
        <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-accent" />
      </span>
      {time} IST
    </span>
  );
}
