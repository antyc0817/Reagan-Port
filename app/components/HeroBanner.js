"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { useEnter } from "../context/EnterContext";
import styles from "./HeroBanner.module.css";

const HERO_COPY =
  "Transforming messy workflows into seamless digital ecosystems by bridging functional structure and human connection.";
const HERO_WORDS = HERO_COPY.split(" ");

export default function HeroBanner() {
  const { hasEntered } = useEnter();
  const descriptionRef = useRef(null);
  const wordRefs = useRef([]);
  const [showDescription, setShowDescription] = useState(false);

  useEffect(() => {
    if (!hasEntered) return;

    const description = descriptionRef.current;
    const words = wordRefs.current.filter(Boolean);
    if (!description || !words.length) return;

    const runDescriptionAnimation = () => {
      setShowDescription(true);
      gsap.killTweensOf(words);
      gsap.killTweensOf(description);

      requestAnimationFrame(() => {
        gsap.set(description, { opacity: 1, visibility: "visible" });

        // Cleaner word-by-word reveal: masked horizontal wipe + de-skew/de-blur.
        gsap.set(words, {
          opacity: 0,
          clipPath: "inset(0 100% 0 0)",
          skewX: -12,
          scaleX: 0.97,
          filter: "blur(8px)",
          transformOrigin: "0% 50%",
        });

        const tl = gsap.timeline();
        words.forEach((word, index) => {
          const start = index * 0.115;
          tl.to(word, {
            opacity: 1,
            clipPath: "inset(0 0% 0 0)",
            skewX: 0,
            scaleX: 1,
            filter: "blur(0px)",
            duration: 0.26,
            ease: "power2.out",
          }, start)
            .to(word, {
              skewX: index % 2 === 0 ? 0.8 : -0.8,
              duration: 0.045,
              ease: "sine.out",
            }, start + 0.14)
            .to(word, {
              skewX: 0,
              duration: 0.075,
              ease: "sine.inOut",
            }, start + 0.185);
        });
      });
    };

    if (typeof window !== "undefined" && window.__reaganNameDone) {
      runDescriptionAnimation();
      return;
    }

    const onNameDone = () => runDescriptionAnimation();
    window.addEventListener("reagan-name:done", onNameDone, { once: true });
    return () => window.removeEventListener("reagan-name:done", onNameDone);
  }, [hasEntered]);

  return (
    <div className={styles.wrapper}>
      <p
        ref={descriptionRef}
        className={`${styles.description} ${showDescription ? styles.descriptionVisible : styles.descriptionHidden}`}
      >
        {HERO_WORDS.map((word, index) => (
          <span
            key={`${word}-${index}`}
            ref={(el) => {
              wordRefs.current[index] = el;
            }}
            className={styles.descriptionWord}
          >
            {word}
            {index < HERO_WORDS.length - 1 ? "\u00A0" : ""}
          </span>
        ))}
      </p>
      <div className={styles.links}>
        <a href="https://www.linkedin.com/in/reaganlung" target="_blank" rel="noopener noreferrer">[LINKEDIN]</a>
        <span className={styles.linkPlaceholder}>[EMAIL]</span>
        <a href="/Reagan%20Resume.pdf" target="_blank" rel="noopener noreferrer">[RESUME]</a>
      </div>
    </div>
  );
}
