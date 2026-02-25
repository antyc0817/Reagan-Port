"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import styles from "./Navbar.module.css";

export default function Navbar() {
  const pathname = usePathname();
  const navRef = useRef(null);
  const lastScrollY = useRef(0);
  const hidden = useRef(false);

  useEffect(() => {
    if (!navRef.current) return;

    gsap.set(navRef.current, { yPercent: 0 });
    hidden.current = false;
    lastScrollY.current = window.scrollY;

    const showNav = () => {
      if (!navRef.current || !hidden.current) return;
      hidden.current = false;
      gsap.to(navRef.current, {
        yPercent: 0,
        duration: 0.4,
        ease: "power3.out",
        overwrite: "auto",
      });
    };

    const hideNav = () => {
      if (!navRef.current || hidden.current) return;
      hidden.current = true;
      gsap.to(navRef.current, {
        yPercent: -110,
        duration: 0.35,
        ease: "power3.out",
        overwrite: "auto",
      });
    };

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY <= 50) {
        showNav();
      } else if (currentScrollY > lastScrollY.current) {
        hideNav();
      } else {
        showNav();
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!navRef.current) return;
    hidden.current = false;
    gsap.to(navRef.current, {
      yPercent: 0,
      duration: 0.3,
      ease: "power3.out",
      overwrite: "auto",
    });
    lastScrollY.current = window.scrollY;
  }, [pathname]);

  return (
    <nav ref={navRef} className={styles.navbar}>
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
