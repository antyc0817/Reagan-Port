"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { Eraser, Link2, Sparkles } from "lucide-react";
import styles from "../projects.module.css";

const POINTS = [
  {
    num: 1,
    title: "Trust in Simplicity",
    Icon: Eraser,
    text: "Every early version had more going on. More color, more texture, more noise. At some point I stopped adding and started editing, and that's when the brand actually started to feel like something. The restraint wasn't a limitation, it was the whole point.",
  },
  {
    num: 2,
    title: "Technical Bridging",
    Icon: Link2,
    text: "There's a moment when a flat design meets a real surface and you find out if it actually holds up. Moving between Illustrator and Photoshop mockups taught me to think about the physical form from the very first line. The concept and the construction stopped being two separate things.",
  },
  {
    num: 3,
    title: "Visual Efficiency",
    Icon: Sparkles,
    text: "The icons needed to work before the brain had time to think. No text, no context, just shape and color doing all the talking. Getting each one to that point meant going through a lot of versions that were close but not quite there yet.",
  },
];

export default function RetrospectivePoints() {
  const sectionRef = useRef(null);
  const hasAnimatedRef = useRef(false);

  useEffect(() => {
    const section = sectionRef.current;
    const footer = typeof document !== "undefined" ? document.querySelector('[data-section="footer"]') : null;
    if (!section || !footer) return;

    const playTimeline = () => {
      if (hasAnimatedRef.current) return;
      hasAnimatedRef.current = true;

      const items = Array.from(section.querySelectorAll(`.${styles.retroTimelineItem}`));
      if (!items.length) return;

      const allConnectors = items
        .map((item) => item.querySelector(`.${styles.retroTimelineConnector}`))
        .filter(Boolean);
      const allDotFills = items
        .map((item) => item.querySelector(`.${styles.retroTimelineDotFill}`))
        .filter(Boolean);

      gsap.set(allConnectors, { scaleY: 0, transformOrigin: "50% 0%" });
      gsap.set(allDotFills, { scaleY: 0, transformOrigin: "50% 100%" });

      const tl = gsap.timeline();

      items.forEach((item, index) => {
        const dot = item.querySelector(`.${styles.retroTimelineDot}`);
        const dotFill = item.querySelector(`.${styles.retroTimelineDotFill}`);
        const connector = item.querySelector(`.${styles.retroTimelineConnector}`);
        const isSecondOrThird = index >= 1;

        /* 1. Dot fills */
        if (dotFill && dot) {
          tl.to(dotFill, {
            scaleY: 1,
            duration: 0.5,
            ease: "power2.out",
          })
            .to(
              dot,
              {
                boxShadow: isSecondOrThird
                  ? "0 0 0 10px rgba(64, 180, 196, 0.35)"
                  : "0 0 0 8px rgba(64, 180, 196, 0.25)",
                duration: 0.25,
                ease: "sine.out",
              },
              "<"
            )
            .to(
              dot,
              {
                scale: isSecondOrThird ? 1.18 : 1,
                duration: isSecondOrThird ? 0.25 : 0,
                ease: "back.out(1.4)",
              },
              isSecondOrThird ? "-=0.08" : "<"
            )
            .to(dot, {
              boxShadow: "0 0 0 0 rgba(64, 180, 196, 0)",
              scale: 1,
              duration: 0.35,
              ease: "sine.in",
              onComplete: () => dot.classList.add(styles.retroTimelineDotFilled),
            });
        }

        /* 2. Line drops (connector extends downward) */
        if (connector) {
          tl.to(connector, {
            scaleY: 1,
            backgroundColor: "rgba(64, 180, 196, 0.7)",
            duration: 0.75,
            ease: "power2.inOut",
          });
        }
      });
    };

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry?.isIntersecting) {
          playTimeline();
          observer.disconnect();
        }
      },
      { threshold: 0 }
    );

    observer.observe(footer);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={sectionRef} className={styles.retroTimeline}>
      {POINTS.map((point, i) => {
        const Icon = point.Icon;
        return (
          <article key={point.num} className={styles.retroTimelineItem}>
            <div className={styles.retroTimelineLine}>
              <div className={styles.retroTimelineDotWrap}>
                <div className={styles.retroTimelineDot}>
                  <span className={styles.retroTimelineDotFill} />
                </div>
              </div>
              {i < POINTS.length - 1 ? <div className={styles.retroTimelineConnector} /> : null}
            </div>
            <div className={styles.retroTimelineContent}>
              <div className={styles.retroTimelineHeader}>
                <div className={styles.retroTimelineIconWrap}>
                  <Icon className={styles.retroTimelineIcon} size={20} strokeWidth={2} aria-hidden />
                </div>
                <h4 className={styles.retroTimelineTitle}>{point.title}</h4>
              </div>
              <p className={styles.retroTimelineText}>{point.text}</p>
            </div>
          </article>
        );
      })}
    </div>
  );
}
