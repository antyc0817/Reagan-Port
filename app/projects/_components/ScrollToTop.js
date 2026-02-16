"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function ScrollToTop() {
  const pathname = usePathname();

  useEffect(() => {
    if (pathname?.startsWith("/projects")) {
      requestAnimationFrame(() => {
        window.scrollTo(0, 0);
      });
    }
  }, [pathname]);

  return null;
}
