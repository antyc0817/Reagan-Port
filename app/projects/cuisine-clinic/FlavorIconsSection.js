"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "../projects.module.css";

gsap.registerPlugin(ScrollTrigger);

const FLAVORS = [
  {
    id: "blueberry",
    name: "Blueberry Bomb",
    image: "/images/cuisine-clinic/Logo 1.png",
    paletteLabel: "Concentrated explosion of flavor",
    colors: ["#2A73BC", "#E4FF71"],
    headline: "Classic bomb silhouette merged with a central blueberry.",
    detail:
      'I wanted to show an "explosion" of flavor and recovery. By keeping the icon simple, I made sure the taste is obvious and easy to recognize without adding extra clutter.',
    reversed: false,
  },
  {
    id: "apple",
    name: "Atomic Apple",
    image: "/images/cuisine-clinic/Logo 2.png",
    paletteLabel: "Fusion of energy and science",
    colors: ["#59F93D", "#FFFF00", "#FF6178"],
    headline: "Minimalist apple centered within a scientific atomic orbital.",
    detail:
      "I used this to show the link between energy and science. I went with a bright green so the icon pops off the shelf, immediately signaling that this is the high-energy flavor.",
    reversed: true,
  },
  {
    id: "melon",
    name: "Melon Missile",
    image: "/images/cuisine-clinic/Logo 3.png",
    paletteLabel: "Direct hit of hydration",
    colors: ["#FF5050", "#3ADB67"],
    headline: "Watermelon slice reimagined as a streamlined vertical rocket.",
    detail:
      "I designed this to show that the hydration is fast-acting. I used warmer coral tones to give it a natural, friendly feel that balances out the sharper clinical look of the brand.",
    reversed: false,
  },
];

function FlavorBlock({ flavor }) {
  const rowRef = useRef(null);

  useEffect(() => {
    const el = rowRef.current;
    if (!el) return;

    const imgBlock = el.querySelector(`.${styles.flavorIconsImgBlock}`);
    const textBlock = el.querySelector(`.${styles.flavorIconsTextBlock}`);
    const title = el.querySelector(`.${styles.flavorIconsLogoTitle}`);
    if (!imgBlock || !textBlock || !title) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        [title, imgBlock, textBlock],
        { opacity: 0, y: 32 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, el);

    return () => ctx.revert();
  }, [flavor.id]);

  const ImgBlock = (
    <>
      <h4 className={styles.flavorIconsLogoTitle}>{flavor.name}</h4>
      <div className={styles.flavorIconsImgBlock}>
        <Image
          src={flavor.image}
          alt={`${flavor.name} revive can`}
          width={200}
          height={260}
          className={styles.flavorIconsLogoImg}
          unoptimized
        />
        <p className={styles.flavorIconsPaletteLabel}>{flavor.paletteLabel}</p>
        <div className={styles.flavorIconsSwatches}>
          {flavor.colors.map((hex) => (
            <div key={hex} className={styles.flavorIconsSwatch}>
              <span className={styles.flavorIconsSwatchCircle} style={{ backgroundColor: hex }} />
              <code>{hex}</code>
            </div>
          ))}
        </div>
      </div>
    </>
  );

  const TextBlock = (
    <div className={styles.flavorIconsTextBlock}>
      <h4 className={styles.flavorIconsHeadline}>{flavor.headline}</h4>
      <p className={styles.flavorIconsDetail}>{flavor.detail}</p>
    </div>
  );

  return (
    <div
      ref={rowRef}
      className={`${styles.flavorIconsRow} ${flavor.reversed ? styles.flavorIconsRowReverse : ""}`}
    >
      <div className={styles.flavorIconsLogoBlock}>
        {ImgBlock}
      </div>
      {TextBlock}
    </div>
  );
}

export default function FlavorIconsSection() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const title = el.querySelector(`.${styles.projectSectionTitle}`);
    const intro = el.querySelector(`.${styles.flavorIconsIntro}`);
    if (!title || !intro) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        [title, intro],
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: el,
            start: "top 88%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className={`${styles.projectSection} ${styles.flavorIconsSection}`}>
      <h3 className={styles.projectSectionTitle}>[ Flavor icons ]</h3>
      <p className={styles.flavorIconsIntro}>
        A set of minimalist symbols was created to provide instant visual clarity during a hazy morning, bridging the
        gap between technical science and natural recovery.
      </p>
      <div className={styles.flavorIconsContent}>
        {FLAVORS.map((flavor) => (
          <FlavorBlock key={flavor.id} flavor={flavor} />
        ))}
      </div>
    </section>
  );
}
