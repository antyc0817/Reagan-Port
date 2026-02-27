"use client";

import Image from "next/image";
import styles from "../projects.module.css";

const PRESETS = {
    cards: [
        { src: "/images/whatsup/card1.webp", alt: "WhatSUP wireframe card 1" },
        { src: "/images/whatsup/card2.webp", alt: "WhatSUP wireframe card 2" },
    ],
    sidebar: [
        { src: "/images/whatsup/L2.webp", alt: "WhatSUP wireframe sidebar L2" },
        { src: "/images/whatsup/L1.webp", alt: "WhatSUP wireframe sidebar L1" },
    ],
};

export default function WireframeCardCarousel({ preset = "cards" }) {
    const CARDS = PRESETS[preset] || PRESETS.cards;
    return (
        <div
            className={`${styles.whatsupWireframeCardCarousel} ${preset === "sidebar" ? styles.whatsupWireframeCardCarouselSidebar : ""}`}>
            {CARDS.map((card, i) => (
                <div key={`${card.src}-${i}`} className={styles.whatsupWireframeCardSlot}>
                    <Image
                        src={card.src}
                        alt={card.alt}
                        width={500}
                        height={375}
                        className={styles.whatsupWireframeCardImg}
                        sizes="(max-width: 768px) 45vw, 420px"
                        unoptimized
                    />
                </div>
            ))}
        </div>
    );
}
