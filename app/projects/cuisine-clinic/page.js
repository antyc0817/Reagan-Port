import Link from "next/link";
import styles from "../project.module.css";

export const metadata = {
  title: "Cuisine Clinic | Reagan",
  description: "Cuisine Clinic project by Reagan Lung",
};

export default function CuisineClinicProject() {
  return (
    <main className={styles.project}>
      <div className={styles.container}>
        <Link href="/#works" className={styles.back}>← Back to Works</Link>
        <div className={styles.header}>
          <h1 className={styles.title}>[ Cuisine Clinic ]</h1>
          <p className={styles.subtitle}>[ Custom Packaging & Dieline ]</p>
          <p className={styles.date}>[ Oct 2025 ]</p>
        </div>
        <div className={styles.description}>
          <p>Built to evoke the calm of a fresh start, Cuisine Clinic turns a medical remedy into a physical experience. This project involved crafting custom packaging dielines and mockups to bring a sense of order to the morning after.</p>
        </div>
      </div>
    </main>
  );
}
