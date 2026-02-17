import Image from "next/image";
import styles from "../projects.module.css";

export const metadata = {
  title: "Soul of South Korea | Reagan",
  description: "Soul of South Korea project by Reagan Lung",
};

export default function SoulOfSouthKoreaProject() {
  return (
    <main className={styles.project}>
      <div className={styles.heroWrap}>
        <div className={`${styles.heroImageContainer} ${styles.fullViewportHeroContainer}`}>
          <Image
            src="/images/soul-of-south-korea/hero.png"
            alt="Soul of South Korea hero"
            fill
            className={`${styles.heroImg} ${styles.fullViewportHeroImg}`}
            sizes="100vw"
            unoptimized
            priority
          />
        </div>
        <p className={`${styles.heroCaption} ${styles.heroCaptionOnImage} ${styles.soulHeroCaption}`}>
          Travel Brochure & Publication | [ <em>Oct 2025</em> ]
        </p>
      </div>
      <section className={styles.soulInfoSection}>
        <h2 className={styles.soulTagline}>
          Capturing the duality between high-speed urban energy and ancient, quiet tradition.
        </h2>
        <div className={styles.soulInfoGrid}>
          <div className={styles.soulInfoCard}>
            <span className={styles.soulInfoLabel}>Role</span>
            <span className={styles.soulInfoValue}>Graphic Designer</span>
          </div>
          <div className={styles.soulInfoCard}>
            <span className={styles.soulInfoLabel}>Tools</span>
            <span className={styles.soulInfoValue}>Adobe InDesign, Photoshop, &amp; Illustrator</span>
          </div>
          <div className={styles.soulInfoCard}>
            <span className={styles.soulInfoLabel}>Focus</span>
            <span className={styles.soulInfoValue}>Editorial Design</span>
          </div>
        </div>
      </section>
    </main>
  );
}
