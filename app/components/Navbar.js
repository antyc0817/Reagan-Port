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
    <nav className={`${styles.navbar} ${visible ? styles.navbarVisible : styles.navbarHidden}`}>
      <Link href="/" className={styles.logo}>
        <Image src="/icons/r-icon.png" alt="Home" width={36} height={36} className={styles.logoIcon} unoptimized />
      </Link>
      <ul className={styles.links}>
        <li>
          <Link
            href="/#works"
            className={`${styles.link} ${pathname === "/" || pathname?.startsWith("/projects") ? styles.linkActive : ""}`}
          >
            WORK
          </Link>
        </li>
        <li>
          <Link href="/about" className={`${styles.link} ${pathname === "/about" ? styles.linkActive : ""}`}>
            ABOUT
          </Link>
        </li>
        <li>
          <Link href="/#contact" className={styles.link}>
            CONTACT
          </Link>
        </li>
      </ul>
    </nav>
  );
}
