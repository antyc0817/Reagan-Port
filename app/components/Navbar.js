import Link from "next/link";
import styles from "./Navbar.module.css";

export default function Navbar() {
  return (
    <nav className={styles.navbar}>
      <Link href="/" className={styles.logo}>
        Reagan
      </Link>
      <ul className={styles.links}>
        <li><Link href="/#home">HOME</Link></li>
        <li><Link href="/#about">ABOUT</Link></li>
        <li><Link href="/#works">WORKS</Link></li>
        <li><Link href="/#contact">CONTACT</Link></li>
      </ul>
    </nav>
  );
}
