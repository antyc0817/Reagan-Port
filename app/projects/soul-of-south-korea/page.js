import Link from "next/link";
import styles from "../project.module.css";

export const metadata = {
  title: "Soul of South Korea | Reagan",
  description: "Soul of South Korea project by Reagan Lung",
};

export default function SoulOfSouthKoreaProject() {
  return (
    <main className={styles.project}>
      <div className={styles.container}>
        <Link href="/#works" className={styles.back}>← Back to Works</Link>
        <div className={styles.header}>
          <h1 className={styles.title}>[ Soul of South Korea ]</h1>
          <p className={styles.subtitle}>[ Travel Brochure & Publication ]</p>
          <p className={styles.date}>[ Oct 2025 ]</p>
        </div>
        <div className={styles.description}>
          <p>Built to transport the curious traveler, Soul of South Korea turns a tour itinerary into a tactile journey. This project involved crafting a clean editorial layout and print-ready brochure designed to make an unfamiliar destination feel like home.</p>
        </div>
      </div>
    </main>
  );
}
