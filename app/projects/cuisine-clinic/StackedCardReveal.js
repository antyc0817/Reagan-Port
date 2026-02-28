"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import styles from "./StackedCardReveal.module.css";

const CARDS = [
    { src: "/images/cuisine-clinic/s1.webp", alt: "Cuisine Clinic packaging concept 1", flavor: "Melon Missile" },
    { src: "/images/cuisine-clinic/s2.webp", alt: "Cuisine Clinic packaging concept 2", flavor: "Atomic Apple" },
    { src: "/images/cuisine-clinic/s3.webp", alt: "Cuisine Clinic packaging concept 3", flavor: "Blueberry Bomb" },
];

const ROTATION_OFFSETS = [-4, 2, -2];
const TOTAL = CARDS.length;

export default function StackedCardReveal() {
    const containerRef = useRef(null);
    const cardsRef = useRef([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const isAnimatingRef = useRef(false);

    const canGoPrev = currentIndex > 0;
    const canGoNext = currentIndex < TOTAL - 1;

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const cards = cardsRef.current.filter(Boolean);

        gsap.set(cards, {
            position: "absolute",
            top: "50%",
            left: "50%",
            xPercent: -50,
            yPercent: -50,
            transformOrigin: "center center",
        });

        cards.forEach((wrapper, i) => {
            const label = wrapper.querySelector(`.${styles.cardLabel}`);
            gsap.set(wrapper, {
                rotateZ: ROTATION_OFFSETS[i] || 0,
                scale: i === 0 ? 1 : 0.9 - i * 0.05,
                filter: i === 0 ? "blur(0px)" : "blur(4px)",
                zIndex: TOTAL - i,
                opacity: 1,
                x: "0%",
            });
            if (label) gsap.set(label, { opacity: i === 0 ? 1 : 0, y: 0 });
        });
    }, []);

    const goNext = () => {
        if (!canGoNext || isAnimatingRef.current) return;
        isAnimatingRef.current = true;
        const fromIdx = currentIndex;
        const toIdx = currentIndex + 1;
        const fromCard = cardsRef.current[fromIdx];
        const toCard = cardsRef.current[toIdx];
        const fromLabel = fromCard?.querySelector(`.${styles.cardLabel}`);
        const toLabel = toCard?.querySelector(`.${styles.cardLabel}`);

        const tl = gsap.timeline({
            onComplete: () => {
                setCurrentIndex(toIdx);
                isAnimatingRef.current = false;
            },
        });

        if (fromLabel) tl.to(fromLabel, { opacity: 0, duration: 0.15 }, 0);
        tl.to(fromCard, {
            x: "120%",
            rotateZ: 15,
            duration: 0.4,
            ease: "power2.inOut",
        }, 0);
        tl.set(fromCard, { zIndex: 0 }, 0.2);
        tl.to(fromCard, {
            x: "0%",
            rotateZ: ROTATION_OFFSETS[fromIdx],
            scale: 0.85,
            filter: "blur(6px)",
            duration: 0.4,
            ease: "power2.inOut",
        }, 0.25);
        tl.to(toCard, {
            scale: 1,
            filter: "blur(0px)",
            zIndex: 10,
            rotateZ: 0,
            duration: 0.4,
            ease: "power2.inOut",
        }, 0);
        if (toLabel) tl.fromTo(toLabel, { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: 0.35, ease: "power2.out" }, 0.2);
    };

    const goPrev = () => {
        if (!canGoPrev || isAnimatingRef.current) return;
        isAnimatingRef.current = true;
        const fromIdx = currentIndex;
        const toIdx = currentIndex - 1;
        const fromCard = cardsRef.current[fromIdx];
        const toCard = cardsRef.current[toIdx];
        const fromLabel = fromCard?.querySelector(`.${styles.cardLabel}`);
        const toLabel = toCard?.querySelector(`.${styles.cardLabel}`);

        gsap.set(toCard, { x: "-120%", zIndex: 10, scale: 0.9, filter: "blur(4px)", rotateZ: -15 });
        if (toLabel) gsap.set(toLabel, { opacity: 0 });

        const tl = gsap.timeline({
            onComplete: () => {
                setCurrentIndex(toIdx);
                isAnimatingRef.current = false;
            },
        });

        if (fromLabel) tl.to(fromLabel, { opacity: 0, duration: 0.15 }, 0);
        tl.to(fromCard, {
            x: "-120%",
            rotateZ: -15,
            duration: 0.4,
            ease: "power2.inOut",
        }, 0);
        tl.set(fromCard, { zIndex: 0 }, 0.2);
        tl.to(fromCard, {
            x: "0%",
            rotateZ: ROTATION_OFFSETS[fromIdx],
            scale: 0.85,
            filter: "blur(6px)",
            duration: 0.4,
            ease: "power2.inOut",
        }, 0.25);
        tl.to(toCard, {
            x: "0%",
            scale: 1,
            filter: "blur(0px)",
            rotateZ: ROTATION_OFFSETS[toIdx],
            duration: 0.4,
            ease: "power2.inOut",
        }, 0);
        if (toLabel) tl.fromTo(toLabel, { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: 0.35, ease: "power2.out" }, 0.2);
    };

    return (
        <div className={styles.container} ref={containerRef}>
            <div className={styles.stack}>
                {CARDS.map((card, i) => (
                    <div
                        key={card.src}
                        ref={(el) => (cardsRef.current[i] = el)}
                        className={styles.cardWrapper}>
                        <div className={styles.card}>
                            <Image
                                src={card.src}
                                alt={card.alt}
                                fill
                                className={styles.cardImage}
                                sizes="(max-width: 768px) 90vw, 480px"
                                unoptimized
                                draggable={false}
                            />
                        </div>
                        <span className={styles.cardLabel}>{card.flavor}</span>
                    </div>
                ))}
            </div>
            <div className={styles.controls}>
                <button
                    type="button"
                    className={styles.arrowBtn}
                    onClick={goPrev}
                    aria-label="Previous card"
                    disabled={!canGoPrev}>
                    <Image
                        src="/icons/arrow.svg"
                        alt=""
                        width={28}
                        height={28}
                        className={`${styles.arrowIcon} ${styles.arrowIconLeft}`}
                        unoptimized
                        aria-hidden
                    />
                </button>
                <p className={styles.counter}>
                    {currentIndex + 1} / {TOTAL}
                </p>
                <button
                    type="button"
                    className={styles.arrowBtn}
                    onClick={goNext}
                    aria-label="Next card"
                    disabled={!canGoNext}>
                    <Image
                        src="/icons/arrow.svg"
                        alt=""
                        width={28}
                        height={28}
                        className={styles.arrowIcon}
                        unoptimized
                        aria-hidden
                    />
                </button>
            </div>
        </div>
    );
}
