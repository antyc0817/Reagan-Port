import styles from "../projects.module.css";

export const metadata = {
  title: "Panday | Reagan",
  description: "Panday project by Reagan Lung",
};

export default function PandayProject() {
  return (
    <main className={styles.project}>
      <div className={styles.container}>
        <p className={styles.underConstruction}>Under construction</p>
      </div>
    </main>
  );
}
