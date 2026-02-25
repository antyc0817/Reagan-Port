"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import Image from "next/image";
import styles from "./PreloaderOverlay.module.css";

export default function PreloaderOverlay() {
  const overlayRef = useRef(null);
  const textRef = useRef(null);
  const dragonButtonRef = useRef(null);
  const dragonRef = useRef(null);
  const enterTextRef = useRef(null);
  const dragonBreathTweenRef = useRef(null);
  const enterTextPulseTweenRef = useRef(null);
  const enterTimelineRef = useRef(null);
  const hasEnteredRef = useRef(false);

  const handleClearSession = () => {
    sessionStorage.clear();
    window.location.reload();
  };

  const handleDragonEnter = () => {
    if (!overlayRef.current || !dragonRef.current || hasEnteredRef.current) return;
    hasEnteredRef.current = true;

    if (dragonBreathTweenRef.current) {
      dragonBreathTweenRef.current.kill();
      dragonBreathTweenRef.current = null;
    }
    if (enterTextPulseTweenRef.current) {
      enterTextPulseTweenRef.current.kill();
      enterTextPulseTweenRef.current = null;
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
          },
        },
        0
      );
  };

  const handleDragonHoverIn = () => {
    if (!dragonButtonRef.current || hasEnteredRef.current) return;
    gsap.to(dragonButtonRef.current, {
      scale: 1.05,
      duration: 0.28,
      ease: "power2.out",
      transformOrigin: "50% 50%",
      overwrite: "auto",
    });
  };

  const handleDragonHoverOut = () => {
    if (!dragonButtonRef.current) return;
    gsap.to(dragonButtonRef.current, {
      scale: 1,
      duration: 0.28,
      ease: "power2.out",
      transformOrigin: "50% 50%",
      overwrite: "auto",
    });
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
    if (!overlayRef.current || !textRef.current || !dragonRef.current || !enterTextRef.current) return;

    const introMode = handleIntroSession();
    if (!introMode) return;

    const fullName = "Reagan Lung";
    const chars = fullName.split("");
    const typewriterStep = 0.15;
    const enterPrompt = "CLICK TO ENTER";
    const enterPromptStep = 0.05;
    gsap.set(overlayRef.current, { yPercent: 0 });
    gsap.set(dragonRef.current, {
      autoAlpha: 0,
      opacity: 0,
      scale: 0.96,
      y: 0,
      clipPath: "inset(100% 0 0 0)",
    });
    gsap.set(textRef.current, { autoAlpha: 1, opacity: 1, scale: 1 });
    gsap.set(enterTextRef.current, { autoAlpha: 0, opacity: 0 });
    enterTextRef.current.textContent = "";
    gsap.set(dragonButtonRef.current, { pointerEvents: "none" });
    hasEnteredRef.current = false;

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
    };

    const startEnterTextPulse = () => {
      if (!enterTextRef.current) return;
      if (enterTextPulseTweenRef.current) {
        enterTextPulseTweenRef.current.kill();
      }
      gsap.set(enterTextRef.current, { autoAlpha: 1, opacity: 0.5 });
      enterTextPulseTweenRef.current = gsap.to(enterTextRef.current, {
        opacity: 1,
        duration: 1.4,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });
    };

    const addTypewriterToTimeline = (timeline, targetEl, text, stepSeconds) => {
      const segmentStart = timeline.duration();
      timeline.to({}, {
        duration: text.length * stepSeconds,
        ease: "none",
        onStart: () => {
          if (!targetEl) return;
          targetEl.textContent = "";
          gsap.set(targetEl, { autoAlpha: 1, opacity: 1 });
        },
        onUpdate: () => {
          if (!targetEl) return;
          const elapsed = Math.max(0, timeline.time() - segmentStart);
          const progressCount = Math.min(text.length, Math.floor(elapsed / stepSeconds));
          targetEl.textContent = text.slice(0, progressCount);
        },
        onComplete: () => {
          if (!targetEl) return;
          targetEl.textContent = text;
        },
      });
    };

    const tl = gsap.timeline();

    if (introMode === "first") {
      tl.to(
        {},
        {
          duration: chars.length * typewriterStep,
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
        .to({}, { duration: 1.5 })
        .to(textRef.current, {
          autoAlpha: 0,
          opacity: 0,
          scale: 0.82,
          duration: 0.55,
          ease: "power2.inOut",
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
            onComplete: startDragonBreathing,
          },
          "<"
        )
        .to({}, { duration: 0.5 });
      addTypewriterToTimeline(tl, enterTextRef.current, enterPrompt, enterPromptStep);
      tl.call(startEnterTextPulse);
    } else {
      textRef.current.textContent = "";
      gsap.set(textRef.current, { autoAlpha: 0, opacity: 0 });
      tl.set(dragonRef.current, {
        autoAlpha: 1,
        opacity: 1,
        clipPath: "inset(0% 0 0 0)",
        scale: 1,
      })
        .call(startDragonBreathing)
        .to({}, { duration: 0.5 });
      addTypewriterToTimeline(tl, enterTextRef.current, enterPrompt, enterPromptStep);
      tl.call(startEnterTextPulse);
    }

    return () => {
      tl.kill();
      if (dragonBreathTweenRef.current) {
        dragonBreathTweenRef.current.kill();
      }
      if (enterTextPulseTweenRef.current) {
        enterTextPulseTweenRef.current.kill();
      }
      if (enterTimelineRef.current) {
        enterTimelineRef.current.kill();
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
      if (enterTextRef.current) {
        gsap.killTweensOf(enterTextRef.current);
      }
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
          onPointerEnter={handleDragonHoverIn}
          onPointerLeave={handleDragonHoverOut}
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
            <span ref={enterTextRef} className={styles.enterPrompt}>
              CLICK TO ENTER
            </span>
          </div>
        </button>
      </div>
      <button type="button" className={styles.clearSessionBtn} onClick={handleClearSession}>
        Clear Session
      </button>
    </div>
  );
}
