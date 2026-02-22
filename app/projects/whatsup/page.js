import Image from "next/image";
import { ArrowRight, OctagonAlert, Target } from "lucide-react";
import styles from "../projects.module.css";

export const metadata = {
    title: "WhatSUP | Reagan",
    description: "WhatSUP project by Reagan Lung",
};

export default function WhatsUpProject() {
    return (
        <main className={styles.project}>
            <div className={styles.heroWrap}>
                <div className={`${styles.heroImageContainer} ${styles.fullViewportHeroContainer}`}>
                    <Image
                        src='/images/whatsup/hero.jpg'
                        alt='WhatSUP hero'
                        fill
                        className={`${styles.heroImg} ${styles.fullViewportHeroImg} ${styles.whatsupHeroImgBlur}`}
                        sizes='100vw'
                        unoptimized
                        priority
                    />
                    <Image
                        src='/images/whatsup/logo.svg'
                        alt='WhatSUP logo option 1'
                        width={260}
                        height={260}
                        className={styles.heroCompareLogo}
                        unoptimized
                    />
                    <div className={styles.heroProjectInfo}>
                        <div className={styles.heroProjectInfoLine} aria-hidden />
                        <div className={styles.heroProjectInfoItems}>
                            <div className={styles.heroProjectInfoItem}>
                                <span className={styles.heroProjectInfoLabel}>Role</span>
                                <span className={styles.heroProjectInfoValue}>UX/UI Designer</span>
                            </div>
                            <div className={styles.heroProjectInfoItem}>
                                <span className={styles.heroProjectInfoLabel}>Tools</span>
                                <span className={styles.heroProjectInfoValue}>Figma, WordPress</span>
                            </div>
                            <div className={styles.heroProjectInfoItem}>
                                <span className={styles.heroProjectInfoLabel}>Focus</span>
                                <span className={styles.heroProjectInfoValue}>Digital Redesign</span>
                            </div>
                        </div>
                        <div className={styles.heroProjectInfoLine} aria-hidden />
                        <p className={styles.heroProjectInfoTagline}>
                            Built to guide you from your first click to your first lesson on the water.
                        </p>
                    </div>
                    <div className={styles.heroOverlay} aria-hidden />
                </div>
                <p className={`${styles.heroCaption} ${styles.heroCaptionOnImage}`}>
                    Redesign & Brand Identity | [ <em>Jan - May 2025</em> ]
                </p>
            </div>

            <section className={styles.projectSection}>
                <h3 className={styles.projectSectionTitle}>[ Objective ]</h3>
                <div className={styles.projectSectionText}>
                    <p>
                        WhatSUP had a spirit that their old branding just was not catching. It is a brand built for the
                        outdoor community and youthful energy, but the visuals felt <strong>dated and disconnected</strong>.
                    </p>
                    <p>
                        My mission was to bridge that gap by refreshing the visual identity to feel
                        <strong> modern and authentic</strong>, while ensuring the digital experience felt as smooth as a
                        morning on the water.
                    </p>
                </div>
            </section>

            <section className={`${styles.projectSection} ${styles.whatsupIdeationSection}`}>
                <h3 className={styles.projectSectionTitle}>[ Ideation ]</h3>
                <p className={styles.whatsupIdeationIntro}>
                    To bridge the gap between a basic website and a community hub, I brainstormed three key features
                    designed to keep users coming back.
                </p>

                <div className={styles.whatsupIdeationGrid}>
                    <article className={styles.whatsupIdeationCard}>
                        <div className={styles.whatsupIdeationPlaceholder} aria-hidden />
                        <h4 className={styles.whatsupIdeationCardTitle}>Visual Refresh</h4>
                        <p className={styles.whatsupIdeationCardText}>
                            I ditched the static, dated layout for an interface that actually moves. By using bold
                            typography and a more vibrant palette, I wanted the site to finally match the adrenaline
                            of the sport, making the browsing experience feel just as active as the brand.
                        </p>
                    </article>

                    <article className={styles.whatsupIdeationCard}>
                        <div className={styles.whatsupIdeationPlaceholder} aria-hidden />
                        <h4 className={styles.whatsupIdeationCardTitle}>Seamless Search</h4>
                        <p className={styles.whatsupIdeationCardText}>
                            Instead of fighting with complex menus, I focused on a navigation system that stays out of
                            the way. The goal was to help users find the right gear in seconds, ensuring the path from
                            landing page to checkout is as smooth as possible.
                        </p>
                    </article>

                    <article className={styles.whatsupIdeationCard}>
                        <div className={styles.whatsupIdeationPlaceholder} aria-hidden />
                        <h4 className={styles.whatsupIdeationCardTitle}>Real-Time Status Bar</h4>
                        <p className={styles.whatsupIdeationCardText}>
                            To keep the community connected and safe, I added a real-time status bar at the bottom of
                            the screen. Whether it is weather alerts or water conditions, it gives paddlers the
                            "need-to-know" info at a glance without cluttering the main design.
                        </p>
                    </article>
                </div>
            </section>

            <section className={`${styles.projectSection} ${styles.whatsupPersonaSection}`}>
                <h3 className={styles.projectSectionTitle}>[ User Persona ]</h3>
                <p className={styles.whatsupPersonaIntro}>
                    To make sure the redesign actually worked for the community, I focused on two very different types
                    of paddlers. By understanding their specific needs, I could prioritize features that turn a curious
                    first-timer into a lifelong member of the pack.
                </p>

                <div className={styles.whatsupPersonaCards}>
                    <article className={styles.whatsupPersonaCard}>
                        <header className={styles.whatsupPersonaHeader}>
                            <div className={styles.whatsupPersonaAvatar} aria-hidden>
                                WE
                            </div>
                            <div className={styles.whatsupPersonaHeaderText}>
                                <p className={styles.whatsupPersonaLabel}>Primary Persona</p>
                                <h4 className={styles.whatsupPersonaTitle}>Weekend Explorer</h4>
                            </div>
                        </header>

                        <div className={styles.whatsupPersonaColumns}>
                            <div className={`${styles.whatsupPersonaGroup} ${styles.whatsupPersonaGroupGoal}`}>
                                <h5 className={styles.whatsupPersonaGroupTitle}>
                                    <Target className={styles.whatsupPersonaHeadingIconGoal} aria-hidden />
                                    Goals
                                </h5>
                                <ul className={styles.whatsupPersonaList}>
                                    <li>
                                        <ArrowRight className={styles.whatsupPersonaListIconGoal} aria-hidden />
                                        <span>Find beginner-friendly locations and equipment.</span>
                                    </li>
                                    <li>
                                        <ArrowRight className={styles.whatsupPersonaListIconGoal} aria-hidden />
                                        <span>Learn basic techniques and safety information.</span>
                                    </li>
                                    <li>
                                        <ArrowRight className={styles.whatsupPersonaListIconGoal} aria-hidden />
                                        <span>Connect with local instructors or groups.</span>
                                    </li>
                                    <li>
                                        <ArrowRight className={styles.whatsupPersonaListIconGoal} aria-hidden />
                                        <span>Understand what gear is needed to start.</span>
                                    </li>
                                </ul>
                            </div>

                            <div className={`${styles.whatsupPersonaGroup} ${styles.whatsupPersonaGroupFriction}`}>
                                <h5 className={styles.whatsupPersonaGroupTitle}>
                                    <OctagonAlert className={styles.whatsupPersonaHeadingIconFriction} aria-hidden />
                                    Frustrations
                                </h5>
                                <ul className={styles.whatsupPersonaList}>
                                    <li>
                                        <ArrowRight className={styles.whatsupPersonaListIconFriction} aria-hidden />
                                        <span>Overwhelmed by technical gear and jargon.</span>
                                    </li>
                                    <li>
                                        <ArrowRight className={styles.whatsupPersonaListIconFriction} aria-hidden />
                                        <span>Difficult to find nearby rental options.</span>
                                    </li>
                                    <li>
                                        <ArrowRight className={styles.whatsupPersonaListIconFriction} aria-hidden />
                                        <span>Intimidated by advanced paddling communities.</span>
                                    </li>
                                    <li>
                                        <ArrowRight className={styles.whatsupPersonaListIconFriction} aria-hidden />
                                        <span>Unclear pricing and what is included in bookings.</span>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        <blockquote className={styles.whatsupPersonaQuote}>
                            "I just want to know if it's a good day to be on the water without getting lost in the
                            gear-speak."
                        </blockquote>
                    </article>

                    <article className={styles.whatsupPersonaCard}>
                        <header className={styles.whatsupPersonaHeader}>
                            <div className={styles.whatsupPersonaAvatar} aria-hidden>
                                LP
                            </div>
                            <div className={styles.whatsupPersonaHeaderText}>
                                <p className={styles.whatsupPersonaLabel}>Secondary Persona</p>
                                <h4 className={styles.whatsupPersonaTitle}>Local Pro</h4>
                            </div>
                        </header>

                        <div className={styles.whatsupPersonaColumns}>
                            <div className={`${styles.whatsupPersonaGroup} ${styles.whatsupPersonaGroupGoal}`}>
                                <h5 className={styles.whatsupPersonaGroupTitle}>
                                    <Target className={styles.whatsupPersonaHeadingIconGoal} aria-hidden />
                                    Goals
                                </h5>
                                <ul className={styles.whatsupPersonaList}>
                                    <li>
                                        <ArrowRight className={styles.whatsupPersonaListIconGoal} aria-hidden />
                                        <span>Access advanced techniques and challenges.</span>
                                    </li>
                                    <li>
                                        <ArrowRight className={styles.whatsupPersonaListIconGoal} aria-hidden />
                                        <span>Get real-time water condition updates.</span>
                                    </li>
                                    <li>
                                        <ArrowRight className={styles.whatsupPersonaListIconGoal} aria-hidden />
                                        <span>Connect with other experienced paddlers.</span>
                                    </li>
                                    <li>
                                        <ArrowRight className={styles.whatsupPersonaListIconGoal} aria-hidden />
                                        <span>Discover new locations and routes.</span>
                                    </li>
                                </ul>
                            </div>

                            <div className={`${styles.whatsupPersonaGroup} ${styles.whatsupPersonaGroupFriction}`}>
                                <h5 className={styles.whatsupPersonaGroupTitle}>
                                    <OctagonAlert className={styles.whatsupPersonaHeadingIconFriction} aria-hidden />
                                    Frustrations
                                </h5>
                                <ul className={styles.whatsupPersonaList}>
                                    <li>
                                        <ArrowRight className={styles.whatsupPersonaListIconFriction} aria-hidden />
                                        <span>Outdated water condition information.</span>
                                    </li>
                                    <li>
                                        <ArrowRight className={styles.whatsupPersonaListIconFriction} aria-hidden />
                                        <span>Too much beginner content in feeds.</span>
                                    </li>
                                    <li>
                                        <ArrowRight className={styles.whatsupPersonaListIconFriction} aria-hidden />
                                        <span>Limited community features for meetups.</span>
                                    </li>
                                    <li>
                                        <ArrowRight className={styles.whatsupPersonaListIconFriction} aria-hidden />
                                        <span>No ability to filter by skill level.</span>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        <blockquote className={styles.whatsupPersonaQuote}>
                            "I need the tide report fast so I can hit the water before work."
                        </blockquote>
                    </article>
                </div>
            </section>
        </main>
    );
}
