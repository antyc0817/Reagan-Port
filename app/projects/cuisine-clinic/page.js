import Link from "next/link";
import styles from "../_styles/project.module.css";

export const metadata = {
  title: "Cuisine Clinic | Reagan",
  description: "Cuisine Clinic project by Reagan Lung",
};

export default function CuisineClinicProject() {
  return (
    <main className={styles.project}>
      <div className={styles.container}>
        <Link href="/#works" className={styles.back}>← Back to Works</Link>
        <h1 className={styles.title}>[CUISINE CLINIC]</h1>
        <p className={styles.label}>PROJECT</p>
        <div className={styles.content}>
          <p>Project details and case study for Cuisine Clinic. Add your project description, images, and process here.</p>
        </div>
      </div>
    </main>
  );
}
