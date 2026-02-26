"use client";

import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import styles from "./AnimatedName.module.css";
import { useEnter } from "../context/EnterContext";

const FULL_NAME = "Reagan Lung";

export default function AnimatedName() {
  const { hasEntered } = useEnter();
  const containerRef = useRef(null);
  const [displayedChars, setDisplayedChars] = useState(0);

  useEffect(() => {
    if (!hasEntered) return;

    const duration = 1.8;
    const charCount = FULL_NAME.length;
    const interval = duration / charCount;

    const timer = setInterval(() => {
      setDisplayedChars((prev) => {
        if (prev >= charCount) {
          clearInterval(timer);
          return charCount;
        }
        return prev + 1;
      });
    }, interval * 1000);

    return () => clearInterval(timer);
  }, [hasEntered]);

  useEffect(() => {
    if (!containerRef.current || !hasEntered) return;
    gsap.fromTo(
      containerRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.5, ease: "power2.out" }
    );
  }, [hasEntered]);

  return (
    <h1 ref={containerRef} className={styles.name}>
      {FULL_NAME.slice(0, displayedChars)}
      <span className={styles.cursor}>|</span>
    </h1>
  );
}
