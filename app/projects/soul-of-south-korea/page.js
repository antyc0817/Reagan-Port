import styles from "../project.module.css";

export const metadata = {
  title: "Soul of South Korea | Reagan",
  description: "Soul of South Korea project by Reagan Lung",
};

export default function SoulOfSouthKoreaProject() {
  return (
    <main className={styles.project}>
      <div className={styles.container}>
        <p className={styles.underConstruction}>Under construction</p>
      </div>
    </main>
  );
}
