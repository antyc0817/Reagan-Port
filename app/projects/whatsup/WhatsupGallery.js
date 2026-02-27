"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import styles from "../projects.module.css";

const GALLERY_IMAGES = [
    {
        id: "gallery-1",
        src: "/images/whatsup/1.webp",
        label: "About Us",
        alt: "WhatSUP about us page layout",
    },
    {
        id: "gallery-2",
        src: "/images/whatsup/2.webp",
        label: "Blog",
        alt: "WhatSUP blog page layout",
    },
    {
        id: "gallery-3",
        src: "/images/whatsup/3.webp",
        label: "Lesson",
        alt: "WhatSUP lesson page layout",
    },
    {
        id: "gallery-4",
        src: "/images/whatsup/4.webp",
        label: "Tour",
        alt: "WhatSUP tour page layout",
    },
];

export default function WhatsupGallery() {
    const [activeIndex, setActiveIndex] = useState(0);
    const slidesRef = useRef([]);
    const prevIndexRef = useRef(0);

    useEffect(() => {
        const slides = slidesRef.current;
        const initial = slides[0];
        if (!initial) return;

        gsap.set(slides, { opacity: 0, y: 10, pointerEvents: "none", zIndex: 1 });
        gsap.set(initial, { opacity: 1, y: 0, pointerEvents: "auto", zIndex: 2 });
        prevIndexRef.current = 0;
    }, []);

    useEffect(() => {
        const slides = slidesRef.current;
        const prev = prevIndexRef.current;
        const next = activeIndex;

        if (prev === next || !slides[next]) return;

        const outgoing = slides[prev];
        const incoming = slides[next];

        gsap.set(incoming, { opacity: 0, y: 18, zIndex: 2, pointerEvents: "none" });
        if (outgoing) {
            gsap.set(outgoing, { zIndex: 1 });
        }

        const tl = gsap.timeline();

        if (outgoing) {
            tl.to(outgoing, {
                opacity: 0,
                y: -18,
                duration: 0.32,
                ease: "power2.out",
                pointerEvents: "none",
            });
        }

        tl.to(
            incoming,
            {
                opacity: 1,
                y: 0,
                duration: 0.38,
                ease: "power2.out",
                pointerEvents: "auto",
            },
            outgoing ? 0 : 0
        );

        prevIndexRef.current = next;
    }, [activeIndex]);

    const handleSelect = (index) => {
        setActiveIndex(index);
    };

    return (
        <div className={styles.whatsupGalleryRoot}>
            <div className={styles.whatsupGalleryFrame}>
                {GALLERY_IMAGES.map((img, index) => (
                    <div
                        key={img.id}
                        ref={(el) => {
                            slidesRef.current[index] = el;
                        }}
                        className={styles.whatsupGallerySlide}>
                        <div className={styles.whatsupGalleryScrollable}>
                            <Image
                                src={img.src}
                                alt={img.alt}
                                width={1200}
                                height={2800}
                                className={styles.whatsupGalleryImage}
                                sizes="(max-width: 600px) 92vw, (max-width: 1024px) 420px, 520px"
                                unoptimized
                            />
                        </div>
                    </div>
                ))}
            </div>

            <div className={styles.whatsupGalleryNav}>
                {GALLERY_IMAGES.map((img, index) => {
                    const isActive = index === activeIndex;
                    return (
                        <button
                            key={img.id}
                            type="button"
                            className={`${styles.whatsupGalleryNavItem} ${
                                isActive ? styles.whatsupGalleryNavItemActive : ""
                            }`}
                            onClick={() => handleSelect(index)}
                            aria-label={`Show gallery image ${index + 1}: ${img.label}`}>
                            <span className={styles.whatsupGalleryNavIndex}>
                                {index + 1 < 10 ? `0${index + 1}` : index + 1}
                            </span>
                            <span className={styles.whatsupGalleryNavLabel}>{img.label}</span>
                        </button>
                    );
                })}
            </div>
        </div>
    );
}

