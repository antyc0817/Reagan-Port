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
        <p className={`${styles.heroCaption} ${styles.heroCaptionOnImage}`}>
          Travel Brochure & Publication | [ <em>Oct 2025</em> ]
        </p>
      </div>
      <section className={styles.projectIntro}>
        <h2 className={styles.projectIntroHeadline}>
          Capturing the contrast between fast urban energy and ancient tradition.
        </h2>
        <div className={styles.projectIntroMeta}>
          <div className={styles.projectIntroDivider} />
          <div className={styles.projectIntroDetails}>
            <div className={styles.projectIntroItem}>
              <span className={styles.projectIntroLabel}>Role</span>
              <span className={styles.projectIntroValue}>Graphic Designer</span>
            </div>
            <div className={styles.projectIntroDividerV} />
            <div className={styles.projectIntroItem}>
              <span className={styles.projectIntroLabel}>Tools</span>
              <span className={styles.projectIntroValue}>Adobe InDesign, Photoshop, &amp; Illustrator</span>
            </div>
            <div className={styles.projectIntroDividerV} />
            <div className={styles.projectIntroItem}>
              <span className={styles.projectIntroLabel}>Focus</span>
              <span className={styles.projectIntroValue}>Editorial Design</span>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
