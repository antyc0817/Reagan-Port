"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "../project.module.css";

gsap.registerPlugin(ScrollTrigger);

const CARDS = [
  {
    id: "core-promise",
    num: 1,
    title: "Core Promise",
    visual: "revive",
    identity: "I centered the 'revive' typography as the primary focal point of the branding.",
    reason: "Clean, bold type creates a direct signal for a fresh start. It ensures the promise of returning to energy is the first thing a user sees while navigating the morning-after haze.",
  },
  {
    id: "natural-roots",
    num: 2,
    title: "Natural Roots",
    visual: "seal",
    identity: "I designed the 'Cuisine Clinic' seal as a circular mark featuring a central leaf icon.",
    reason: "This secondary mark anchors the identity in nature. It balances the medical precision of the brand with a clear nod to its organic, plant-based ingredients.",
  },
  {
    id: "clinical-trust",
    num: 3,
    title: "Clinical Trust",
    visual: "cross",
    identity: "I incorporated a soft green medical cross as a subtle yet consistent visual anchor.",
    reason: "The cross establishes an immediate connection to professional care. It provides a sense of security and reliability exactly when the user needs clarity most.",
  },
];

export default function DesignSystemExpand() {
  const wrapperRef = useRef(null);
  const cardsRef = useRef(null);
  const logoDot1Ref = useRef(null);
  const logoDot2Ref = useRef(null);
  const logoDot3Ref = useRef(null);
  const card1Ref = useRef(null);
  const card2Ref = useRef(null);
  const card3Ref = useRef(null);
  const cardDot1Ref = useRef(null);
  const cardDot2Ref = useRef(null);
  const cardDot3Ref = useRef(null);
  const [lines, setLines] = useState([]);
  const [wrapperSize, setWrapperSize] = useState({ w: 1, h: 1 });

  useEffect(() => {
    const CARD_ANIMATION_OFFSET = 24;

    const getPosRelativeTo = (el, container) => {
      const elRect = el.getBoundingClientRect();
      const containerRect = container.getBoundingClientRect();
      return {
        x: elRect.left + elRect.width / 2 - containerRect.left,
        y: elRect.top + elRect.height / 2 - containerRect.top,
      };
    };

    const updateLines = () => {
      const wrapper = wrapperRef.current;
      const logoDots = [logoDot1Ref.current, logoDot2Ref.current, logoDot3Ref.current];
      const cardDots = [cardDot1Ref.current, cardDot2Ref.current, cardDot3Ref.current];
      if (!wrapper || !logoDots.every((d) => d) || !cardDots.every((d) => d)) return;

      const wr = wrapper.getBoundingClientRect();
      setWrapperSize({ w: wr.width, h: wr.height });
      setLines(
        [0, 1, 2].map((i) => {
          const start = getPosRelativeTo(logoDots[i], wrapper);
          const cardDotEl = cardDots[i];
          const img = cardDotEl?.querySelector("img");
          const endRect = img ? img.getBoundingClientRect() : cardDotEl.getBoundingClientRect();
          const endCenter = {
            x: endRect.left + endRect.width / 2 - wr.left,
            y: endRect.top + endRect.height / 2 - wr.top,
          };
          return { x1: start.x, y1: start.y, x2: endCenter.x, y2: endCenter.y };
        })
      );
    };

    updateLines();
    requestAnimationFrame(() => {
      updateLines();
      const cards = cardsRef.current?.querySelectorAll(`.${styles.designSystemCard}`);
      if (cards?.length) {
        gsap.fromTo(
          cards,
          { opacity: 0, y: CARD_ANIMATION_OFFSET },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            stagger: 0.12,
            ease: "power2.out",
            scrollTrigger: {
              trigger: cardsRef.current,
              start: "top 85%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }
    });

    window.addEventListener("resize", updateLines);
    window.addEventListener("scroll", updateLines, { passive: true });
    ScrollTrigger.addEventListener("refresh", updateLines);
    const ro = typeof ResizeObserver !== "undefined" ? new ResizeObserver(updateLines) : null;
    if (ro && wrapperRef.current) ro.observe(wrapperRef.current);
    return () => {
      window.removeEventListener("resize", updateLines);
      window.removeEventListener("scroll", updateLines);
      ScrollTrigger.removeEventListener("refresh", updateLines);
      ro?.disconnect();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <div className={styles.designSystemContent}>
      <p className={styles.designSystemText}>
        To bridge the gap between medical science and a natural fresh start, I developed an identity built on three core symbolic elements. By grounding the brand in clinical cues, the system provides a sense of reliability and calm right when the user needs it most.
      </p>
      <div ref={wrapperRef} className={styles.designSystemWrapper}>
        <div className={styles.designSystemLogoWrap}>
          <Image
            src="/images/cuisine-clinic/logomain.svg"
            alt="Cuisine Clinic design system"
            width={700}
            height={312}
            className={styles.designSystemLogo}
            unoptimized
          />
          <div className={styles.designSystemLogoDots} aria-hidden>
            <span ref={logoDot1Ref} className={`${styles.designSystemLogoDot} ${styles.designSystemLogoDot1}`} />
            <span ref={logoDot2Ref} className={`${styles.designSystemLogoDot} ${styles.designSystemLogoDot2}`} />
            <span ref={logoDot3Ref} className={`${styles.designSystemLogoDot} ${styles.designSystemLogoDot3}`} />
          </div>
        </div>
        {lines.length === 3 && wrapperSize.w > 0 && wrapperSize.h > 0 && (
          <svg
            className={styles.designSystemConnector}
            viewBox={`0 0 ${wrapperSize.w} ${wrapperSize.h}`}
            preserveAspectRatio="none"
            width={wrapperSize.w}
            height={wrapperSize.h}
            aria-hidden
          >
            {lines.map((l, i) => (
              <line key={i} x1={l.x1} y1={l.y1} x2={l.x2} y2={l.y2} stroke="var(--turquoise)" strokeWidth="2" strokeOpacity="0.6" strokeLinecap="butt" />
            ))}
          </svg>
        )}
        <div ref={cardsRef} className={styles.designSystemCards}>
          {CARDS.map((card, i) => (
            <div
              key={card.id}
              ref={i === 0 ? card1Ref : i === 1 ? card2Ref : card3Ref}
              className={styles.designSystemCard}
            >
              <span
                ref={i === 0 ? cardDot1Ref : i === 1 ? cardDot2Ref : cardDot3Ref}
                className={styles.designSystemCardDot}
                aria-hidden
              >
                <Image
                  src="/icons/a.png"
                  alt=""
                  width={24}
                  height={24}
                  unoptimized
                />
              </span>
              <div className={styles.designSystemCardHeader}>
                <span className={styles.designSystemCardNum}>{card.num}.</span>
                <h4 className={styles.designSystemCardTitle}>{card.title}</h4>
              </div>
              <div className={styles.designSystemCardVisual}>
                {card.visual === "revive" && <span className={styles.designSystemCardRevive}>revive</span>}
                {card.visual === "seal" && (
                  <Image src="/images/cuisine-clinic/cc%20logo.svg" alt="Cuisine Clinic seal" width={88} height={88} className={styles.designSystemCardSeal} unoptimized />
                )}
                {card.visual === "cross" && (
                  <svg className={styles.designSystemCardCross} viewBox="0 0 40 40">
                    <rect x="15" y="5" width="10" height="30" fill="#8de291" />
                    <rect x="5" y="15" width="30" height="10" fill="#8de291" />
                  </svg>
                )}
              </div>
              <div className={styles.designSystemCardRow}>
                <span className={styles.designSystemCardLabel}>Identity:</span>
                <p className={styles.designSystemCardText}>{card.identity}</p>
              </div>
              <div className={styles.designSystemCardRow}>
                <span className={styles.designSystemCardLabel}>Reason:</span>
                <p className={styles.designSystemCardText}>{card.reason}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
