"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import Footer from "../components/Footer";
import styles from "./page.module.css";

const SKILL_TAGS = ["Product Design", "UX/UI", "Brand Identity", "Figma", "HTML & CSS", "Bilingual"];
const BEYOND_ITEMS = [
  { name: "Niagara Falls", date: "08/05/2024", image: "/images/about/g1.webp" },
  { name: "Pickleball", date: "07/20/2025", image: "/images/about/g2.webp" },
  { name: "Cooking", date: "10/14/2024", image: "/images/about/g3.webp" },
  { name: "Fishing", date: "07/15/2025", image: "/images/about/g4.webp" },
  { name: "Motorcycle", date: "06/02/2022", image: "/images/about/g5.webp" },
];

export default function AboutPage() {
  const leftContentRefs = useRef([]);
  const pillRefs = useRef([]);
  const headingRef = useRef(null);
  const originSectionRef = useRef(null);
  const originHasAnimatedRef = useRef(false);
  const [textWidth, setTextWidth] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const items = leftContentRefs.current.filter(Boolean);
    if (!items.length) return;

    gsap.fromTo(
      items,
      { opacity: 0, y: 20, filter: "blur(6px)" },
      {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 0.55,
        stagger: 0.12,
        ease: "power2.out",
      }
    );
  }, []);

  useEffect(() => {
    const pills = pillRefs.current.filter(Boolean);
    if (!pills.length) return;

    const cleanups = [];
    pills.forEach((pill) => {
      const fill = pill.querySelector(`.${styles.btnFill}`);
      const text = pill.querySelector(`.${styles.pillText}`);
      if (!fill) return;

      const handleEnter = (event) => {
        const { left, top } = pill.getBoundingClientRect();
        const x = event.clientX - left;
        const y = event.clientY - top;
        gsap.killTweensOf(fill);
        if (text) gsap.killTweensOf(text);

        gsap.set(fill, {
          x,
          y,
          xPercent: -50,
          yPercent: -50,
          width: 0,
          height: 0,
          opacity: 1,
        });

        const fillEnterTl = gsap.timeline();
        fillEnterTl
          .to(fill, {
            width: "70%",
            height: "70%",
            duration: 0.08,
            ease: "power2.in",
          })
          .to(fill, {
            width: "400%",
            height: "400%",
            duration: 0.52,
            ease: "back.out(1.2)",
          });
        if (text) {
          gsap.to(text, {
            color: "#ffffff",
            duration: 0.25,
            ease: "power1.out",
          });
        }
      };

      const handleLeave = (event) => {
        const { left, top } = pill.getBoundingClientRect();
        const x = event.clientX - left;
        const y = event.clientY - top;
        gsap.killTweensOf(fill);
        gsap.to(fill, {
          x,
          y,
          width: 0,
          height: 0,
          duration: 0.35,
          ease: "power2.in",
        });
        if (text) {
          gsap.to(text, {
            color: "#111",
            duration: 0.22,
            ease: "power1.out",
          });
        }
      };

      pill.addEventListener("mouseenter", handleEnter);
      pill.addEventListener("mouseleave", handleLeave);

      cleanups.push(() => {
        pill.removeEventListener("mouseenter", handleEnter);
        pill.removeEventListener("mouseleave", handleLeave);
      });
    });

    return () => cleanups.forEach((clean) => clean());
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 900);
      if (headingRef.current) {
        const width = Math.round(headingRef.current.getBoundingClientRect().width);
        if (width) setTextWidth(width);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const section = originSectionRef.current;
    if (!section) return;

    const playOriginTimeline = () => {
      if (originHasAnimatedRef.current) return;
      originHasAnimatedRef.current = true;

      const items = Array.from(section.querySelectorAll(`.${styles.timelineItem}`));
      if (!items.length) return;

      const allConnectors = items
        .map((item) => item.querySelector(`.${styles.timelineConnector}`))
        .filter(Boolean);
      const allDotFills = items
        .map((item) => item.querySelector(`.${styles.timelineDotFill}`))
        .filter(Boolean);

      gsap.set(allConnectors, { scaleY: 0, transformOrigin: "50% 0%" });
      gsap.set(allDotFills, { scaleY: 0, transformOrigin: "50% 100%" });

      const tl = gsap.timeline();

      items.forEach((item) => {
        const dot = item.querySelector(`.${styles.timelineDot}`);
        const dotFill = item.querySelector(`.${styles.timelineDotFill}`);
        const connector = item.querySelector(`.${styles.timelineConnector}`);

        if (dotFill) {
          tl.to(dotFill, {
            scaleY: 1,
            duration: 0.32,
            ease: "power2.out",
          }).to(
            dot,
            {
              boxShadow: "0 0 0 7px rgba(64, 180, 196, 0.25)",
              duration: 0.18,
              ease: "sine.out",
            },
            "<"
          ).to(dot, {
            boxShadow: "0 0 0 0 rgba(64, 180, 196, 0)",
            duration: 0.2,
            ease: "sine.in",
          });
        }

        if (connector) {
          tl.to(
            connector,
            {
              scaleY: 1,
              backgroundColor: "rgba(64, 180, 196, 0.7)",
              duration: 0.55,
              ease: "power2.inOut",
            },
            "-=0.06"
          );
        }
      });
    };

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry?.isIntersecting) {
          playOriginTimeline();
          observer.disconnect();
        }
      },
      { threshold: 0.35 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, [styles.timelineConnector, styles.timelineDot, styles.timelineDotFill, styles.timelineItem]);

  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <div
          className={styles.left}
          style={{
            "--hero-text-width": isMobile
              ? "min(92vw, 520px)"
              : textWidth
                ? `${textWidth}px`
                : undefined,
          }}
        >
          <p
            ref={(el) => {
              leftContentRefs.current[0] = el;
            }}
            className={styles.eyebrow}
          >
            Designer · Storyteller · Dragon
          </p>

          <h1
            ref={(el) => {
              leftContentRefs.current[1] = el;
              headingRef.current = el;
            }}
            className={styles.heading}
          >
            <span>Hi, I&apos;m</span>
            <span className={styles.headingAccent}>Reagan Lung</span>
          </h1>

          <p
            ref={(el) => {
              leftContentRefs.current[2] = el;
            }}
            className={styles.subheading}
          >
            Chasing the moment everything clicks.
          </p>

          <p
            ref={(el) => {
              leftContentRefs.current[3] = el;
            }}
            className={styles.body}
          >
            <strong>A product designer who grew up between two worlds — Taiwan and Canada —</strong> and learned early
            that the best work lives where different perspectives meet.
          </p>

          <ul
            ref={(el) => {
              leftContentRefs.current[4] = el;
            }}
            className={styles.tags}
            aria-label="Skills"
          >
            {SKILL_TAGS.map((tag, index) => (
              <li
                key={tag}
                className={styles.pillItem}
              >
                <div
                  ref={(el) => {
                    pillRefs.current[index] = el;
                  }}
                  className={styles.pill}
                >
                  <span className={styles.pillText}>{tag}</span>
                  <div className={styles.btnFill} />
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.right}>
          <Image
            src="/images/about/about1.webp"
            alt="Portrait of Reagan Lung"
            fill
            className={styles.photo}
            sizes="(max-width: 900px) 100vw, 50vw"
            priority
            unoptimized
          />

          <div className={styles.dragonCard}>
            <span className={styles.dragonCharacter}>龍</span>
            <span className={styles.dragonCaption}>Lung · Dragon · 2000</span>
          </div>
        </div>
      </section>
      <div className={styles.sectionDivider} aria-hidden="true" />

      <section ref={originSectionRef} className={styles.originStory}>
        <div className={styles.originLeft}>
          <p className={styles.originEyebrow}>Origin Story</p>
          <h2 className={styles.originTitle}>
            Born in the year of the
            <br />
            <em>Dragon.</em>
          </h2>
          <div className={styles.originDivider} />
          <div className={styles.originBody}>
            <p>
              I was born in 2000, the year of the Millennium Dragon. My last name, Lung, also happens to mean dragon
              in Chinese. Call it fate, call it coincidence - either way, it fits.
            </p>
            <p>
              I grew up in Taiwan until I was six, then my family moved to Vancouver. Growing up between two languages
              and two cultures allowed me to develop an insight and perspective that most people just don&apos;t have.
            </p>
            <p>
              In 2022 I got my first motorcycle. Learning to ride was genuinely overwhelming with so many controls, so
              many rules, so much happening at once. But the moment it all clicked, everything felt effortless. That
              feeling stuck with me. Good experiences shouldn&apos;t have to be earned through confusion. That&apos;s what drew
              me to design.
            </p>
          </div>
        </div>

        <div className={styles.originRight}>
          <div className={styles.timeline}>
            <div className={styles.timelineItem}>
              <div className={styles.timelineLine}>
                <div className={styles.timelineDot}>
                  <span className={styles.timelineDotFill} />
                </div>
                <div className={styles.timelineConnector} />
              </div>
              <div className={styles.timelineContent}>
                <p className={styles.timelineYear}>2000 · Taipei, Taiwan</p>
                <p className={styles.timelineText}>
                  <strong>I was born in the year of the Millennium Dragon.</strong> And yes, Lung (龍) really does mean
                  dragon in Chinese.
                </p>
              </div>
            </div>

            <div className={styles.timelineItem}>
              <div className={styles.timelineLine}>
                <div className={styles.timelineDot}>
                  <span className={styles.timelineDotFill} />
                </div>
                <div className={styles.timelineConnector} />
              </div>
              <div className={styles.timelineContent}>
                <p className={styles.timelineYear}>2006 · Vancouver, Canada</p>
                <p className={styles.timelineText}>
                  <strong>I moved to Vancouver at six.</strong> Growing up between two languages and two cultures allowed
                  me to develop an insight and perspective that most people just don&apos;t have.
                </p>
              </div>
            </div>

            <div className={styles.timelineItem}>
              <div className={styles.timelineLine}>
                <div className={styles.timelineDot}>
                  <span className={styles.timelineDotFill} />
                </div>
                <div className={styles.timelineConnector} />
              </div>
              <div className={styles.timelineContent}>
                <p className={styles.timelineYear}>2022 · The Spark</p>
                <p className={styles.timelineText}>
                  <strong>I got my first motorcycle.</strong> Steep learning curve, a lot of frustration, and the moment
                  that changed everything.
                </p>
              </div>
            </div>

            <div className={styles.timelineItem}>
              <div className={styles.timelineLine}>
                <div className={styles.timelineDot}>
                  <span className={styles.timelineDotFill} />
                </div>
                <div className={styles.timelineConnector} />
              </div>
              <div className={styles.timelineContent}>
                <p className={styles.timelineYear}>2024 · BCIT</p>
                <p className={styles.timelineText}>
                  <strong>I enrolled at BCIT.</strong> Decided it was time to turn that spark into something real.
                </p>
              </div>
            </div>

            <div className={styles.timelineItem}>
              <div className={styles.timelineLine}>
                <div className={styles.timelineDot}>
                  <span className={styles.timelineDotFill} />
                </div>
              </div>
              <div className={styles.timelineContent}>
                <p className={styles.timelineYear}>Now</p>
                <p className={styles.timelineText}>
                  <strong>Designing with one goal in mind.</strong> Take what&apos;s complex and make it feel simple,
                  intuitive, and human.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className={styles.sectionDivider} aria-hidden="true" />

      <section className={styles.beyond}>
        <p className={styles.beyondEyebrow}>Beyond the Work</p>
        <h2 className={styles.beyondTitle}>
          A life lived
          <br />
          <em>outside the screen.</em>
        </h2>
        <p className={styles.beyondSubtitle}>
          People forget the details. They never forget the <em>experience.</em>
        </p>

        <div className={styles.polaroidGrid}>
          {BEYOND_ITEMS.map((item) => (
            <article key={item.name} className={styles.polaroid}>
              <div className={styles.polaroidImg}>
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className={styles.polaroidPhoto}
                  sizes="(max-width: 480px) 280px, (max-width: 900px) 170px, 240px"
                  unoptimized
                />
              </div>
              <p className={styles.polaroidName}>{item.name}</p>
              <p className={styles.polaroidDate}>{item.date}</p>
            </article>
          ))}
        </div>
      </section>
      <Footer />
    </main>
  );
}
