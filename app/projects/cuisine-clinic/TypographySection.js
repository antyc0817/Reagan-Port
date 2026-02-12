"use client";

import { useEffect, useRef } from "react";
import { Space_Grotesk, Comfortaa } from "next/font/google";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "../project.module.css";

gsap.registerPlugin(ScrollTrigger);

const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-space-grotesk" });
const comfortaa = Comfortaa({ subsets: ["latin"], variable: "--font-comfortaa" });

const TYPOGRAPHY_CARDS = [
  {
    num: 1,
    title: "Technical Authority",
    specimen: "Aa Bb Cc Dd Ee Ff 0123456789",
    specimenLine2: "abcdefghijklmnopqrstuvwxyz",
    fontFamily: "Space Grotesk",
    variable: "--font-space-grotesk",
    role: "As primary brand typeface",
    reason:
      'Its sharp construction provides the clinical precision the brand needs. It reinforces "complexity simplified," making the recovery process feel organized and professional.',
  },
  {
    num: 2,
    title: "Organic Balance",
    specimen: "Aa Bb Cc Dd Ee Ff 0123456789",
    specimenLine2: "abcdefghijklmnopqrstuvwxyz",
    fontFamily: "Comfortaa",
    variable: "--font-comfortaa",
    role: "As secondary brand typeface",
    reason:
      "It softens the medical aesthetic and reflects the organic nature of the ingredients, ensuring the brand doesn't feel too sterile.",
  },
];

export default function TypographySection() {
  const cardsRef = useRef(null);

  useEffect(() => {
    const cards = cardsRef.current?.querySelectorAll(`.${styles.typographyCard}`);
    if (!cards?.length) return;
    gsap.fromTo(
      cards,
      { opacity: 0, y: 24 },
      {
        opacity: 1,
        y: 0,
        duration: 0.5,
        stagger: 0.15,
        ease: "power2.out",
        scrollTrigger: {
          trigger: cardsRef.current,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      }
    );
    return () => ScrollTrigger.getAll().forEach((t) => t.kill());
  }, []);

  return (
    <section
      className={`${styles.projectSection} ${styles.typographySection} ${spaceGrotesk.variable} ${comfortaa.variable}`}
    >
      <h3 className={styles.projectSectionTitle}>[ Typography ]</h3>
      <p className={styles.typographyIntro}>
        A dual-font system balances clinical authority with approachable recovery. Sharp technical lines paired with organic
        curves keep the brand professional yet welcoming.
      </p>
      <div ref={cardsRef} className={styles.typographyCards}>
        {TYPOGRAPHY_CARDS.map((card) => (
          <div key={card.num} className={styles.typographyCard}>
            <div className={styles.typographyCardHeader}>
              <span className={styles.typographyCardNum}>{card.num}.</span>
              <h4 className={styles.typographyCardTitle}>{card.title}</h4>
            </div>
            <div
              className={styles.typographySpecimen}
              style={{ fontFamily: `var(${card.variable}), sans-serif` }}
            >
              <div>{card.specimen}</div>
              {card.specimenLine2 && <div className={styles.typographySpecimenLine2}>{card.specimenLine2}</div>}
            </div>
            <p className={styles.typographyFontName}>{card.fontFamily}</p>
            <p className={styles.typographyRole}>{card.role}</p>
            <div className={styles.typographyCardRow}>
              <span className={styles.typographyLabel}>Reason:</span>
              <p className={styles.typographyCardText}>{card.reason}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
