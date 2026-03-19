"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "../projects.module.css";

gsap.registerPlugin(ScrollTrigger);

export default function PandayObjectiveSection() {
  const sectionRef = useRef(null);
  const statsRowRef = useRef(null);
  const fill85Ref = useRef(null);
  const fill6Ref = useRef(null);
  const pie70Ref = useRef(null);
  const num85Ref = useRef(null);
  const num70Ref = useRef(null);
  const num6Ref = useRef(null);
  const closingRef = useRef(null);

  useEffect(() => {
    if (!closingRef.current) return undefined;

    const ctx = gsap.context(() => {
      gsap.set([fill85Ref.current, fill6Ref.current], {
        scaleY: 0,
        transformOrigin: "50% 100%",
      });
      if (pie70Ref.current) {
        pie70Ref.current.style.setProperty("--panday-pct", "0");
      }

      if (num85Ref.current) num85Ref.current.textContent = "0K";
      if (num70Ref.current) num70Ref.current.textContent = "0%";
      if (num6Ref.current) num6Ref.current.textContent = "0K";

      const BASE_DELAY = 1;
      const STEP_DELAY = 0.2;
      const ANIM_DURATION = 2.8;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: closingRef.current,
          start: "top 80%",
          once: true,
        },
      });

      const count85 = { value: 0 };
      const count70 = { value: 0 };
      const count6 = { value: 0 };
      const pie70 = { value: 0 };

      tl.to(
        fill85Ref.current,
        {
          scaleY: 1,
          duration: ANIM_DURATION,
          ease: "power2.out",
        },
        BASE_DELAY
      );

      tl.to(
        count85,
        {
          value: 85,
          duration: ANIM_DURATION,
          ease: "power2.out",
          onUpdate: () => {
            if (num85Ref.current) {
              num85Ref.current.textContent = `${Math.round(count85.value)}K`;
            }
          },
        },
        BASE_DELAY
      );

      tl.to(
        pie70,
        {
          value: 70,
          duration: ANIM_DURATION,
          ease: "power2.out",
          onUpdate: () => {
            if (pie70Ref.current) {
              pie70Ref.current.style.setProperty(
                "--panday-pct",
                String(pie70.value)
              );
            }
          },
        },
        BASE_DELAY + STEP_DELAY
      );

      tl.to(
        count70,
        {
          value: 70,
          duration: ANIM_DURATION,
          ease: "power2.out",
          onUpdate: () => {
            if (num70Ref.current) {
              num70Ref.current.textContent = `${Math.round(count70.value)}%`;
            }
          },
        },
        BASE_DELAY + STEP_DELAY
      );

      tl.to(
        fill6Ref.current,
        {
          scaleY: 1,
          duration: ANIM_DURATION,
          ease: "power2.out",
        },
        BASE_DELAY + STEP_DELAY * 2
      );

      tl.to(
        count6,
        {
          value: 6,
          duration: ANIM_DURATION,
          ease: "power2.out",
          onUpdate: () => {
            if (num6Ref.current) {
              num6Ref.current.textContent = `${Math.round(count6.value)}K`;
            }
          },
        },
        BASE_DELAY + STEP_DELAY * 2
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className={styles.pandaySectionHead}>
      <h3 className={styles.pandaySectionHeadTitle}>[ Objective ]</h3>
      <h2 className={styles.pandayObjectiveTitle}>
        The path to Red Seal shouldn&apos;t feel like a maze.
      </h2>
      <div className={styles.pandayObjectiveTop}>
        <div className={styles.pandayObjectiveBody}>
          <p>
            British Columbia is facing a serious skilled trades shortage, and the
            problem isn&apos;t a lack of willing workers. It&apos;s that the system
            built to guide them was never designed with people in mind. Aspiring
            tradespeople are met with scattered government PDFs, outdated ITA BC
            pages, and no clear indication of where to even begin. The information
            exists but it&apos;s buried, fragmented, and overwhelming.
          </p>
          <p>
            By the time someone figures out what they actually need to do, many have
            already given up. The numbers reflect that.
          </p>
        </div>
        <div className={styles.pandayObjectiveVisual}>
          <Image
            src="/images/panday/red.webp"
            alt="Red Seal challenge visual"
            width={900}
            height={900}
            className={styles.pandayObjectiveVisualImg}
            sizes="(max-width: 900px) 80vw, 340px"
            unoptimized
          />
        </div>
      </div>

      <div ref={statsRowRef} className={styles.pandayStatsGrid}>
        <article className={styles.pandayStatCard}>
          <div className={`${styles.pandayStatCircle} ${styles.pandayStatCircleOrange}`}>
            <span ref={fill85Ref} className={`${styles.pandayStatFill} ${styles.pandayStatFillOrange}`} />
            <span ref={num85Ref} className={styles.pandayStatNumber}>85K</span>
            <span className={styles.pandayStatSub}>worker gap</span>
          </div>
          <p className={styles.pandayStatCaption}>
            BC needs 85,000 new skilled trades workers by 2030
          </p>
        </article>

        <article className={styles.pandayStatCard}>
          <div className={`${styles.pandayStatCircle} ${styles.pandayStatCircleRed}`}>
            <span
              ref={pie70Ref}
              className={`${styles.pandayStatPieFill} ${styles.pandayStatPieFillRed}`}
            />
            <span ref={num70Ref} className={styles.pandayStatNumber}>70%</span>
            <span className={styles.pandayStatSub}>drop-off</span>
          </div>
          <p className={styles.pandayStatCaption}>
            Female apprentices who never reach certification
          </p>
        </article>

        <article className={styles.pandayStatCard}>
          <div className={`${styles.pandayStatCircle} ${styles.pandayStatCircleBlue}`}>
            <span ref={fill6Ref} className={`${styles.pandayStatFill} ${styles.pandayStatFillBlue}`} />
            <span ref={num6Ref} className={styles.pandayStatNumber}>6K</span>
            <span className={styles.pandayStatSub}>hours</span>
          </div>
          <p className={styles.pandayStatCaption}>
            Hours of work required to reach Red Seal certification
          </p>
        </article>
      </div>

      <p ref={closingRef} className={styles.pandayObjectiveClosing}>
        Panday was built to fix this. Not by reinventing the trades system, but by
        bringing all the relevant information into one place and giving students a
        clear visual roadmap from wherever they are today, all the way to their Red
        Seal.
      </p>
    </section>
  );
}
