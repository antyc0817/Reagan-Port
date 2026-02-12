import Image from "next/image";
import Link from "next/link";
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
        <Image src="/images/cuisine-clinic/herocc.png" alt="Cuisine Clinic" fill className={styles.heroImg} sizes="100vw" unoptimized priority />
        <Image
          src="/images/cuisine-clinic/cc%20logo.svg"
          alt="Cuisine Clinic"
          width={220}
          height={220}
          className={styles.heroLogo}
          unoptimized
        />
        <p className={styles.heroCaption}>
          Custom packing & Dieline | [<em>Oct 2025</em>]
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
      <div className={styles.container}>
        <p className={styles.underConstruction}>Under construction</p>
      </div>
    </main>
  );
}
