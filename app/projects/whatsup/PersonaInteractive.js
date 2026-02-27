"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ArrowRight, OctagonAlert, Target } from "lucide-react";
import Image from "next/image";
import styles from "../projects.module.css";

const PERSONAS = {
    weekend: {
        id: "weekend",
        initials: "WE",
        avatarSrc: "/images/whatsup/P1.webp",
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
        avatarSrc: "/images/whatsup/P2.webp",
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

const EASE = "expo.inOut";

const getCollapsedSize = () =>
    typeof window !== "undefined" && window.innerWidth <= 768 ? { radius: 60, avatar: 120 } : { radius: 69, avatar: 138 };

export default function PersonaInteractive() {
    const [openPersonaIds, setOpenPersonaIds] = useState([]);
    const [primaryPersonaId, setPrimaryPersonaId] = useState(null);
    const [cardBobbingKeys, setCardBobbingKeys] = useState({});
    const cardRefs = useRef({});
    const avatarCenterRefs = useRef({});
    const avatarRefs = useRef({});
    const wrapperRefs = useRef({});
    const staggerRefs = useRef({});
    const hintRef = useRef(null);
    const prevOpenRef = useRef([]);

    const handleTogglePersona = (id) => {
        const isOpen = openPersonaIds.includes(id);
        if (isOpen) {
            if (openPersonaIds.length === 1) {
                setOpenPersonaIds([]);
                setPrimaryPersonaId(null);
            } else if (id === primaryPersonaId) {
                // Close this one; the other becomes primary
                const remaining = openPersonaIds.filter((pid) => pid !== id);
                setOpenPersonaIds(remaining);
                setPrimaryPersonaId(remaining[0]);
            } else {
                // Switch primary to the clicked (smaller) card
                setPrimaryPersonaId(id);
            }
        } else {
            setOpenPersonaIds((prev) => [...prev, id]);
            setPrimaryPersonaId(id);
        }
    };

    useEffect(() => {
        const prevOpen = prevOpenRef.current;
        const nowOpen = openPersonaIds;
        prevOpenRef.current = nowOpen;

        const opened = nowOpen.filter((id) => !prevOpen.includes(id));
        const closed = prevOpen.filter((id) => !nowOpen.includes(id));

        const otherIds = (targetOpen) =>
            PERSONA_ORDER.map((p) => p.id).filter((id) => id !== targetOpen);

        if (opened.length > 0) {
            setPrimaryPersonaId(opened[opened.length - 1]);
        }

        if (hintRef.current) {
            if (nowOpen.length === 0) {
                gsap.fromTo(
                    hintRef.current,
                    { opacity: 0, scale: 0.92 },
                    {
                        opacity: 1,
                        scale: 1,
                        duration: 0.55,
                        ease: EASE,
                    }
                );
            } else {
                gsap.to(hintRef.current, {
                    opacity: 0,
                    scale: 0.92,
                    duration: 0.35,
                    ease: EASE,
                });
            }
        }

        opened.forEach((id) => {
            const card = cardRefs.current[id];
            const avatarCenter = avatarCenterRefs.current[id];
            const avatar = avatarRefs.current[id];
            const refs = staggerRefs.current[id];
            if (!card) return;

            const textTargets = refs
                ? [refs.header, refs.goals, refs.frustrations, refs.quote].filter(Boolean)
                : [];

            gsap.set(textTargets, { opacity: 0, y: 12 });

            const tl = gsap.timeline();
            tl.to(card, {
                clipPath: "circle(150% at 50% 50%)",
                duration: 0.6,
                ease: EASE,
            });
            if (avatarCenter) {
                tl.to(
                    avatarCenter,
                    {
                        top: "1.5rem",
                        left: "50%",
                        xPercent: -50,
                        yPercent: 0,
                        duration: 0.5,
                        ease: EASE,
                    },
                    "-=0.5"
                );
            }
            if (avatar) {
                tl.to(
                    avatar,
                    {
                        width: 92,
                        height: 92,
                        duration: 0.5,
                        ease: EASE,
                    },
                    "-=0.5"
                );
            }
            tl.to(
                textTargets,
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.4,
                    stagger: 0.06,
                    ease: EASE,
                },
                "-=0.35"
            );

            const primaryWrapper = wrapperRefs.current[id];
            if (primaryWrapper) {
                gsap.to(primaryWrapper, { scale: 1, duration: 0.5, ease: EASE });
            }
            otherIds(id).forEach((otherId) => {
                const wrapper = wrapperRefs.current[otherId];
                if (wrapper) {
                    gsap.to(wrapper, {
                        scale: 0.92,
                        duration: 0.5,
                        ease: EASE,
                    });
                }
            });
        });

        // When both open and user clicks one to switch primary (nothing opened/closed)
        if (opened.length === 0 && closed.length === 0 && nowOpen.length >= 2 && primaryPersonaId) {
            const primaryId = primaryPersonaId;
            otherIds(primaryId).forEach((otherId) => {
                const wrapper = wrapperRefs.current[otherId];
                if (wrapper) {
                    gsap.to(wrapper, {
                        scale: 0.92,
                        duration: 0.5,
                        ease: EASE,
                    });
                }
            });
            const primaryWrapper = wrapperRefs.current[primaryId];
            if (primaryWrapper) {
                gsap.to(primaryWrapper, {
                    scale: 1,
                    duration: 0.5,
                    ease: EASE,
                });
            }
        }

        closed.forEach((id) => {
            const card = cardRefs.current[id];
            const avatarCenter = avatarCenterRefs.current[id];
            const avatar = avatarRefs.current[id];
            const refs = staggerRefs.current[id];
            const textTargets = refs
                ? [refs.header, refs.goals, refs.frustrations, refs.quote].filter(Boolean)
                : [];

            if (card) card.setAttribute("data-closing", "true");

            const tl = gsap.timeline();
            tl.to(textTargets, {
                opacity: 0,
                y: 12,
                duration: 0.25,
                stagger: 0.03,
                ease: EASE,
            });
            if (avatarCenter) {
                tl.to(
                    avatarCenter,
                    {
                        top: "50%",
                        left: "50%",
                        xPercent: -50,
                        yPercent: -50,
                        duration: 0.5,
                        ease: EASE,
                    },
                    "-=0.2"
                );
            }
            const { radius, avatar: avatarSize } = getCollapsedSize();
            if (avatar) {
                tl.to(
                    avatar,
                    {
                        width: avatarSize,
                        height: avatarSize,
                        duration: 0.5,
                        ease: EASE,
                    },
                    "-=0.2"
                );
            }
            tl.to(
                card,
                {
                    clipPath: `circle(${radius}px at 50% 50%)`,
                    duration: 0.5,
                    ease: EASE,
                    clearProps: "clipPath",
                },
                "-=0.5"
            );

            tl.add(() => {
                if (card) card.removeAttribute("data-closing");
                setCardBobbingKeys((prev) => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
            });

            if (nowOpen.length === 0) {
                PERSONA_ORDER.forEach((p) => {
                    const wrapper = wrapperRefs.current[p.id];
                    if (wrapper) {
                        gsap.to(wrapper, {
                            scale: 1,
                            duration: 0.5,
                            ease: EASE,
                        });
                    }
                });
            } else {
                const primaryId = primaryPersonaId || nowOpen[nowOpen.length - 1];
                otherIds(primaryId).forEach((otherId) => {
                    const wrapper = wrapperRefs.current[otherId];
                    if (wrapper) {
                        gsap.to(wrapper, {
                            scale: 0.92,
                            duration: 0.5,
                            ease: EASE,
                        });
                    }
                });
                const primaryWrapper = wrapperRefs.current[primaryId];
                if (primaryWrapper) {
                    gsap.to(primaryWrapper, {
                        scale: 1,
                        duration: 0.5,
                        ease: EASE,
                    });
                }
            }
        });
    }, [openPersonaIds, primaryPersonaId]);

    return (
        <div className={styles.whatsupPersonaInteractive}>
            <div className={styles.whatsupPersonaMorphGridWrap}>
                <p
                    ref={hintRef}
                    className={styles.whatsupPersonaHint}
                    aria-live="polite"
                    aria-hidden={openPersonaIds.length > 0}>
                    Click to read
                </p>
            <div className={styles.whatsupPersonaMorphGrid}>
                {PERSONA_ORDER.map((persona) => {
                    const isOpen = openPersonaIds.includes(persona.id);
                    return (
                        <div key={persona.id} className={styles.whatsupPersonaMorphSlot}>
                            <div
                                ref={(el) => {
                                    wrapperRefs.current[persona.id] = el;
                                }}
                                role="button"
                                tabIndex={0}
                                className={`${styles.personaWrapper} ${styles.whatsupPersonaMorph}`}
                                onClick={() => handleTogglePersona(persona.id)}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter" || e.key === " ") {
                                        e.preventDefault();
                                        handleTogglePersona(persona.id);
                                    }
                                }}
                                aria-pressed={isOpen}
                                aria-label={`${isOpen ? "Collapse" : "Expand"} ${persona.title} persona`}>
                                <div
                                    key={`${persona.id}-${cardBobbingKeys[persona.id] || 0}`}
                                    ref={(el) => {
                                        cardRefs.current[persona.id] = el;
                                    }}
                                    className={`${styles.personaCard} ${isOpen ? styles.personaCardExpanded : ""}`}>
                                    <div
                                        ref={(el) => {
                                            avatarCenterRefs.current[persona.id] = el;
                                        }}
                                        className={styles.personaCardCenter}>
                                        <div
                                            ref={(el) => {
                                                avatarRefs.current[persona.id] = el;
                                            }}
                                            className={styles.whatsupPersonaAvatar}
                                            aria-hidden>
                                            <Image
                                                src={persona.avatarSrc}
                                                alt=""
                                                fill
                                                className={styles.whatsupPersonaAvatarImg}
                                                sizes="138px"
                                                unoptimized
                                            />
                                        </div>
                                    </div>
                                    <div className={styles.personaCardContent}>
                                        <div
                                            ref={(el) => {
                                                if (!staggerRefs.current[persona.id])
                                                    staggerRefs.current[persona.id] = {};
                                                staggerRefs.current[persona.id].header = el;
                                            }}
                                            className={`${styles.whatsupPersonaHeaderText} ${styles.personaCardText}`}>
                                            <p className={styles.whatsupPersonaLabel}>
                                                {persona.label}
                                            </p>
                                            <h4 className={styles.whatsupPersonaTitle}>
                                                {persona.title}
                                            </h4>
                                        </div>

                                    <div
                                        ref={(el) => {
                                            if (!staggerRefs.current[persona.id])
                                                staggerRefs.current[persona.id] = {};
                                            staggerRefs.current[persona.id].goals = el;
                                        }}
                                        className={`${styles.personaCardBio} ${styles.whatsupPersonaColumns}`}>
                                        <div
                                            className={`${styles.whatsupPersonaGroup} ${styles.whatsupPersonaGroupGoal}`}>
                                            <h5 className={styles.whatsupPersonaGroupTitle}>
                                                <Target
                                                    className={
                                                        styles.whatsupPersonaHeadingIconGoal
                                                    }
                                                    aria-hidden
                                                />
                                                Goals
                                            </h5>
                                            <ul className={styles.whatsupPersonaList}>
                                                {persona.goals.map((goal) => (
                                                    <li key={goal}>
                                                        <ArrowRight
                                                            className={
                                                                styles.whatsupPersonaListIconGoal
                                                            }
                                                            aria-hidden
                                                        />
                                                        <span>{goal}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>

                                        <div
                                            ref={(el) => {
                                                if (!staggerRefs.current[persona.id])
                                                    staggerRefs.current[persona.id] = {};
                                                staggerRefs.current[persona.id].frustrations = el;
                                            }}
                                            className={`${styles.whatsupPersonaGroup} ${styles.whatsupPersonaGroupFriction}`}>
                                            <h5 className={styles.whatsupPersonaGroupTitle}>
                                                <OctagonAlert
                                                    className={
                                                        styles.whatsupPersonaHeadingIconFriction
                                                    }
                                                    aria-hidden
                                                />
                                                Frustrations
                                            </h5>
                                            <ul className={styles.whatsupPersonaList}>
                                                {persona.frustrations.map((frustration) => (
                                                    <li key={frustration}>
                                                        <ArrowRight
                                                            className={
                                                                styles.whatsupPersonaListIconFriction
                                                            }
                                                            aria-hidden
                                                        />
                                                        <span>{frustration}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>

                                    <blockquote
                                        ref={(el) => {
                                            if (!staggerRefs.current[persona.id])
                                                staggerRefs.current[persona.id] = {};
                                            staggerRefs.current[persona.id].quote = el;
                                        }}
                                        className={styles.whatsupPersonaQuote}>
                                        "{persona.quote}"
                                        </blockquote>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
            </div>
        </div>
    );
}
