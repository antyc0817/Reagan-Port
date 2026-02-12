import Image from "next/image";
import Link from "next/link";
import DesignSystemExpand from "./DesignSystemExpand";
import styles from "../project.module.css";

export const metadata = {
  title: "Cuisine Clinic | Reagan",
  description: "Cuisine Clinic project by Reagan Lung",
};

export default function CuisineClinicProject() {
  return (
    <main className={styles.project}>
      <div className={styles.backBar}>
        <Link href="/#works" className={styles.back} aria-label="Back to Works">
          <Image src="/icons/arrow.svg" alt="" width={32} height={32} className={styles.backArrow} />
        </Link>
      </div>
      <div className={styles.heroWrap}>
        <div className={styles.heroImageContainer}>
          <Image src="/images/cuisine-clinic/herocc.png" alt="Cuisine Clinic" fill className={styles.heroImg} sizes="100vw" unoptimized priority />
          <Image
            src="/images/cuisine-clinic/cc%20logo.svg"
            alt="Cuisine Clinic"
            width={220}
            height={220}
            className={styles.heroLogo}
            unoptimized
          />
        </div>
        <p className={styles.heroCaption}>
          Custom packaging & Dieline | [ <em>Oct 2025</em> ]
        </p>
      </div>
      <section className={styles.projectIntro}>
        <h2 className={styles.projectIntroHeadline}>
          Built to turn the morning-after haze into a premium, clinical fresh start.
        </h2>
        <div className={styles.projectIntroDivider} />
        <div className={styles.projectIntroDetails}>
          <div className={styles.projectIntroItem}>
            <span className={styles.projectIntroLabel}>Role</span>
            <span className={styles.projectIntroValue}>Graphic Designer</span>
          </div>
          <div className={styles.projectIntroDividerV} />
          <div className={styles.projectIntroItem}>
            <span className={styles.projectIntroLabel}>Tools</span>
            <span className={styles.projectIntroValue}>Adobe Illustrator & Photoshop</span>
          </div>
          <div className={styles.projectIntroDividerV} />
          <div className={styles.projectIntroItem}>
            <span className={styles.projectIntroLabel}>Focus</span>
            <span className={styles.projectIntroValue}>Branding & Identity</span>
          </div>
        </div>
      </section>
      <section className={styles.projectSection}>
        <div className={styles.projectSectionGrid}>
          <h3 className={styles.projectSectionTitle}>[ Objective ]</h3>
          <div className={styles.projectSectionImage}>
            <Image
              src="/images/cuisine-clinic/S1.png"
              alt="Cuisine Clinic"
              width={480}
              height={360}
              className={styles.projectSectionImg}
              unoptimized
            />
          </div>
          <div className={styles.projectSectionText}>
            <p>
              Recovery shouldn&apos;t feel like a chore. The market was flooded with options, but most felt like a dull pharmacy visit or an overwhelming assault of loud graphics. There was a clear gap for a brand that understood the need for a genuine fresh start, not just a quick fix.
            </p>
            <p>
              My mission was to bridge that gap by taking the concept of a medical remedy and transforming it into a premium experience. By clearing out the visual noise, I built a system that is clean, orderly, and effortless—providing total clarity right when the user needs it most.
            </p>
          </div>
        </div>
      </section>
      <section className={`${styles.projectSection} ${styles.designSystemSection}`}>
        <h3 className={styles.projectSectionTitle}>[ Design System ]</h3>
        <DesignSystemExpand />
      </section>
      <div className={styles.container}>
        <p className={styles.underConstruction}>Under construction</p>
      </div>
    </main>
  );
}
