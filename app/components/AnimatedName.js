"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import gsap from "gsap";
import styles from "./AnimatedName.module.css";

export default function AnimatedName() {
  const rRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        rRef.current,
        {
          scale: 0,
          rotation: -15,
          opacity: 0,
        },
        {
          scale: 1,
          rotation: 0,
          opacity: 1,
          duration: 0.9,
          ease: "back.out(1.4)",
          delay: 0.2,
        }
      );

      gsap.fromTo(
        textRef.current,
        {
          x: 30,
          opacity: 0,
        },
        {
          x: 0,
          opacity: 1,
          duration: 0.6,
          ease: "power2.out",
          delay: 0.5,
        }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <h1 className={styles.name}>
      <span className={styles.rAndEagan}>
        <span ref={rRef} className={styles.nameIconWrapper}>
          <Image src="/icons/r-icon.png" alt="R" fill className={styles.nameIcon} sizes="20rem" unoptimized />
        </span>
        <span ref={textRef} className={styles.nameEagan}>eagan</span>
      </span>
      <span className={styles.nameLung}>Lung</span>
    </h1>
  );
}
