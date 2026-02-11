import Link from "next/link";
import styles from "../project.module.css";

export const metadata = {
  title: "Panday | Reagan",
  description: "Panday project by Reagan Lung",
};

export default function PandayProject() {
  return (
    <main className={styles.project}>
      <div className={styles.container}>
        <Link href="/#works" className={styles.back}>← Back to Works</Link>
        <div className={styles.header}>
          <h1 className={styles.title}>[ Panday ]</h1>
          <p className={styles.subtitle}>[ UI/UX CASE STUDY ]</p>
          <p className={styles.date}>[ Sep - Dec 2025 ]</p>
        </div>
        <div className={styles.description}>
          <p>Built to bridge the gap between ambition and certification, Panday transforms the complexity of skilled trades into a clear, visual journey. This project utilized AI-driven guidance and career mapping to simplify the road to Red Seal, turning a daunting process into a structured path forward.</p>
        </div>
      </div>
    </main>
  );
}
