"use client";

import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import styles from "./AnimatedName.module.css";
import { useEnter } from "../context/EnterContext";

const FULL_NAME = "Reagan Lung";

export default function AnimatedName() {
  const { hasEntered } = useEnter();
  const containerRef = useRef(null);
  const typingTimerRef = useRef(null);
  const nameDoneEmittedRef = useRef(false);
  const [displayedChars, setDisplayedChars] = useState(0);

  useEffect(() => {
    if (!hasEntered) return;
    nameDoneEmittedRef.current = false;
    if (typeof window !== "undefined") {
      window.__reaganNameDone = false;
    }

    const cursorFlashDelay = 0.7;
    const duration = 1.8;
    const charCount = FULL_NAME.length;
    const intervalMs = (duration / charCount) * 1000;

    const startTypingTimer = setTimeout(() => {
      const timer = setInterval(() => {
        setDisplayedChars((prev) => {
          if (prev >= charCount) {
            clearInterval(timer);
            return charCount;
          }
          return prev + 1;
        });
      }, intervalMs);
      typingTimerRef.current = timer;
    }, cursorFlashDelay * 1000);

    return () => {
      clearTimeout(startTypingTimer);
      if (typingTimerRef.current) clearInterval(typingTimerRef.current);
    };
  }, [hasEntered]);

  useEffect(() => {
    if (!hasEntered || displayedChars < FULL_NAME.length || nameDoneEmittedRef.current) return;
    nameDoneEmittedRef.current = true;
    if (typeof window !== "undefined") {
      window.__reaganNameDone = true;
      window.dispatchEvent(new Event("reagan-name:done"));
    }
  }, [displayedChars, hasEntered]);

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
