import Image from "next/image";
import styles from "../projects.module.css";

export const metadata = {
    title: "WhatSUP | Reagan",
    description: "WhatSUP project by Reagan Lung",
};

export default function WhatsUpProject() {
    return (
        <main className={styles.project}>
            <div className={styles.heroWrap}>
                <div className={`${styles.heroImageContainer} ${styles.fullViewportHeroContainer}`}>
                    <Image
                        src='/images/whatsup/hero.jpg'
                        alt='WhatSUP hero'
                        fill
                        className={`${styles.heroImg} ${styles.fullViewportHeroImg}`}
                        sizes='100vw'
                        unoptimized
                        priority
                    />
                    <div className={styles.heroOverlay} aria-hidden />
                </div>
                <p className={`${styles.heroCaption} ${styles.heroCaptionOnImage}`}>
                    Redesign & Brand Identity | [ <em>Jan - May 2025</em> ]
                </p>
            </div>
            <div className={styles.container}>
                <p className={styles.underConstruction}>Under construction</p>
            </div>
        </main>
    );
}
