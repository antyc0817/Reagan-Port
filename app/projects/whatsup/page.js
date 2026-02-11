import Link from "next/link";
import styles from "../project.module.css";

export const metadata = {
  title: "WhatSUP | Reagan",
  description: "WhatSUP project by Reagan Lung",
};

export default function WhatsUpProject() {
  return (
    <main className={styles.project}>
      <div className={styles.container}>
        <Link href="/#works" className={styles.back}>← Back to Works</Link>
        <div className={styles.header}>
          <h1 className={styles.title}>[ WhatSUP ]</h1>
          <p className={styles.subtitle}>[ Redesign & Brand Identity ]</p>
          <p className={styles.date}>[ Jan - May 2025 ]</p>
        </div>
        <div className={styles.description}>
          <p>Built to breathe new life into a digital legacy, WhatSUP transforms an outdated presence into a sharp, modern experience. This project centered on a complete visual overhaul and logo redesign, using sitemap restructuring and usability testing to create an intuitive flow.</p>
        </div>
      </div>
    </main>
  );
}
