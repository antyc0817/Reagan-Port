import Image from "next/image";
import styles from "../projects.module.css";
import PersonaInteractive from "./PersonaInteractive";
import WireframeRevealList from "./WireframeRevealList";

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
                        src='/images/whatsup/hero.webp'
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

            <section className={`${styles.projectSection} ${styles.whatsupObjectiveSection}`}>
                <div className={styles.projectSectionGrid}>
                    <h3 className={styles.projectSectionTitle}>[ Objective ]</h3>
                    <div className={styles.projectSectionImage}>
                        <div className={styles.whatsupObjectivePlaceholder} aria-hidden />
                    </div>
                    <div className={styles.projectSectionText}>
                        <p>
                            WhatSUP had a spirit that their old branding just was not catching. It is a brand built for
                            the outdoor community and youthful energy, but the visuals felt <strong>dated and disconnected</strong>.
                        </p>
                        <p>
                            My mission was to bridge that gap by refreshing the visual identity to feel
                            <strong> modern and authentic</strong>, while ensuring the digital experience felt as smooth as a
                            morning on the water.
                        </p>
                    </div>
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
                        <Image
                            src='/images/whatsup/V1.webp'
                            alt='WhatSUP ideation visual refresh concept'
                            width={1200}
                            height={1200}
                            className={styles.whatsupIdeationImage}
                            unoptimized
                        />
                        <h4 className={styles.whatsupIdeationCardTitle}>Visual Refresh</h4>
                        <p className={styles.whatsupIdeationCardText}>
                            I ditched the static, dated layout for an interface that actually moves. By using bold
                            typography and a more vibrant palette, I wanted the site to finally match the adrenaline
                            of the sport, making the browsing experience feel just as active as the brand.
                        </p>
                    </article>

                    <article className={styles.whatsupIdeationCard}>
                        <Image
                            src='/images/whatsup/V2.webp'
                            alt='WhatSUP ideation seamless search concept'
                            width={1200}
                            height={1200}
                            className={styles.whatsupIdeationImage}
                            unoptimized
                        />
                        <h4 className={styles.whatsupIdeationCardTitle}>Seamless Search</h4>
                        <p className={styles.whatsupIdeationCardText}>
                            Instead of fighting with complex menus, I focused on a navigation system that stays out of
                            the way. The goal was to help users find the right gear in seconds, ensuring the path from
                            landing page to checkout is as smooth as possible.
                        </p>
                    </article>

                    <article className={styles.whatsupIdeationCard}>
                        <Image
                            src='/images/whatsup/V3.webp'
                            alt='WhatSUP ideation real-time status concept'
                            width={1200}
                            height={1200}
                            className={styles.whatsupIdeationImage}
                            unoptimized
                        />
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
                <PersonaInteractive />
            </section>

            <section className={`${styles.projectSection} ${styles.whatsupWireframeSection}`}>
                <h3 className={styles.projectSectionTitle}>[ Wireframe ]</h3>
                <p className={styles.whatsupWireframeIntro}>
                    I focused on the Lesson and Tour pages to fix navigation issues and help users decide faster. By
                    switching to a card-based system, I removed the clutter and organized information into a clean
                    hierarchy that prioritizes the user's time and confidence.
                </p>

                <WireframeRevealList />
            </section>

            <section className={`${styles.projectSection} ${styles.whatsupStyleguideSection}`}>
                <h3 className={styles.projectSectionTitle}>[ Styleguide ]</h3>
                <p className={styles.whatsupStyleguideIntro}>
                    To bring the WhatSUP spirit to life, I built a visual identity that feels as fresh and energetic
                    as a day on the water. Every color and curve was chosen to ditch the dated feel of the old site
                    and create an approachable, high-energy world for our community to dive into.
                </p>

                <div className={styles.whatsupStyleguidePalette}>
                    <article className={styles.whatsupStyleguideColorCard}>
                        <div className={styles.whatsupStyleguideSwatch} style={{ backgroundColor: "#E5771E" }} aria-hidden />
                        <p className={styles.whatsupStyleguideColorRole}>Primary</p>
                        <p className={styles.whatsupStyleguideColorHex}>#E5771E</p>
                    </article>

                    <article className={styles.whatsupStyleguideColorCard}>
                        <div className={styles.whatsupStyleguideSwatch} style={{ backgroundColor: "#F4A127" }} aria-hidden />
                        <p className={styles.whatsupStyleguideColorRole}>Secondary</p>
                        <p className={styles.whatsupStyleguideColorHex}>#F4A127</p>
                    </article>

                    <article className={styles.whatsupStyleguideColorCard}>
                        <div className={styles.whatsupStyleguideSwatch} style={{ backgroundColor: "#60402D" }} aria-hidden />
                        <p className={styles.whatsupStyleguideColorRole}>Tertiary</p>
                        <p className={styles.whatsupStyleguideColorHex}>#60402D</p>
                    </article>

                    <article className={styles.whatsupStyleguideColorCard}>
                        <div className={styles.whatsupStyleguideSwatch} style={{ backgroundColor: "#647828" }} aria-hidden />
                        <p className={styles.whatsupStyleguideColorRole}>Quaternary</p>
                        <p className={styles.whatsupStyleguideColorHex}>#647828</p>
                    </article>

                    <article className={styles.whatsupStyleguideColorCard}>
                        <div className={styles.whatsupStyleguideSwatch} style={{ backgroundColor: "#90BED1" }} aria-hidden />
                        <p className={styles.whatsupStyleguideColorRole}>Quinary</p>
                        <p className={styles.whatsupStyleguideColorHex}>#90BED1</p>
                    </article>
                </div>
            </section>
        </main>
    );
}
