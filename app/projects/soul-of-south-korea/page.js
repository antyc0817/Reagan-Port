import Link from "next/link";
import styles from "./project.module.css";

export const metadata = {
  title: "Soul of South Korea | Reagan",
  description: "Soul of South Korea project by Reagan Lung",
};

export default function SoulOfSouthKoreaProject() {
  return (
    <main className={styles.project}>
      <div className={styles.container}>
        <Link href="/#works" className={styles.back}>← Back to Works</Link>
        <h1 className={styles.title}>[SOUL OF SOUTH KOREA]</h1>
        <p className={styles.label}>PROJECT</p>
        <div className={styles.content}>
          <p>Project details and case study for Soul of South Korea. Add your project description, images, and process here.</p>
        </div>
      </div>
    </main>
  );
}
