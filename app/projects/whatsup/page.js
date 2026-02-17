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
                        className={`${styles.heroImg} ${styles.fullViewportHeroImg} ${styles.whatsupHeroImgBlur}`}
                        sizes='100vw'
                        unoptimized
                        priority
                    />
                    <Image
                        src='/images/whatsup/whatsup1.png'
                        alt='WhatSUP logo option 1'
                        width={260}
                        height={260}
                        className={styles.heroCompareLogo}
                        unoptimized
                    />
                    <div className={styles.heroProjectInfo}>
                        <div className={styles.heroProjectInfoLine} aria-hidden />
                        <div className={styles.heroProjectInfoItems}>
                            <div className={styles.heroProjectInfoItem}>
                                <span className={styles.heroProjectInfoLabel}>Role</span>
                                <span className={styles.heroProjectInfoValue}>UX/UI Designer</span>
                            </div>
                            <div className={styles.heroProjectInfoItem}>
                                <span className={styles.heroProjectInfoLabel}>Tools</span>
                                <span className={styles.heroProjectInfoValue}>Figma, WordPress</span>
                            </div>
                            <div className={styles.heroProjectInfoItem}>
                                <span className={styles.heroProjectInfoLabel}>Focus</span>
                                <span className={styles.heroProjectInfoValue}>Digital Redesign</span>
                            </div>
                        </div>
                        <div className={styles.heroProjectInfoLine} aria-hidden />
                        <p className={styles.heroProjectInfoTagline}>
                            Built to guide you from your first click to your first lesson on the water.
                        </p>
                    </div>
                    <div className={styles.heroOverlay} aria-hidden />
                </div>
                <p className={`${styles.heroCaption} ${styles.heroCaptionOnImage}`}>
                    Redesign & Brand Identity | [ <em>Jan - May 2025</em> ]
                </p>
            </div>
        </main>
    );
}
