"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { gsap } from "gsap";
import styles from "./GalleryCarousel.module.css";

const IMAGES = [
    { src: "/images/cuisine-clinic/4.webp", alt: "Cuisine Clinic gallery 4" },
    { src: "/images/cuisine-clinic/7.webp", alt: "Cuisine Clinic gallery 7" },
    { src: "/images/cuisine-clinic/2.webp", alt: "Cuisine Clinic gallery 2" },
    { src: "/images/cuisine-clinic/5.webp", alt: "Cuisine Clinic gallery 5" },
    { src: "/images/cuisine-clinic/1.webp", alt: "Cuisine Clinic gallery 1" },
    { src: "/images/cuisine-clinic/6.webp", alt: "Cuisine Clinic gallery 6" },
    { src: "/images/cuisine-clinic/3.webp", alt: "Cuisine Clinic gallery 3" },
];

const IMAGE_COUNT = IMAGES.length;
const ANGLE_STEP = 360 / IMAGE_COUNT;
const RADIUS = 380;
const DRAG_SENSITIVITY = 1.2;
const INERTIA_MULTIPLIER = 12;
const CLICK_THRESHOLD = 5;

function getActiveIndex(rotation) {
    const r = ((rotation % 360) + 360) % 360;
    let closest = 0;
    let minDist = 360;
    for (let i = 0; i < IMAGE_COUNT; i++) {
        const imgAngle = (i * ANGLE_STEP + r) % 360;
        const dist = Math.min(imgAngle, 360 - imgAngle);
        if (dist < minDist) {
            minDist = dist;
            closest = i;
        }
    }
    return closest;
}

export default function GalleryCarousel() {
    const stageRef = useRef(null);
    const wheelRef = useRef(null);
    const rotationRef = useRef(0);
    const [activeIndex, setActiveIndex] = useState(0);

    const goToPrev = () => {
        const wheel = wheelRef.current;
        if (!wheel) return;
        gsap.killTweensOf(wheel);
        const target = rotationRef.current + ANGLE_STEP;
        gsap.to(wheel, {
            rotationY: target,
            duration: 0.4,
            ease: "power2.out",
            onUpdate: () => {
                rotationRef.current = gsap.getProperty(wheel, "rotationY") || 0;
                setActiveIndex(getActiveIndex(rotationRef.current));
            },
        });
    };

    const goToNext = () => {
        const wheel = wheelRef.current;
        if (!wheel) return;
        gsap.killTweensOf(wheel);
        const target = rotationRef.current - ANGLE_STEP;
        gsap.to(wheel, {
            rotationY: target,
            duration: 0.4,
            ease: "power2.out",
            onUpdate: () => {
                rotationRef.current = gsap.getProperty(wheel, "rotationY") || 0;
                setActiveIndex(getActiveIndex(rotationRef.current));
            },
        });
    };

    const snapToNearest = (fromRotation) => {
        const wheel = wheelRef.current;
        if (!wheel) return;
        gsap.killTweensOf(wheel);
        const targetRotation =
            Math.round((fromRotation ?? rotationRef.current) / ANGLE_STEP) *
            ANGLE_STEP;
        gsap.to(wheel, {
            rotationY: targetRotation,
            duration: 0.5,
            ease: "power2.out",
            onUpdate: () => {
                rotationRef.current = gsap.getProperty(wheel, "rotationY") || 0;
                setActiveIndex(getActiveIndex(rotationRef.current));
            },
        });
    };

    useEffect(() => {
        const stage = stageRef.current;
        const wheel = wheelRef.current;
        if (!stage || !wheel) return;

        let startX = 0;
        let startRotation = 0;
        let lastX = 0;
        let velocity = 0;
        let isDragging = false;

        const onPointerDown = (e) => {
            e.preventDefault();
            isDragging = true;
            startX = e.clientX ?? e.touches?.[0]?.clientX ?? 0;
            lastX = startX;
            startRotation = rotationRef.current;
            velocity = 0;
            gsap.killTweensOf(wheel);
            stage.setPointerCapture?.(e.pointerId);
        };

        const onPointerMove = (e) => {
            if (!isDragging) return;
            e.preventDefault();
            const x = e.clientX ?? e.touches?.[0]?.clientX ?? 0;
            velocity = (x - lastX) * DRAG_SENSITIVITY;
            lastX = x;
            const delta = (x - startX) * DRAG_SENSITIVITY;
            rotationRef.current = startRotation + delta;
            wheel.style.transform = `rotateY(${rotationRef.current}deg)`;
            setActiveIndex(getActiveIndex(rotationRef.current));
        };

        const onPointerUp = (e) => {
            if (!isDragging) return;
            isDragging = false;
            stage.releasePointerCapture?.(e.pointerId);

            const endX = e.clientX ?? e.touches?.[0]?.clientX ?? 0;
            const dragDist = Math.abs(endX - startX);

            if (dragDist < CLICK_THRESHOLD) {
                const rect = stage.getBoundingClientRect();
                const clickX = startX - rect.left;
                if (clickX < rect.width / 2) {
                    goToPrev();
                } else {
                    goToNext();
                }
                return;
            }

            const minVelocity = 3;
            const hasInertia = Math.abs(velocity) > minVelocity;
            const targetRotation = hasInertia
                ? rotationRef.current + velocity * INERTIA_MULTIPLIER
                : rotationRef.current;

            const snapRotation =
                Math.round(targetRotation / ANGLE_STEP) * ANGLE_STEP;

            if (hasInertia) {
                gsap.to(wheel, {
                    rotationY: snapRotation,
                    duration: 0.6,
                    ease: "power2.out",
                    onUpdate: () => {
                        rotationRef.current =
                            gsap.getProperty(wheel, "rotationY") || 0;
                        setActiveIndex(getActiveIndex(rotationRef.current));
                    },
                });
            } else {
                gsap.killTweensOf(wheel);
                gsap.set(wheel, { rotationY: snapRotation });
                rotationRef.current = snapRotation;
                setActiveIndex(getActiveIndex(snapRotation));
            }
        };

        stage.addEventListener("pointerdown", onPointerDown, { passive: false });
        window.addEventListener("pointermove", onPointerMove, { passive: false });
        window.addEventListener("pointerup", onPointerUp, { passive: false });
        window.addEventListener("pointercancel", onPointerUp, { passive: false });

        return () => {
            stage.removeEventListener("pointerdown", onPointerDown);
            window.removeEventListener("pointermove", onPointerMove);
            window.removeEventListener("pointerup", onPointerUp);
            window.removeEventListener("pointercancel", onPointerUp);
        };
    }, []);

    return (
        <div className={styles.carousel}>
            <div className={styles.stageWrap}>
                <div className={styles.stage} ref={stageRef}>
                    <div className={styles.perspectiveBox}>
                        <div className={styles.wheel} ref={wheelRef}>
                            {IMAGES.map((img, i) => (
                                <div
                                    key={img.src}
                                    className={styles.item}
                                    style={{
                                        transform: `rotateY(${i * ANGLE_STEP}deg) translateZ(${RADIUS}px)`,
                                    }}>
                                    <div
                                        className={`${styles.imageWrap} ${
                                            activeIndex === i
                                                ? styles.imageActive
                                                : styles.imageSide
                                        }`}>
                                        <Image
                                            src={img.src}
                                            alt={img.alt}
                                            fill
                                            className={styles.image}
                                            sizes="(max-width: 768px) 80vw, 400px"
                                            unoptimized
                                            draggable={false}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className={styles.controls}>
                    <button
                        type="button"
                        className={styles.arrowBtn}
                        onClick={goToPrev}
                        aria-label="Previous image">
                        <ChevronLeft className={styles.arrowIcon} />
                    </button>
                    <p className={styles.counter}>
                        {activeIndex + 1} / {IMAGE_COUNT}
                    </p>
                    <button
                        type="button"
                        className={styles.arrowBtn}
                        onClick={goToNext}
                        aria-label="Next image">
                        <ChevronRight className={styles.arrowIcon} />
                    </button>
                </div>
            </div>
        </div>
    );
}
