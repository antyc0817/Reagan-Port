import Image from "next/image";
import DesignSystemExpand from "./DesignSystemExpand";
import TypographySection from "./TypographySection";
import FlavorIconsSection from "./FlavorIconsSection";
import ObjectiveCarousel from "./ObjectiveCarousel";
import styles from "../projects.module.css";

export const metadata = {
    title: "Cuisine Clinic | Reagan",
    description: "Cuisine Clinic project by Reagan Lung",
};

export default function CuisineClinicProject() {
    return (
        <main className={styles.project}>
            <div className={styles.heroWrap}>
                <div className={styles.heroImageContainer}>
                    <Image
                        src='/images/cuisine-clinic/hero.png'
                        alt='Cuisine Clinic'
                        fill
                        className={styles.heroImg}
                        sizes='100vw'
                        unoptimized
                        priority
                    />
                    <Image
                        src='/images/cuisine-clinic/cc%20logo.svg'
                        alt='Cuisine Clinic'
                        width={220}
                        height={220}
                        className={styles.heroLogo}
                        unoptimized
                    />
                </div>
                <p className={styles.heroCaption}>
                    Custom packaging & Dieline | [ <em>Oct 2025</em> ]
                </p>
            </div>
            <section className={styles.projectIntro}>
                <h2 className={styles.projectIntroHeadline}>
                    Built to turn the morning-after haze into a premium,
                    clinical fresh start.
                </h2>
                <div className={styles.projectIntroDivider} />
                <div className={styles.projectIntroDetails}>
                    <div className={styles.projectIntroItem}>
                        <span className={styles.projectIntroLabel}>Role</span>
                        <span className={styles.projectIntroValue}>
                            Graphic Designer
                        </span>
                    </div>
                    <div className={styles.projectIntroDividerV} />
                    <div className={styles.projectIntroItem}>
                        <span className={styles.projectIntroLabel}>Tools</span>
                        <span className={styles.projectIntroValue}>
                            Adobe Illustrator & Photoshop
                        </span>
                    </div>
                    <div className={styles.projectIntroDividerV} />
                    <div className={styles.projectIntroItem}>
                        <span className={styles.projectIntroLabel}>Focus</span>
                        <span className={styles.projectIntroValue}>
                            Branding & Identity
                        </span>
                    </div>
                </div>
            </section>
            <section className={styles.projectSection}>
                <div className={styles.projectSectionGrid}>
                    <h3 className={styles.projectSectionTitle}>
                        [ Objective ]
                    </h3>
                    <div className={styles.projectSectionImage}>
                        <ObjectiveCarousel />
                    </div>
                    <div className={styles.projectSectionText}>
                        <p>
                            <strong>Recovery</strong> should never feel like a
                            chore. While the market is flooded with options,
                            most products feel like a dull pharmacy visit or an
                            overwhelming assault of loud graphics. I recognized
                            a clear gap for a brand that understands the need
                            for a <strong>genuine fresh start</strong> rather
                            than just a quick fix.
                        </p>
                        <p>
                            My mission was to bridge that gap by transforming
                            the concept of a medical remedy into a
                            {" "}
                            <strong>premium experience</strong>. By clearing
                            out the visual noise, I built a system that is{" "}
                            <strong>clean, orderly, and effortless</strong>. The
                            result is a design that provides{" "}
                            <strong>total clarity</strong> exactly when the user
                            needs it most.
                        </p>
                    </div>
                </div>
            </section>
            <section
                className={`${styles.projectSection} ${styles.designSystemSection}`}>
                <h3 className={styles.projectSectionTitle}>
                    [ Design System ]
                </h3>
                <DesignSystemExpand />
            </section>
            <TypographySection />
            <FlavorIconsSection />
            <section
                className={`${styles.projectSection} ${styles.gallerySection}`}>
                <h3 className={styles.projectSectionTitle}>[ Gallery ]</h3>
                <div className={styles.galleryGrid} />
            </section>
        </main>
    );
}
