'use client';

import { useEffect } from 'react';
import Link from 'next/link';
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

const uiuxSubAnimations = {
  "WIREFRAMING": "grid-snap",
  "PROTOTYPING": "grid-snap",
  "INTERFACE DESIGN": "grid-snap",
};

// Kept for later if you want to revisit this concept quickly:
// PROTOTYPING => "blueprint-draw"
const digitalSubAnimations = {
  "SEO STRATEGY": "blueprint-draw",
  "WEB DEVELOPMENT": "blueprint-draw",
  "CONTENT MANAGEMENT": "blueprint-draw",
};

export default function HowICanHelp() {
  useEffect(() => {
    const brandingContainer = document.getElementById('branding-text');
    const brandingFlipItems = Array.from(document.querySelectorAll('.branding-flip-item'));
    const uiuxAnimatedItems = Array.from(document.querySelectorAll('.uiux-anim-item'));
    const digitalAnimatedItems = Array.from(document.querySelectorAll('.digital-anim-item'));
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

    // Branding sub-items: identical left-to-right flip + bounce, brackets stay static.
    const brandingFlipCleanup = [];
    brandingFlipItems.forEach((itemEl) => {
      const itemChars = Array.from(itemEl.querySelectorAll('.branding-char'));
      if (!itemChars.length) return;

      gsap.set(itemChars, {
        display: 'inline-block',
        transformOrigin: '50% 60%',
      });

      let isHovering = false;

      const onEnter = () => {
        if (isHovering) return;
        isHovering = true;
        gsap.killTweensOf(itemChars);
        gsap.set(itemChars, { rotationX: 0, y: 0 });

        const tl = gsap.timeline({
          onComplete: () => {
            isHovering = false;
          },
        });

        // Left-to-right single flip to mimic a digital clock card turn.
        tl.to(itemChars, {
          rotationX: -360,
          y: -2,
          duration: 0.5,
          stagger: 0.045,
          ease: 'power2.inOut',
        }).to(itemChars, {
          y: 0,
          duration: 0.18,
          stagger: 0.045,
          ease: 'power1.out',
        });
      };

      itemEl.addEventListener('mouseenter', onEnter);
      brandingFlipCleanup.push(() => itemEl.removeEventListener('mouseenter', onEnter));
    });

    // UI/UX sub-items: three distinct hover demos, brackets stay static.
    const uiuxSubCleanup = [];
    uiuxAnimatedItems.forEach((itemEl) => {
      const itemChars = Array.from(itemEl.querySelectorAll('.uiux-char'));
      if (!itemChars.length) return;

      gsap.set(itemChars, {
        display: 'inline-block',
        transformOrigin: '50% 60%',
      });

      let isAnimating = false;
      const animationType = itemEl.getAttribute('data-uiux-animation');
      const baseColor = window.getComputedStyle(itemEl).color;

      const onEnter = () => {
        if (isAnimating) return;
        isAnimating = true;
        gsap.killTweensOf(itemChars);
        gsap.set(itemChars, {
          x: 0,
          y: 0,
          scale: 1,
          rotation: 0,
          rotationX: 0,
          opacity: 1,
          color: baseColor,
          webkitTextStrokeWidth: 0,
        });

        const tl = gsap.timeline({
          onComplete: () => {
            isAnimating = false;
          },
        });

        if (animationType === 'grid-snap') {
          // WIREFRAMING: briefly deconstruct, then snap back to clean alignment.
          tl.to(itemChars, {
            x: (i) => (i % 2 === 0 ? -8 : 8),
            y: (i) => (i % 3 === 0 ? -4 : 4),
            rotation: (i) => (i % 2 === 0 ? -7 : 7),
            duration: 0.14,
            stagger: 0.018,
            ease: 'power1.out',
          }).to(itemChars, {
            x: 0,
            y: 0,
            rotation: 0,
            duration: 0.32,
            stagger: 0.02,
            ease: 'expo.out',
          });
        } else if (animationType === 'blueprint-draw') {
          // PROTOTYPING: technical draft-in then fill to solid.
          gsap.set(itemChars, {
            opacity: 0.25,
            y: 6,
            rotationX: -85,
            color: 'transparent',
            webkitTextStrokeWidth: 1,
            webkitTextStrokeColor: baseColor,
          });

          tl.to(itemChars, {
            opacity: 1,
            y: 0,
            rotationX: 0,
            duration: 0.35,
            stagger: 0.035,
            ease: 'power2.out',
          }).to(
            itemChars,
            {
              color: baseColor,
              webkitTextStrokeWidth: 0,
              duration: 0.22,
              stagger: 0.03,
              ease: 'power1.out',
            },
            '-=0.1'
          );
        } else {
          // INTERFACE DESIGN: anchor-point pop and settle.
          tl.to(itemChars, {
            scale: (i) => (i % 3 === 0 ? 1.16 : 1.08),
            y: (i) => (i % 2 === 0 ? -3 : -1),
            rotation: (i) => (i % 2 === 0 ? -4 : 4),
            duration: 0.2,
            stagger: 0.025,
            ease: 'back.out(2.2)',
          }).to(itemChars, {
            scale: 1,
            y: 0,
            rotation: 0,
            duration: 0.28,
            stagger: 0.02,
            ease: 'elastic.out(1, 0.45)',
          });
        }
      };

      itemEl.addEventListener('mouseenter', onEnter);
      uiuxSubCleanup.push(() => itemEl.removeEventListener('mouseenter', onEnter));
    });

    // Digital sub-items: three different hover demos for comparison.
    const digitalSubCleanup = [];
    digitalAnimatedItems.forEach((itemEl) => {
      const itemChars = Array.from(itemEl.querySelectorAll('.digital-char'));
      if (!itemChars.length) return;

      gsap.set(itemChars, {
        display: 'inline-block',
        transformOrigin: '50% 60%',
      });

      let isAnimating = false;
      const animationType = itemEl.getAttribute('data-digital-animation');
      const baseColor = window.getComputedStyle(itemEl).color;
      const scanlineShadow =
        '0 -1px 0 rgba(255,255,255,0.35), 0 1px 0 rgba(0,0,0,0.35), -3px 0 0 rgba(239,68,68,0.72), 3px 0 0 rgba(59,130,246,0.72)';

      const onEnter = () => {
        if (isAnimating) return;
        isAnimating = true;
        gsap.killTweensOf(itemChars);
        gsap.set(itemChars, {
          x: 0,
          y: 0,
          scale: 1,
          rotation: 0,
          rotationX: 0,
          opacity: 1,
          color: baseColor,
          textShadow: 'none',
        });

        const tl = gsap.timeline({
          onComplete: () => {
            isAnimating = false;
            gsap.set(itemChars, { textShadow: 'none' });
          },
        });

        if (animationType === 'scanline-glitch') {
          // SEO STRATEGY: subtle digital scan + chromatic jitter sweep.
          tl.to(itemChars, {
            textShadow: scanlineShadow,
            x: (i) => (i % 2 === 0 ? -1.5 : 1.5),
            duration: 0.05,
            stagger: 0.02,
            yoyo: true,
            repeat: 1,
            ease: 'power1.inOut',
          }).to(itemChars, {
            x: 0,
            textShadow: 'none',
            duration: 0.16,
            stagger: 0.02,
            ease: 'power2.out',
          });
        } else if (animationType === 'blueprint-draw') {
          // SEO STRATEGY test: prototype-style draft-in then fill to solid.
          gsap.set(itemChars, {
            opacity: 0.25,
            y: 6,
            rotationX: -85,
            color: 'transparent',
            webkitTextStrokeWidth: 1,
            webkitTextStrokeColor: baseColor,
            textShadow: 'none',
          });

          tl.to(itemChars, {
            opacity: 1,
            y: 0,
            rotationX: 0,
            duration: 0.35,
            stagger: 0.035,
            ease: 'power2.out',
          }).to(
            itemChars,
            {
              color: baseColor,
              webkitTextStrokeWidth: 0,
              duration: 0.22,
              stagger: 0.03,
              ease: 'power1.out',
            },
            '-=0.1'
          );
        } else if (animationType === 'type-build') {
          // WEB DEVELOPMENT: code-like build where letters type in sequence.
          gsap.set(itemChars, { opacity: 0.25, y: 3, scale: 0.98 });
          tl.to(itemChars, {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.11,
            stagger: 0.045,
            ease: 'steps(1)',
          }).to(itemChars, {
            y: -1,
            duration: 0.12,
            stagger: 0.025,
            yoyo: true,
            repeat: 1,
            ease: 'power1.inOut',
          });
        } else {
          // CONTENT MANAGEMENT: quick data-shuffle scramble resolving to clean text.
          const glyphPool = ['#', '%', '&', '*', '+', '=', '?', '!', '/', '~'];
          const originalChars = itemChars.map((char) => char.textContent || '');

          itemChars.forEach((char, i) => {
            const seq = [
              glyphPool[(i + 1) % glyphPool.length],
              glyphPool[(i + 4) % glyphPool.length],
              originalChars[i],
            ];
            const charTl = gsap.timeline();
            charTl
              .call(() => {
                char.textContent = seq[0];
              })
              .to({}, { duration: 0.08 })
              .call(() => {
                char.textContent = seq[1];
              })
              .to({}, { duration: 0.08 })
              .call(() => {
                char.textContent = seq[2];
              });
          });

          tl.to(itemChars, {
            y: (i) => (i % 2 === 0 ? -2 : 2),
            duration: 0.09,
            stagger: 0.02,
            yoyo: true,
            repeat: 1,
            ease: 'power1.inOut',
          }).to(itemChars, {
            y: 0,
            duration: 0.16,
            stagger: 0.02,
            ease: 'power2.out',
          });
        }
      };

      itemEl.addEventListener('mouseenter', onEnter);
      digitalSubCleanup.push(() => itemEl.removeEventListener('mouseenter', onEnter));
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
        brandingFlipCleanup.forEach((cleanup) => cleanup());
        uiuxSubCleanup.forEach((cleanup) => cleanup());
        digitalSubCleanup.forEach((cleanup) => cleanup());
        if (uiuxHandlersCleanup) uiuxHandlersCleanup();
        if (digitalHandlersCleanup) digitalHandlersCleanup();
      };
    }

    return () => {
      handlers.forEach(({ el, onEnter, onLeave }) => {
        el.removeEventListener('mouseenter', onEnter);
        el.removeEventListener('mouseleave', onLeave);
      });
      brandingFlipCleanup.forEach((cleanup) => cleanup());
      uiuxSubCleanup.forEach((cleanup) => cleanup());
      digitalSubCleanup.forEach((cleanup) => cleanup());
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
                service.title === 'Branding' ? (
                  <Link
                    key={item}
                    href="/work"
                    className={`${styles.serviceSubItem} ${styles.serviceSubItemLink} branding-flip-item`}
                  >
                    <span className={styles.subItemBracket}>[</span>
                    <span className={styles.brandingFlipText}>
                      {item.split('').map((ch, index) => (
                        <span key={`${item}-${index}`} className="branding-char">
                          {ch === ' ' ? '\u00A0' : ch}
                        </span>
                      ))}
                    </span>
                    <span className={styles.subItemBracket}>]</span>
                  </Link>
                ) : service.title === 'UI.UX' ? (
                  <Link
                    key={item}
                    href="/work"
                    className={`${styles.serviceSubItem} ${styles.serviceSubItemLink} uiux-anim-item`}
                    data-uiux-animation={uiuxSubAnimations[item]}
                  >
                    <span className={styles.subItemBracket}>[</span>
                    <span className={styles.uiuxAnimText}>
                      {item.split('').map((ch, index) => (
                        <span key={`${item}-${index}`} className="uiux-char">
                          {ch === ' ' ? '\u00A0' : ch}
                        </span>
                      ))}
                    </span>
                    <span className={styles.subItemBracket}>]</span>
                  </Link>
                ) : service.title === 'Digital' ? (
                  <Link
                    key={item}
                    href="/work"
                    className={`${styles.serviceSubItem} ${styles.serviceSubItemLink} digital-anim-item`}
                    data-digital-animation={digitalSubAnimations[item]}
                  >
                    <span className={styles.subItemBracket}>[</span>
                    <span className={styles.digitalAnimText}>
                      {item.split('').map((ch, index) => (
                        <span key={`${item}-${index}`} className="digital-char">
                          {ch === ' ' ? '\u00A0' : ch}
                        </span>
                      ))}
                    </span>
                    <span className={styles.subItemBracket}>]</span>
                  </Link>
                ) : (
                  <Link key={item} href="/work" className={`${styles.serviceSubItem} ${styles.serviceSubItemLink}`}>
                    [{item}]
                  </Link>
                )
              ))}
            </p>
          </div>
        ))}
      </div>
      <div className={styles.blackBarBottom} />
    </section>
  );
}
