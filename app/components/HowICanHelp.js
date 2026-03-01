'use client';

import { useEffect } from 'react';
import { gsap } from 'gsap';
import styles from './HowICanHelp.module.css';

const services = [
  {
    title: "Branding",
    items: ["LOGO DESIGN", "VISUAL STYLE", "PRINT & PACKAGING"],
  },
  {
    title: "UI.UX",
    items: ["WIREFRAMING", "PROTOTYPING", "INTERFACE DESIGN"],
  },
  {
    title: "Digital",
    items: ["SEO STRATEGY", "WEB DEVELOPMENT", "CONTENT MANAGEMENT"],
  },
];

export default function HowICanHelp() {
  useEffect(() => {
    const brandingContainer = document.getElementById('branding-text');
    const uiuxContainer = document.getElementById('uiux-text');
    const digitalContainer = document.getElementById('digital-text');
    if (!brandingContainer) return;

    const chars = Array.from(brandingContainer.querySelectorAll('.char'));
    if (!chars.length) return;

    // Slightly deeper, still soft accent colours for the letters.
    const pastelColors = [
      '#F472B6', // deeper pink
      '#FACC15', // amber
      '#60A5FA', // blue
      '#34D399', // green
      '#A855F7', // purple
      '#FB7185', // rose
      '#FBBF24', // warm yellow
      '#22C55E', // jade
    ];

    const handlers = chars.map((el, index) => {
      const computed = window.getComputedStyle(el);
      const baseColor = computed.color;
      const hoverColor = pastelColors[index % pastelColors.length];
      let hovered = false;

      const onEnter = () => {
        if (hovered) return;
        hovered = true;

        const tl = gsap.timeline({
          onComplete: () => {
            hovered = false;
            // After the motion, keep the accent a bit longer, then glide back to base.
            gsap.to(el, {
              color: baseColor,
              duration: 0.7,
              delay: 0.3,
              ease: 'power2.out',
            });
          },
        });

        // Immediately switch to active color on touch so it always matches the motion.
        tl.set(el, { color: hoverColor });

        // Phase 1: slow sink/compression.
        tl.to(el, {
          y: 10,
          duration: 0.3,
          ease: 'power1.inOut',
        });

        // Phase 2: slower, smoother spring back up to baseline.
        tl.to(el, {
          y: 0,
          duration: 0.8,
          ease: 'elastic.out(1.3, 0.35)',
        });
      };

      const onLeave = () => {
        // Mouse must leave before another hover can trigger.
        hovered = false;
      };

      el.addEventListener('mouseenter', onEnter);
      el.addEventListener('mouseleave', onLeave);

      return { el, onEnter, onLeave };
    });

    if (uiuxContainer || digitalContainer) {
      // UI/UX blueprint-style expansion: animate the inner label so the hitbox stays stable.
      let uiuxHandlersCleanup = null;
      if (uiuxContainer) {
        const uiuxLabel = uiuxContainer.querySelector(`.${styles.uiuxLabel}`);
        if (uiuxLabel) {
          const computed = window.getComputedStyle(uiuxLabel);
          const baseColor = computed.color;
          const baseLetterSpacing = computed.letterSpacing;

          let uiuxHovering = false;

          const uiEnter = () => {
            if (uiuxHovering) return;
            uiuxHovering = true;

            // Prevent overlapping tweens when re-entering quickly.
            gsap.killTweensOf(uiuxLabel);

            const targetSpacing =
              baseLetterSpacing === 'normal'
                ? '10px'
                : `${parseFloat(baseLetterSpacing || '0') + 10}px`;

            // Fast expansion plus a subtle bubble (scale up, then settle) on the label only.
            const tl = gsap.timeline();

            // Expand letter-spacing and switch to outlined blueprint look while scaling up.
            tl.to(
              uiuxLabel,
              {
                letterSpacing: targetSpacing,
                color: 'transparent',
                webkitTextStrokeWidth: 1,
                webkitTextStrokeColor: baseColor,
                duration: 0.25,
                ease: 'expo.out',
              },
              0
            ).to(
              uiuxLabel,
              {
                scale: 1.06,
                duration: 0.25,
                ease: 'expo.out',
                transformOrigin: '50% 50%',
              },
              0
            );

            // Let the word gently ease back toward its original scale.
            tl.to(uiuxLabel, {
              scale: 1,
              duration: 0.35,
              ease: 'elastic.out(1.2, 0.4)',
            });
          };

          const uiLeave = () => {
            uiuxHovering = false;
            gsap.killTweensOf(uiuxLabel);
            // Collapse back with a slight bounce on the spacing.
            gsap.to(uiuxLabel, {
              letterSpacing: baseLetterSpacing === 'normal' ? '0px' : baseLetterSpacing,
              color: baseColor,
              webkitTextStrokeWidth: 0,
              scale: 1,
              duration: 0.8,
              ease: 'elastic.out(1.2, 0.4)',
            });
          };

          uiuxContainer.addEventListener('mouseenter', uiEnter);
          uiuxContainer.addEventListener('mouseleave', uiLeave);

          uiuxHandlersCleanup = () => {
            uiuxContainer.removeEventListener('mouseenter', uiEnter);
            uiuxContainer.removeEventListener('mouseleave', uiLeave);
          };
        }
      }

      // Digital RGB glitch: rapid chromatic aberration blip.
      let digitalHandlersCleanup = null;
      if (digitalContainer) {
        const computed = window.getComputedStyle(digitalContainer);
        const baseColor = computed.color;
        const baseShadow = computed.textShadow;

        let digitalHovering = false;

        const glitchShadow =
          '-5px 0 0 rgba(239, 68, 68, 0.95), 5px 0 0 rgba(59, 130, 246, 0.95)';

        const digitalEnter = () => {
          if (digitalHovering) return;
          digitalHovering = true;

          const tl = gsap.timeline({
            onComplete: () => {
              digitalHovering = false;
            },
          });

          tl.set(digitalContainer, {
            color: baseColor,
            textShadow: glitchShadow,
          });

          // Quick x-axis jitter for a short digital blip.
          tl.to(digitalContainer, {
            x: 2,
            duration: 0.03,
            yoyo: true,
            repeat: 4,
            ease: 'power1.inOut',
          }).to(digitalContainer, {
            x: 0,
            duration: 0.05,
            ease: 'power2.out',
          });
        };

        const digitalLeave = () => {
          // Cleanly remove offsets and jitter artifacts on leave.
          gsap.to(digitalContainer, {
            x: 0,
            textShadow: baseShadow || 'none',
            duration: 0.12,
            ease: 'power2.out',
          });
        };

        digitalContainer.addEventListener('mouseenter', digitalEnter);
        digitalContainer.addEventListener('mouseleave', digitalLeave);

        digitalHandlersCleanup = () => {
          digitalContainer.removeEventListener('mouseenter', digitalEnter);
          digitalContainer.removeEventListener('mouseleave', digitalLeave);
        };
      }

      // Extend cleanup to cover UI/UX + Digital handlers.
      return () => {
        handlers.forEach(({ el, onEnter, onLeave }) => {
          el.removeEventListener('mouseenter', onEnter);
          el.removeEventListener('mouseleave', onLeave);
        });
        if (uiuxHandlersCleanup) uiuxHandlersCleanup();
        if (digitalHandlersCleanup) digitalHandlersCleanup();
      };
    }

    return () => {
      handlers.forEach(({ el, onEnter, onLeave }) => {
        el.removeEventListener('mouseenter', onEnter);
        el.removeEventListener('mouseleave', onLeave);
      });
    };
  }, []);

  return (
    <section id="skills" className={styles.section}>
      <div className={styles.blackBar} />
      <p className={styles.header}>Here is how I can help</p>
      <div className={styles.serviceList}>
        {services.map((service) => (
          <div key={service.title} className={styles.serviceItem}>
            <h3 className={styles.serviceTitle}>
              {service.title === 'Branding' ? (
                <span id="branding-text">
                  {'Branding'.split('').map((ch, index) => (
                    <span key={index} className="char">
                      {ch === ' ' ? '\u00A0' : ch}
                    </span>
                  ))}
                </span>
              ) : service.title === 'UI.UX' ? (
                <span id="uiux-text" className={styles.uiuxText}>
                  <span className={styles.uiuxLabel}>{service.title}</span>
                </span>
              ) : service.title === 'Digital' ? (
                <span id="digital-text" className={styles.digitalText}>
                  {service.title}
                </span>
              ) : (
                service.title
              )}
            </h3>
            <p className={styles.serviceSub}>
              {service.items.map((item) => (
                <span key={item} className={styles.serviceSubItem}>[{item}]</span>
              ))}
            </p>
          </div>
        ))}
      </div>
      <div className={styles.blackBarBottom} />
    </section>
  );
}
