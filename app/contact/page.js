"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { TextPlugin } from "gsap/TextPlugin";
import Footer from "../components/Footer";
import styles from "./page.module.css";

gsap.registerPlugin(TextPlugin);

export default function ContactPage() {
  const btnRef = useRef(null);
  const btnTLRef = useRef(null);

  useEffect(() => {
    const btn = btnRef.current;
    if (!btn) return;

    const btnTL = gsap.timeline({ paused: true })
      .to(btn, {
        duration: 1,
        text: { value: "Sending...", type: "diff" },
        ease: "sine.in",
      })
      .to(btn, {
        duration: 0.6,
        text: { value: "Sending", type: "diff" },
        ease: "sine.inOut",
        repeat: 4,
        yoyo: true,
      })
      .to(
        btn,
        {
          text: "Sent!",
          ease: "none",
        },
        "+=0.5"
      );

    btnTLRef.current = btnTL;

    const handlePointerUp = () => btnTL.play(0);

    btn.addEventListener("pointerup", handlePointerUp);

    return () => {
      btn.removeEventListener("pointerup", handlePointerUp);
      btnTL.kill();
    };
  }, []);

  return (
    <main>
      <section id="contact" className={styles.contact}>
        <p className={styles.contactPrompt}>Have an idea?</p>
        <h2 className={styles.contactTitle}>Let&apos;s talk!</h2>
        <form
          className={styles.contactForm}
          onSubmit={(e) => e.preventDefault()}
        >
          <input type="text" placeholder="Name" className={styles.formInput} />
          <input type="email" placeholder="Email" className={styles.formInput} />
          <textarea placeholder="Message" className={styles.formTextarea} rows={4} />
          <button
            ref={btnRef}
            type="submit"
            className={styles.formButton}
          >
            SEND
          </button>
        </form>
      </section>
      <Footer />
    </main>
  );
}
