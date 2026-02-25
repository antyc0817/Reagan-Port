"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./Navbar.module.css";

export default function Navbar() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY < 50) {
        setVisible(true);
      } else if (currentScrollY > lastScrollY.current) {
        setVisible(false);
      } else {
        setVisible(true);
      }
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`${styles.navbar} ${!visible ? styles.navbarHidden : ""}`}>
      <div className={`${styles.navbarSection} ${styles.navbarLeft}`}>
        <Link
          href="/work"
          className={`${styles.link} ${pathname === "/work" || pathname?.startsWith("/projects") ? styles.linkActive : ""}`}
        >
          WORK
        </Link>
        <Link href="/about" className={`${styles.link} ${pathname === "/about" ? styles.linkActive : ""}`}>
          ABOUT
        </Link>
      </div>

      <div className={styles.navbarCenter}>
        <Link href="/" className={styles.logo} aria-label="Home">
          <Image src="/icons/r-icon.png" alt="Home" width={36} height={36} className={styles.logoIcon} unoptimized />
        </Link>
      </div>

      <div className={`${styles.navbarSection} ${styles.navbarRight}`}>
        <Link href="/game" className={`${styles.link} ${pathname === "/game" ? styles.linkActive : ""}`}>
          GAME
        </Link>
        <Link href="/contact" className={`${styles.link} ${pathname === "/contact" ? styles.linkActive : ""}`}>
          CONTACT
        </Link>
      </div>
    </nav>
  );
}
