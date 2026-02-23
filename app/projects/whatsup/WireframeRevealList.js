"use client";

import { useEffect, useRef } from "react";
import styles from "../projects.module.css";

const WIREFRAME_ITEMS = [
    {
        id: "wireframe-1",
        title: "Scannable Selection (Visual Cards)",
        solution: "I replaced long, dense text blocks with clean, scannable cards.",
        reason:
            'Instead of making users read a manual to find a price, these cards highlight the essential info - pricing and a "Learn More" button - making the browsing experience effortless and visually engaging.',
    },
    {
        id: "wireframe-2",
        title: "Smart Navigation (Sidebar Filtering)",
        solution: "I added a dedicated filter for age and skill level.",
        reason:
            'This stops the "scroll fatigue." By allowing users to filter for specific certifications or skill levels instantly, I ensured that the Local Pro and the Weekend Explorer both find exactly what they need in seconds.',
    },
    {
        id: "wireframe-3",
        title: "The Safety Anchor (Live Updates)",
        solution: "I integrated a real-time weather widget and a Bowen Island map directly into the footer.",
        reason:
            "Combining live weather with a local map ensures paddlers have both the conditions and the geography they need to plan a safe trip at a glance.",
    },
];

export default function WireframeRevealList() {
    const itemRefs = useRef([]);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries, obs) => {
                entries.forEach((entry) => {
                    if (!entry.isIntersecting) return;
                    entry.target.classList.add(styles.whatsupWireframeItemVisible);
                    obs.unobserve(entry.target);
                });
            },
            {
                threshold: 0.22,
                rootMargin: "0px 0px -8% 0px",
            }
        );

        itemRefs.current.forEach((item) => {
            if (item) observer.observe(item);
        });

        return () => observer.disconnect();
    }, []);

    return (
        <div className={styles.whatsupWireframeList}>
            {WIREFRAME_ITEMS.map((item, index) => (
                <article
                    key={item.id}
                    ref={(el) => {
                        itemRefs.current[index] = el;
                    }}
                    className={`${styles.whatsupWireframeItem} ${styles.whatsupWireframeItemReveal}`}
                    style={{ transitionDelay: `${index * 140}ms` }}>
                    <div className={styles.whatsupWireframeMediaBlock}>
                        <h4 className={styles.whatsupWireframeItemTitle}>{item.title}</h4>
                        <div className={styles.whatsupWireframeMedia}>
                            <div className={styles.whatsupWireframePlaceholder} aria-hidden />
                        </div>
                    </div>

                    <div className={styles.whatsupWireframeTextBlock}>
                        <div className={`${styles.whatsupWireframeDetailGroup} ${styles.whatsupWireframeDetailGroupSolution}`}>
                            <p className={`${styles.whatsupWireframeLabel} ${styles.whatsupWireframeLabelSolution}`}>Solution</p>
                            <p className={styles.whatsupWireframeLine}>{item.solution}</p>
                        </div>

                        <div className={`${styles.whatsupWireframeDetailGroup} ${styles.whatsupWireframeDetailGroupReason}`}>
                            <p className={`${styles.whatsupWireframeLabel} ${styles.whatsupWireframeLabelReason}`}>Reason</p>
                            <p className={styles.whatsupWireframeLine}>{item.reason}</p>
                        </div>
                    </div>
                </article>
            ))}
        </div>
    );
}
