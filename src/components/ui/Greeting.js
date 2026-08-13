"use client";

import { useEffect, useState } from "react";

/**
 * Greeting — time-of-day aware text in Indian Standard Time.
 * Returns "Good morning" / "Good afternoon" / "Good evening".
 */
export default function Greeting() {
  const [greeting, setGreeting] = useState("Available for work");

  useEffect(() => {
    const compute = () => {
      try {
        const now = new Date();
        const timeStr = new Intl.DateTimeFormat("en-US", {
          timeZone: "Asia/Kolkata",
          hour: "numeric",
          hour12: false,
        }).format(now);
        const hour = parseInt(timeStr, 10);
        let g;
        if (hour >= 5 && hour < 12) g = "Good morning";
        else if (hour >= 12 && hour < 17) g = "Good afternoon";
        else if (hour >= 17 && hour < 22) g = "Good evening";
        else g = "Working late";
        setGreeting(g);
      } catch {
        setGreeting("Available for work");
      }
    };
    compute();
    const id = setInterval(compute, 60_000);
    return () => clearInterval(id);
  }, []);

  return <span>{greeting}</span>;
}
  