 "use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import styles from "./Footer.module.css";

export default function Footer() {
    const starRef = useRef(null);

    const handleStarHover = () => {
        if (!starRef.current) return;
        gsap.fromTo(
            starRef.current,
            { rotate: 0 },
            { rotate: 360, duration: 0.65, ease: "power2.out", transformOrigin: "50% 50%", overwrite: true }
        );
    };

    return (
        <footer className={styles.footer}>
            <div className={styles.footerTop}>
                <span
                    ref={starRef}
                    className={styles.starSpinTarget}
                    onMouseEnter={handleStarHover}
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
                    <span className={styles.footerCat}>≽^- ˕ -^≼</span>
                </div>
                <div className={styles.footerColDivider} />
                <div className={styles.footerCol}>
                    <span className={styles.footerCopy}>[©] [2026]</span>
                </div>
            </div>
        </footer>
    );
}
