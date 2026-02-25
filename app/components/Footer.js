 "use client";

import { useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import styles from "./Footer.module.css";

export default function Footer() {
    const starRef = useRef(null);
    const catRef = useRef(null);
    const catCanTriggerRef = useRef(true);
    const catHasLeftRef = useRef(true);
    const catCooldownUntilRef = useRef(0);

    const handleStarHover = () => {
        if (!starRef.current) return;
        gsap.fromTo(
            starRef.current,
            { rotate: 0 },
            { rotate: 360, duration: 0.65, ease: "power2.out", transformOrigin: "50% 50%", overwrite: true }
        );
    };

    const handleCatHover = () => {
        if (!catRef.current) return;
        const now = Date.now();
        if (!catCanTriggerRef.current || !catHasLeftRef.current || now < catCooldownUntilRef.current) return;

        catCanTriggerRef.current = false;
        catHasLeftRef.current = false;
        gsap.killTweensOf(catRef.current);
        gsap.to(catRef.current, {
            transformOrigin: "50% 100%",
            duration: 0.86,
            overwrite: "auto",
            keyframes: [
                { y: -16, rotation: -6, scaleX: 1.06, scaleY: 0.94, duration: 0.16, ease: "power2.out" },
                { y: 0, rotation: 4, scaleX: 0.97, scaleY: 1.03, duration: 0.2, ease: "power2.in" },
                { y: -10, rotation: -3, scaleX: 1.03, scaleY: 0.97, duration: 0.13, ease: "power1.out" },
                { y: 0, rotation: 2, scaleX: 0.98, scaleY: 1.02, duration: 0.2, ease: "bounce.out" },
                { y: 0, rotation: 0, scaleX: 1, scaleY: 1, duration: 0.17, ease: "power1.out" },
            ],
            onComplete: () => {
                catCooldownUntilRef.current = Date.now() + 700;
                catCanTriggerRef.current = true;
            },
        });
    };

    const handleCatLeave = () => {
        catHasLeftRef.current = true;
    };

    return (
        <footer className={styles.footer}>
            <div className={styles.footerTop}>
                <span
                    ref={starRef}
                    className={styles.starSpinTarget}
                    onPointerEnter={handleStarHover}
                    aria-hidden>
                    <Image
                        src='/icons/a.png'
                        alt=''
                        width={24}
                        height={24}
                        className={styles.starIcon}
                        unoptimized
                    />
                </span>
                <p className={styles.footerName}>Reagan Lung</p>
            </div>
            <div className={styles.footerDivider} />
            <div className={styles.footerColumns}>
                <div className={styles.footerCol}>
                    <span className={styles.footerLinks}>
                        [HELLO] [@] [MEOW]
                    </span>
                </div>
                <div className={styles.footerColDivider} />
                <div className={styles.footerCol}>
                    <span
                        ref={catRef}
                        className={styles.footerCat}
                        onPointerEnter={handleCatHover}
                        onPointerLeave={handleCatLeave}>
                        ≽^- ˕ -^≼
                    </span>
                </div>
                <div className={styles.footerColDivider} />
                <div className={styles.footerCol}>
                    <span className={styles.footerCopy}>[©] [2026]</span>
                </div>
            </div>
        </footer>
    );
}
