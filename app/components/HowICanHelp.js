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
    const container = document.getElementById('branding-text');
    if (!container) return;

    const chars = Array.from(container.querySelectorAll('.char'));
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
