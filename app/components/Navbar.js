import Image from "next/image";
import Link from "next/link";
import styles from "./Navbar.module.css";

export default function Navbar() {
  return (
    <nav className={styles.navbar}>
      <Link href="/" className={styles.logo}>
        <Image src="/icons/r-icon.png" alt="Home" width={36} height={36} className={styles.logoIcon} unoptimized />
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
