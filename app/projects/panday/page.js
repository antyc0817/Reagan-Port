import Image from "next/image";
import Link from "next/link";
import styles from "../project.module.css";

export const metadata = {
  title: "Panday | Reagan",
  description: "Panday project by Reagan Lung",
};

export default function PandayProject() {
  return (
    <main className={styles.project}>
      <div className={styles.backBar}>
        <Link href="/#works" className={styles.back} aria-label="Back to Works">
          <Image src="/icons/arrow.svg" alt="" width={20} height={20} className={styles.backArrow} />
        </Link>
      </div>
      <div className={styles.container}>
        <p className={styles.underConstruction}>Under construction</p>
      </div>
    </main>
  );
}
