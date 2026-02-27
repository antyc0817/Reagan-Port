"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./StackedCardReveal.module.css";

gsap.registerPlugin(ScrollTrigger);

const CARDS = [
    { src: "/images/cuisine-clinic/s1.webp", alt: "Cuisine Clinic packaging concept 1", flavor: "Melon Missile" },
    { src: "/images/cuisine-clinic/s2.webp", alt: "Cuisine Clinic packaging concept 2", flavor: "Atomic Apple" },
    { src: "/images/cuisine-clinic/s3.webp", alt: "Cuisine Clinic packaging concept 3", flavor: "Blueberry Bomb" },
];

const ROTATION_OFFSETS = [-4, 2, -2];

export default function StackedCardReveal() {
    const containerRef = useRef(null);
    const cardsRef = useRef([]);

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
                zIndex: CARDS.length - i,
                opacity: 1,
            });
            if (label) gsap.set(label, { opacity: i === 0 ? 1 : 0 });
        });

        const tl = gsap.timeline({ paused: true, repeat: 1 });

        cards.forEach((wrapper, i) => {
            const nextWrapper = cards[(i + 1) % cards.length];
            const nextLabel = nextWrapper.querySelector(`.${styles.cardLabel}`);

            const currLabel = wrapper.querySelector(`.${styles.cardLabel}`);
            tl.to(wrapper, {
                x: "120%",
                rotateZ: 15,
                duration: 0.8,
                ease: "power2.inOut",
            });
            if (currLabel) tl.to(currLabel, { opacity: 0, duration: 0.2 }, "<");
            tl.set(wrapper, { zIndex: 0 })
                .to(wrapper, {
                    x: "0%",
                    rotateZ: ROTATION_OFFSETS[i] || 0,
                    scale: 0.85,
                    filter: "blur(6px)",
                    duration: 0.8,
                    ease: "power2.inOut",
                })
                .to(
                    nextWrapper,
                    {
                        scale: 1,
                        filter: "blur(0px)",
                        zIndex: 10,
                        rotateZ: 0,
                        duration: 0.8,
                        ease: "power2.inOut",
                    },
                    "<"
                );
            if (nextLabel) {
                tl.fromTo(nextLabel, { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }, "<");
            }
        });

        const st = ScrollTrigger.create({
            trigger: container,
            start: "bottom bottom",
            onEnter: () => tl.restart(),
            onLeaveBack: () => tl.pause(),
            onEnterBack: () => tl.restart(),
            onLeave: () => tl.pause(),
        });

        const onResize = () => ScrollTrigger.refresh();
        window.addEventListener("resize", onResize);

        return () => {
            window.removeEventListener("resize", onResize);
            st.kill();
        };
    }, []);

    return (
        <div
            className={styles.container}
            ref={containerRef}>
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
                                sizes='(max-width: 768px) 90vw, 480px'
                                unoptimized
                                draggable={false}
                            />
                        </div>
                        <span className={styles.cardLabel}>{card.flavor}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}
