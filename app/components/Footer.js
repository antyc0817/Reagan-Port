import Link from "next/link";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <span className={styles.footerSep}>x</span>
      <p className={styles.footerName}>Reagan Lung</p>
      <div className={styles.footerBottom}>
        <span className={styles.footerIcon}>R</span>
        <span className={styles.footerCopy}>COPYRIGHT 2017</span>
        <Link href="/#contact" className={styles.footerPrivacy}>PRIVACY</Link>
      </div>
    </footer>
  );
}
