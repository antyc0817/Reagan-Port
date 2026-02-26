"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { useEnter } from "../context/EnterContext";
import { Draggable } from "gsap/Draggable";
import Image from "next/image";
import styles from "./PreloaderOverlay.module.css";

gsap.registerPlugin(Draggable);

export default function PreloaderOverlay() {
  const { setHasEntered } = useEnter();
  const overlayRef = useRef(null);
  const textRef = useRef(null);
  const dragonButtonRef = useRef(null);
  const dragonRef = useRef(null);
  const dragonBreathTweenRef = useRef(null);
  const enterTimelineRef = useRef(null);
  const draggableRef = useRef(null);
  const hasEnteredRef = useRef(false);
  const scrollLockYRef = useRef(0);

  const lockScroll = () => {
    scrollLockYRef.current = window.scrollY;
    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";
    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollLockYRef.current}px`;
    document.body.style.left = "0";
    document.body.style.right = "0";
    document.body.style.width = "100%";
  };

  const unlockScroll = () => {
    const y = scrollLockYRef.current;
    document.documentElement.style.overflow = "";
    document.body.style.overflow = "";
    document.body.style.position = "";
    document.body.style.top = "";
    document.body.style.left = "";
    document.body.style.right = "";
    document.body.style.width = "";
    window.scrollTo(0, y);
  };

  const handleDragonEnter = () => {
    if (!overlayRef.current || !dragonRef.current || hasEnteredRef.current) return;
    hasEnteredRef.current = true;

    if (dragonBreathTweenRef.current) {
      dragonBreathTweenRef.current.kill();
      dragonBreathTweenRef.current = null;
    }
    if (draggableRef.current) {
      draggableRef.current.disable();
    }

    enterTimelineRef.current = gsap.timeline();
    enterTimelineRef.current
      .to(
        dragonRef.current,
        {
          scale: 1.18,
          duration: 0.55,
          ease: "power2.inOut",
          transformOrigin: "50% 50%",
        },
        0
      )
      .to(
        overlayRef.current,
        {
          yPercent: -100,
          duration: 1.2,
          ease: "expo.inOut",
          onComplete: () => {
            if (!overlayRef.current) return;
            overlayRef.current.style.display = "none";
            overlayRef.current.style.visibility = "hidden";
            unlockScroll();
            setHasEntered(true);
          },
        },
        0
      );
  };

  const handleIntroSession = () => {
    if (!overlayRef.current) return false;

    const introSeen = sessionStorage.getItem("introSeen");

    overlayRef.current.style.display = "flex";
    overlayRef.current.style.visibility = "visible";

    if (introSeen) {
      return "refresh";
    }

    sessionStorage.setItem("introSeen", "true");
    return "first";
  };

  useLayoutEffect(() => {
    if (!overlayRef.current || !textRef.current || !dragonRef.current) return;

    const introMode = handleIntroSession();
    if (!introMode) return;

    lockScroll();

    const fullName = "Reagan Lung";
    const chars = fullName.split("");
    const typewriterStep = 0.15;
    const backspaceStep = 0.1;
    gsap.set(overlayRef.current, { yPercent: 0 });
    gsap.set(dragonRef.current, {
      autoAlpha: 0,
      opacity: 0,
      scale: 0.96,
      y: 0,
      clipPath: "inset(100% 0 0 0)",
    });
    gsap.set(textRef.current, { autoAlpha: 1, opacity: 1, scale: 1 });
    gsap.set(dragonButtonRef.current, { pointerEvents: "none" });
    gsap.set(dragonButtonRef.current, { x: 0, y: 0, scale: 1 });
    hasEnteredRef.current = false;

    if (draggableRef.current) {
      draggableRef.current.kill();
      draggableRef.current = null;
    }
    draggableRef.current = Draggable.create(dragonButtonRef.current, {
      type: "x,y",
      onPress: () => {
        if (!dragonButtonRef.current) return;
        dragonButtonRef.current.style.cursor = "grabbing";
      },
      onRelease: () => {
        if (!dragonButtonRef.current) return;
        dragonButtonRef.current.style.cursor = "pointer";
        gsap.to(dragonButtonRef.current, {
          x: 0,
          y: 0,
          duration: 1.1,
          ease: "elastic.out(1, 0.45)",
          overwrite: "auto",
        });
      },
    })[0];
    draggableRef.current.disable();

    const startDragonBreathing = () => {
      if (!dragonRef.current) return;
      if (dragonBreathTweenRef.current) {
        dragonBreathTweenRef.current.kill();
      }
      dragonBreathTweenRef.current = gsap.to(dragonRef.current, {
        y: -15,
        scale: 1.05,
        duration: 3,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        transformOrigin: "50% 50%",
      });
      if (dragonButtonRef.current) {
        gsap.set(dragonButtonRef.current, { pointerEvents: "auto" });
      }
      if (draggableRef.current) {
        draggableRef.current.enable();
      }
    };

    const tl = gsap.timeline();

    if (introMode === "first") {
      const typewriterDuration = chars.length * typewriterStep;
      const backspaceDuration = chars.length * backspaceStep;

      tl.to(
        {},
        {
          duration: typewriterDuration,
          ease: "none",
          onStart: () => {
            textRef.current.textContent = "";
            gsap.set(textRef.current, { autoAlpha: 1, opacity: 1, scale: 1 });
            gsap.set(dragonRef.current, {
              autoAlpha: 0,
              opacity: 0,
              scale: 0.96,
              y: 0,
              clipPath: "inset(100% 0 0 0)",
            });
          },
          onUpdate: () => {
            const progressCount = Math.min(chars.length, Math.floor(tl.time() / typewriterStep));
            textRef.current.textContent = chars.slice(0, progressCount).join("");
          },
          onComplete: () => {
            textRef.current.textContent = fullName;
          },
        }
      )
        .to({}, { duration: 0.8 })
        .to(
          {},
          {
            duration: backspaceDuration,
            ease: "none",
            onUpdate: function () {
              const progress = this.progress();
              const remaining = Math.max(0, chars.length - Math.floor(progress * chars.length));
              textRef.current.textContent = fullName.slice(0, remaining);
            },
            onComplete: () => {
              textRef.current.textContent = "";
            },
          }
        )
        .to(textRef.current, {
          autoAlpha: 0,
          opacity: 0,
          duration: 0.2,
          ease: "power2.out",
        })
        .to(
          dragonRef.current,
          {
            autoAlpha: 1,
            opacity: 1,
            clipPath: "inset(0% 0 0 0)",
            scale: 1,
            duration: 2,
            ease: "power2.inOut",
            transformOrigin: "50% 50%",
          },
          "-=0.2"
        )
        .to(
          dragonRef.current,
          {
            scale: 1.1,
            duration: 0.2,
            ease: "power2.out",
            transformOrigin: "50% 50%",
          }
        )
        .to(
          dragonRef.current,
          {
            scale: 1,
            duration: 0.6,
            ease: "elastic.out(1, 0.3)",
            transformOrigin: "50% 50%",
            onComplete: startDragonBreathing,
          }
        )
        .to({}, { duration: 0.5 });
    } else {
      textRef.current.textContent = "";
      gsap.set(textRef.current, { autoAlpha: 0, opacity: 0 });
      tl.to(
        dragonRef.current,
        {
          autoAlpha: 1,
          opacity: 1,
          clipPath: "inset(0% 0 0 0)",
          scale: 1,
          duration: 2,
          ease: "power2.inOut",
          transformOrigin: "50% 50%",
        }
      )
        .to(
          dragonRef.current,
          {
            scale: 1.1,
            duration: 0.2,
            ease: "power2.out",
            transformOrigin: "50% 50%",
          }
        )
        .to(
          dragonRef.current,
          {
            scale: 1,
            duration: 0.6,
            ease: "elastic.out(1, 0.3)",
            transformOrigin: "50% 50%",
            onComplete: startDragonBreathing,
          }
        )
        .to({}, { duration: 0.5 });
    }

    return () => {
      unlockScroll();
      tl.kill();
      if (dragonBreathTweenRef.current) {
        dragonBreathTweenRef.current.kill();
      }
      if (enterTimelineRef.current) {
        enterTimelineRef.current.kill();
      }
      if (draggableRef.current) {
        draggableRef.current.kill();
      }
      if (overlayRef.current) {
        gsap.killTweensOf(overlayRef.current);
      }
      if (dragonButtonRef.current) {
        gsap.killTweensOf(dragonButtonRef.current);
      }
      if (textRef.current) {
        gsap.killTweensOf(textRef.current);
      }
      if (dragonRef.current) {
        gsap.killTweensOf(dragonRef.current);
      }
    };
  }, []);

  useLayoutEffect(() => {
    const el = overlayRef.current;
    if (!el) return;

    const preventScroll = (e) => e.preventDefault();
    el.addEventListener("wheel", preventScroll, { passive: false });
    el.addEventListener("touchmove", preventScroll, { passive: false });

    return () => {
      el.removeEventListener("wheel", preventScroll);
      el.removeEventListener("touchmove", preventScroll);
    };
  }, []);

  return (
    <div
      ref={overlayRef}
      className={styles.overlay}
      style={{ display: "none", visibility: "hidden" }}
      role="status"
      aria-live="polite"
      aria-label="Loading"
    >
      <div className={styles.textContainer}>
        <span ref={textRef} className={styles.typedName}>
          Reagan Lung
        </span>
        <button
          ref={dragonButtonRef}
          type="button"
          className={styles.dragonButton}
          onClick={handleDragonEnter}
          aria-label="Enter site"
        >
          <div className={styles.introContentBlock}>
            <Image
              ref={dragonRef}
              src="/icons/Logo.svg"
              alt="Dragon logo"
              width={180}
              height={180}
              className={styles.dragonLogo}
              unoptimized
            />
          </div>
        </button>
      </div>
    </div>
  );
}
