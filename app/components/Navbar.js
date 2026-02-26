"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import styles from "./Navbar.module.css";
import { useEnter } from "../context/EnterContext";

const MOBILE_BREAKPOINT = 768;

export default function Navbar() {
  const pathname = usePathname();
  const { hasEntered } = useEnter();
  const navRef = useRef(null);
  const lastScrollY = useRef(0);
  const hidden = useRef(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= MOBILE_BREAKPOINT);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    if (!navRef.current) return;

    const shouldStartHidden = isMobile && hasEntered && pathname === "/";

    if (shouldStartHidden) {
      gsap.set(navRef.current, { yPercent: -110 });
      hidden.current = true;
    } else {
      gsap.set(navRef.current, { yPercent: 0 });
      hidden.current = false;
    }
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
  }, [hasEntered, pathname, isMobile]);

  useEffect(() => {
    if (!navRef.current) return;
    const shouldStayHidden = isMobile && hasEntered && pathname === "/";

    if (shouldStayHidden && hidden.current) {
      return;
    }
    hidden.current = false;
    gsap.to(navRef.current, {
      yPercent: 0,
      duration: 0.3,
      ease: "power3.out",
      overwrite: "auto",
    });
    lastScrollY.current = window.scrollY;
  }, [pathname, hasEntered, isMobile]);

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
