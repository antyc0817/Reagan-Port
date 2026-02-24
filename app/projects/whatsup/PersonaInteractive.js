"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { gsap } from "gsap";
import { ArrowRight, OctagonAlert, Target } from "lucide-react";
import Image from "next/image";
import styles from "../projects.module.css";

const PERSONAS = {
    weekend: {
        id: "weekend",
        initials: "WE",
        avatarSrc: "/images/whatsup/P1.png",
        label: "Primary Persona",
        title: "Weekend Explorer",
        goals: [
            "Find beginner-friendly locations and equipment.",
            "Learn basic techniques and safety information.",
            "Connect with local instructors or groups.",
            "Understand what gear is needed to start.",
        ],
        frustrations: [
            "Overwhelmed by technical gear and jargon.",
            "Difficult to find nearby rental options.",
            "Intimidated by advanced paddling communities.",
            "Unclear pricing and what is included in bookings.",
        ],
        quote: "I just want to know if it's a good day to be on the water without getting lost in the gear-speak.",
    },
    local: {
        id: "local",
        initials: "LP",
        avatarSrc: "/images/whatsup/P2.png",
        label: "Secondary Persona",
        title: "Local Pro",
        goals: [
            "Access advanced techniques and challenges.",
            "Get real-time water condition updates.",
            "Connect with other experienced paddlers.",
            "Discover new locations and routes.",
        ],
        frustrations: [
            "Outdated water condition information.",
            "Too much beginner content in feeds.",
            "Limited community features for meetups.",
            "No ability to filter by skill level.",
        ],
        quote: "I need the tide report fast so I can hit the water before work.",
    },
};

const PERSONA_ORDER = [PERSONAS.weekend, PERSONAS.local];

export default function PersonaInteractive() {
    const [openPersonaIds, setOpenPersonaIds] = useState([]);
    const cardRefs = useRef({});
    const prevOpenPersonaIds = useRef([]);

    const openPersonas = useMemo(
        () =>
            PERSONA_ORDER.reduce((acc, persona) => {
                acc[persona.id] = openPersonaIds.includes(persona.id);
                return acc;
            }, {}),
        [openPersonaIds]
    );

    useEffect(() => {
        const prev = new Set(prevOpenPersonaIds.current);
        openPersonaIds.forEach((id) => {
            if (prev.has(id)) return;
            const cardEl = cardRefs.current[id];
            if (!cardEl) return;
            gsap.fromTo(
                cardEl,
                { autoAlpha: 0, y: 18, scale: 0.985 },
                { autoAlpha: 1, y: 0, scale: 1, duration: 0.42, ease: "power2.out" }
            );
        });
        prevOpenPersonaIds.current = openPersonaIds;
    }, [openPersonaIds]);

    const handleTogglePersona = (id) => {
        setOpenPersonaIds((prev) =>
            prev.includes(id) ? prev.filter((personaId) => personaId !== id) : [...prev, id]
        );
    };

    return (
        <div className={`${styles.whatsupPersonaInteractive} ${openPersonaIds.length > 0 ? styles.whatsupPersonaInteractiveOpen : ""}`}>
            <p className={styles.whatsupPersonaTapHint}>Click a persona circle to expand and read details.</p>
            <div className={styles.whatsupPersonaPicker}>
                {PERSONA_ORDER.map((persona) => {
                    const isActive = openPersonaIds.includes(persona.id);
                    return (
                        <button
                            key={persona.id}
                            type='button'
                            className={`${styles.whatsupPersonaPickerBtn} ${isActive ? styles.whatsupPersonaPickerBtnActive : ""}`}
                            onClick={() => handleTogglePersona(persona.id)}
                            aria-pressed={isActive}
                            aria-label={`Show ${persona.title} persona`}>
                            <span className={styles.whatsupPersonaAvatar} aria-hidden>
                                <Image
                                    src={persona.avatarSrc}
                                    alt=''
                                    fill
                                    className={styles.whatsupPersonaAvatarImg}
                                    sizes='138px'
                                    unoptimized
                                />
                            </span>
                            <span className={styles.whatsupPersonaPickerMeta}>
                                <span className={styles.whatsupPersonaLabel}>{persona.label}</span>
                                <span className={styles.whatsupPersonaPickerTitle}>{persona.title}</span>
                            </span>
                        </button>
                    );
                })}
            </div>

            <div className={styles.whatsupPersonaCards}>
                {PERSONA_ORDER.map((persona) => {
                    const isOpen = openPersonas[persona.id];
                    const sideClass =
                        persona.id === "weekend"
                            ? styles.whatsupPersonaCardSlotLeft
                            : styles.whatsupPersonaCardSlotRight;
                    return (
                        <div key={persona.id} className={`${styles.whatsupPersonaCardSlot} ${sideClass}`}>
                            {!isOpen ? null : (
                                <article
                                    ref={(el) => {
                                        cardRefs.current[persona.id] = el;
                                    }}
                                    className={styles.whatsupPersonaCard}>
                                    <header className={styles.whatsupPersonaHeader}>
                                        <div className={styles.whatsupPersonaAvatar} aria-hidden>
                                    <Image
                                        src={persona.avatarSrc}
                                        alt=''
                                        fill
                                        className={styles.whatsupPersonaAvatarImg}
                                        sizes='56px'
                                        unoptimized
                                    />
                                        </div>
                                        <div className={styles.whatsupPersonaHeaderText}>
                                            <p className={styles.whatsupPersonaLabel}>{persona.label}</p>
                                            <h4 className={styles.whatsupPersonaTitle}>{persona.title}</h4>
                                        </div>
                                    </header>

                                    <div className={styles.whatsupPersonaColumns}>
                                        <div className={`${styles.whatsupPersonaGroup} ${styles.whatsupPersonaGroupGoal}`}>
                                            <h5 className={styles.whatsupPersonaGroupTitle}>
                                                <Target className={styles.whatsupPersonaHeadingIconGoal} aria-hidden />
                                                Goals
                                            </h5>
                                            <ul className={styles.whatsupPersonaList}>
                                                {persona.goals.map((goal) => (
                                                    <li key={goal}>
                                                        <ArrowRight className={styles.whatsupPersonaListIconGoal} aria-hidden />
                                                        <span>{goal}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>

                                        <div className={`${styles.whatsupPersonaGroup} ${styles.whatsupPersonaGroupFriction}`}>
                                            <h5 className={styles.whatsupPersonaGroupTitle}>
                                                <OctagonAlert className={styles.whatsupPersonaHeadingIconFriction} aria-hidden />
                                                Frustrations
                                            </h5>
                                            <ul className={styles.whatsupPersonaList}>
                                                {persona.frustrations.map((frustration) => (
                                                    <li key={frustration}>
                                                        <ArrowRight className={styles.whatsupPersonaListIconFriction} aria-hidden />
                                                        <span>{frustration}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>

                                    <blockquote className={styles.whatsupPersonaQuote}>"{persona.quote}"</blockquote>
                                </article>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
