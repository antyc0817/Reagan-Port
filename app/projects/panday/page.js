import Image from "next/image";
import styles from "../projects.module.css";
import PandayObjectiveSection from "./PandayObjectiveSection";

export const metadata = {
  title: "Panday | Reagan",
  description: "Panday project by Reagan Lung",
};

export default function PandayProject() {
  return (
    <main className={styles.project}>
      <div className={styles.heroWrap}>
        <div className={`${styles.heroImageContainer} ${styles.pandayHeroContainer}`}>
          <Image
            src="/images/panday/hero.webp"
            alt="Panday hero"
            fill
            className={`${styles.heroImg} ${styles.pandayHeroImgTone}`}
            sizes="100vw"
            unoptimized
            priority
          />
          <div className={styles.pandayHeroOverlay} aria-hidden />
          <div className={styles.pandayHeroBrandStack}>
            <Image
              src="/images/panday/panday%20logo.svg"
              alt="Panday logo"
              width={280}
              height={280}
              className={styles.pandayHeroLogo}
              unoptimized
            />
            <p className={styles.pandayHeroTagline}>
              Built to turn a broken system into a clear path forward.
            </p>
          </div>
          <div className={styles.pandayHeroInfo}>
            <div className={styles.pandayMetaBar}>
              <div className={styles.pandayMetaItem}>
                <span className={styles.pandayMetaLabel}>Role</span>
                <span className={styles.pandayMetaValue}>Lead UI/UX Designer</span>
              </div>
              <div className={styles.pandayMetaItem}>
                <span className={styles.pandayMetaLabel}>Team</span>
                <span className={styles.pandayMetaValue}>8 Members Cross-Functional</span>
              </div>
              <div className={styles.pandayMetaItem}>
                <span className={styles.pandayMetaLabel}>Duration</span>
                <span className={styles.pandayMetaValue}>Sep - Dec 2025</span>
              </div>
              <div className={styles.pandayMetaItem}>
                <span className={styles.pandayMetaLabel}>Focus</span>
                <span className={styles.pandayMetaValue}>UI/UX Case Study</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <PandayObjectiveSection />
    </main>
  );
}
