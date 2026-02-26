"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import styles from "../projects.module.css";

const slides = [
    {
        src: "/images/cuisine-clinic/s1.webp",
        alt: "Cuisine Clinic packaging concept 1",
    },
    {
        src: "/images/cuisine-clinic/s2.webp",
        alt: "Cuisine Clinic packaging concept 2",
    },
    {
        src: "/images/cuisine-clinic/s3.webp",
        alt: "Cuisine Clinic packaging concept 3",
    },
];
const AUTO_ROTATE_MS = 3000;

export default function ObjectiveCarousel() {
    const [activeSlide, setActiveSlide] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setActiveSlide((prevSlide) => (prevSlide + 1) % slides.length);
        }, AUTO_ROTATE_MS);

        return () => clearInterval(timer);
    }, []);

    return (
        <div className={styles.objectiveCarousel}>
            <div className={styles.objectiveCarouselMedia}>
                {slides.map((slide, index) => (
                    <Image
                        key={slide.src}
                        src={slide.src}
                        alt={index === activeSlide ? slide.alt : ""}
                        aria-hidden={index !== activeSlide}
                        width={480}
                        height={360}
                        className={`${styles.objectiveCarouselImage} ${
                            index === activeSlide ? styles.objectiveCarouselImageActive : ""
                        }`}
                        draggable={false}
                        unoptimized
                        loading='eager'
                        priority={index === 0}
                    />
                ))}
            </div>
            <div className={styles.objectiveCarouselDots} aria-label='Image indicators'>
                {slides.map((slide, index) => (
                    <span
                        key={slide.src}
                        className={`${styles.objectiveCarouselDot} ${
                            index === activeSlide
                                ? styles.objectiveCarouselDotActive
                                : styles.objectiveCarouselDotInactive
                        }`}
                        aria-hidden='true'
                    />
                ))}
            </div>
        </div>
    );
}
