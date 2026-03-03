"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import Footer from "../components/Footer";
import styles from "./page.module.css";

const SKILL_TAGS = ["Product Design", "UX/UI", "Brand Identity", "Figma", "HTML & CSS", "Bilingual"];

export default function AboutPage() {
  const leftContentRefs = useRef([]);
  const pillRefs = useRef([]);
  const headingRef = useRef(null);
  const [textWidth, setTextWidth] = useState(null);
  const tags = SKILL_TAGS;

  useEffect(() => {
    const items = leftContentRefs.current.filter(Boolean);
    if (!items.length) return;

    gsap.fromTo(
      items,
      { opacity: 0, y: 20, filter: "blur(6px)" },
      {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 0.55,
        stagger: 0.12,
        ease: "power2.out",
      }
    );
  }, []);

  useEffect(() => {
    const pills = pillRefs.current.filter(Boolean);
    if (!pills.length) return;

    const cleanups = [];
    pills.forEach((pill) => {
      const fill = pill.querySelector(`.${styles.pillFill}`);
      if (!fill) return;

      const positionFill = (x, y) => {
        gsap.set(fill, {
          left: x,
          top: y,
          xPercent: -50,
          yPercent: -50,
        });
      };

      const handleEnter = (event) => {
        const { left, top } = pill.getBoundingClientRect();
        const x = event.clientX - left;
        const y = event.clientY - top;
        gsap.killTweensOf(fill);
        positionFill(x, y);
        gsap.set(fill, {
          scale: 0,
          opacity: 0.12,
        });
        gsap.to(fill, {
          scale: 2.6,
          duration: 0.55,
          ease: "power3.out",
          opacity: 0.4,
        });
      };

      const handleLeave = (event) => {
        const { left, top } = pill.getBoundingClientRect();
        const x = event.clientX - left;
        const y = event.clientY - top;
        gsap.killTweensOf(fill);
        positionFill(x, y);
        gsap.to(fill, {
          scale: 0,
          duration: 0.35,
          ease: "power2.in",
          opacity: 0,
        });
      };

      pill.addEventListener("mouseenter", handleEnter);
      pill.addEventListener("mouseleave", handleLeave);

      cleanups.push(() => {
        pill.removeEventListener("mouseenter", handleEnter);
        pill.removeEventListener("mouseleave", handleLeave);
      });
    });

    return () => cleanups.forEach((clean) => clean());
  }, []);

  useEffect(() => {
    const measureHeading = () => {
      if (!headingRef.current) return;
      const width = Math.round(headingRef.current.getBoundingClientRect().width);
      if (width && width !== textWidth) {
        setTextWidth(width);
      }
    };

    measureHeading();
    window.addEventListener("resize", measureHeading);
    return () => window.removeEventListener("resize", measureHeading);
  }, [textWidth]);

  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <div
          className={styles.left}
          style={{ "--hero-text-width": textWidth ? `${textWidth}px` : undefined }}
        >
          <p
            ref={(el) => {
              leftContentRefs.current[0] = el;
            }}
            className={styles.eyebrow}
          >
            Designer · Storyteller · Dragon
          </p>

          <h1
            ref={(el) => {
              leftContentRefs.current[1] = el;
              headingRef.current = el;
            }}
            className={styles.heading}
          >
            <span>Hi, I&apos;m</span>
            <span className={styles.headingAccent}>Reagan Lung</span>
          </h1>

          <p
            ref={(el) => {
              leftContentRefs.current[2] = el;
            }}
            className={styles.subheading}
          >
            I design experiences that feel like they were made for you.
          </p>

          <p
            ref={(el) => {
              leftContentRefs.current[3] = el;
            }}
            className={styles.body}
          >
            <strong>A product designer who grew up between two worlds — Taiwan and Canada —</strong> and learned early
            that the best work lives where different perspectives meet.
          </p>

          <ul
            ref={(el) => {
              leftContentRefs.current[4] = el;
            }}
            className={styles.tags}
            aria-label="Skills"
          >
            {tags.map((tag, index) => (
              <li
                key={tag}
                ref={(el) => {
                  pillRefs.current[index] = el;
                }}
                className={styles.pill}
              >
                <span className={styles.pillFill} />
                {tag}
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.right}>
          <Image
            src="/images/about/1.webp"
            alt="Portrait of Reagan Lung"
            fill
            className={styles.photo}
            sizes="(max-width: 900px) 100vw, 50vw"
            priority
            unoptimized
          />

          <div className={styles.dragonCard}>
            <span className={styles.dragonCharacter}>龍</span>
            <span className={styles.dragonCaption}>Lung · Dragon · 2000</span>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
