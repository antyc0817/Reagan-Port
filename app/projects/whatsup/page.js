import styles from "../project.module.css";

export const metadata = {
  title: "WhatSUP | Reagan",
  description: "WhatSUP project by Reagan Lung",
};

export default function WhatsUpProject() {
  return (
    <main className={styles.project}>
      <div className={styles.container}>
        <p className={styles.underConstruction}>Under construction</p>
      </div>
    </main>
  );
}
