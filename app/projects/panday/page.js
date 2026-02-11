import Link from "next/link";
import styles from "./project.module.css";

export const metadata = {
  title: "Panday | Reagan",
  description: "Panday project by Reagan Lung",
};

export default function PandayProject() {
  return (
    <main className={styles.project}>
      <div className={styles.container}>
        <Link href="/#works" className={styles.back}>← Back to Works</Link>
        <h1 className={styles.title}>[PANDAY]</h1>
        <p className={styles.label}>PROJECT</p>
        <div className={styles.content}>
          <p>Project details and case study for Panday. Add your project description, images, and process here.</p>
        </div>
      </div>
    </main>
  );
}
