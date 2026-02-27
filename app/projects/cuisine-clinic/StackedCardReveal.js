"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./StackedCardReveal.module.css";

gsap.registerPlugin(ScrollTrigger);

const CARDS = [
    { src: "/images/cuisine-clinic/s1.webp", alt: "Cuisine Clinic packaging concept 1" },
    { src: "/images/cuisine-clinic/s2.webp", alt: "Cuisine Clinic packaging concept 2" },
    { src: "/images/cuisine-clinic/s3.webp", alt: "Cuisine Clinic packaging concept 3" },
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

        cards.forEach((card, i) => {
            gsap.set(card, {
                rotateZ: ROTATION_OFFSETS[i] || 0,
                scale: i === 0 ? 1 : 0.9 - i * 0.05,
                filter: i === 0 ? "blur(0px)" : "blur(4px)",
                zIndex: CARDS.length - i,
                opacity: 1,
            });
        });

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: container,
                start: "bottom bottom",
                end: "top 20%",
                scrub: 1,
                snap: 1 / 3,
                invalidateOnRefresh: true,
            },
        });

        cards.forEach((card, i) => {
            const nextCard = cards[(i + 1) % cards.length];

            tl.to(card, {
                x: "120%",
                rotateZ: 15,
                duration: 1,
                ease: "power1.inOut",
            })
                // Step B: Instantly drop z-index when card is furthest out
                .set(card, { zIndex: 0 })
                // Step C: Slide card back into the bottom of the stack
                .to(card, {
                    x: "0%",
                    rotateZ: ROTATION_OFFSETS[i] || 0,
                    scale: 0.85,
                    filter: "blur(6px)",
                    duration: 1,
                    ease: "power1.inOut",
                })
                .to(
                    nextCard,
                    {
                        scale: 1,
                        filter: "blur(0px)",
                        zIndex: 10,
                        rotateZ: 0,
                        duration: 1,
                        ease: "power1.inOut",
                    },
                    "<"
                );
        });

        const onResize = () => ScrollTrigger.refresh();
        window.addEventListener("resize", onResize);

        return () => {
            window.removeEventListener("resize", onResize);
            tl.scrollTrigger?.kill();
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
                        className={styles.card}>
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
                ))}
            </div>
        </div>
    );
}
