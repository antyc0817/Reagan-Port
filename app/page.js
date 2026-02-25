import Image from "next/image";
import Link from "next/link";
import AnimatedName from "./components/AnimatedName";
import Footer from "./components/Footer";
import HeroBanner from "./components/HeroBanner";
import HowICanHelp from "./components/HowICanHelp";
import WorksMarquee from "./components/WorksMarquee";
import styles from "./page.module.css";

const projects = [
    {
        slug: "panday",
        title: "Panday",
        subtitle: "UI/UX CASE STUDY",
        date: "Sep - Dec 2025",
        description:
            "Built to bridge the gap between ambition and certification, Panday transforms the complexity of skilled trades into a clear, visual journey. This project utilized AI-driven guidance and career mapping to simplify the road to Red Seal, turning a daunting process into a structured path forward.",
        cover: "/images/panday/cover.svg",
    },
    {
        slug: "cuisine-clinic",
        title: "Cuisine Clinic",
        subtitle: "Custom Packaging & Dieline",
        date: "Oct 2025",
        description:
            "Built to evoke the calm of a fresh start, Cuisine Clinic turns a medical remedy into a physical experience. This project involved crafting custom packaging dielines and mockups to bring a sense of order to the morning after.",
        cover: "/images/cuisine-clinic/coverimg.png",
    },
    {
        slug: "whatsup",
        title: "WhatSUP",
        subtitle: "Redesign & Brand Identity",
        date: "Jan - May 2025",
        description:
            "Built to breathe new life into a digital legacy, WhatSUP transforms an outdated presence into a sharp, modern experience. This project centered on a complete visual overhaul and logo redesign, using sitemap restructuring and usability testing to create an intuitive\u00A0flow.",
        cover: "/images/whatsup/coverimg.png",
    },
    {
        slug: "soul-of-south-korea",
        title: "Soul of South Korea",
        subtitle: "Travel Brochure & Publication",
        date: "Oct 2025",
        description:
            "Built to transport the curious traveler, Soul of South Korea turns a tour itinerary into a tactile journey. This project involved crafting a clean editorial layout and print-ready brochure designed to make an unfamiliar destination feel like home.",
        cover: "/images/soul-of-south-korea/coverimg.png",
    },
];

export default function Home() {
    return (
        <main className={styles.page}>
            {/* Hero Section - Full screen, image to be added */}
            <section
                id='home'
                className={styles.hero}>
                <AnimatedName />
                <HeroBanner />
            </section>

            <HowICanHelp />

            {/* Works Section - Zigzag: image left/right alternating */}
            <section
                id='works'
                className={styles.works}>
                <WorksMarquee />
                <div className={styles.projectList}>
                    {projects
                        .filter((project) => project.slug !== "panday")
                        .map((project, i) => (
                        <Link
                            key={project.slug}
                            href={`/projects/${project.slug}`}
                            className={`${styles.projectRow} ${i % 2 === 1 ? styles.projectRowReverse : ""}`}>
                            <div className={styles.projectImage}>
                                <Image
                                    src={project.cover}
                                    alt={project.title}
                                    fill
                                    className={styles.projectImg}
                                    sizes='50vw'
                                    unoptimized
                                />
                            </div>
                            <div className={styles.projectInfo}>
                                <div
                                    className={`${styles.projectInfoHead} ${i % 2 === 1 ? styles.projectInfoHeadRight : styles.projectInfoHeadLeft}`}>
                                    <h3 className={styles.projectTitle}>
                                        [ {project.title} ]
                                    </h3>
                                    <p className={styles.projectSubtitle}>
                                        [ {project.subtitle} ]
                                    </p>
                                    <p className={styles.projectDate}>
                                        [ {project.date} ]
                                    </p>
                                </div>
                                <p
                                    className={`${styles.projectDesc} ${i % 2 === 1 ? styles.projectDescLeft : styles.projectDescRight}`}>
                                    {project.description}
                                </p>
                            </div>
                        </Link>
                        ))}
                </div>
                <div className={styles.comingSoon}>
                    <span className={styles.comingSoonText}>
                        Game — Coming soon
                    </span>
                </div>
            </section>

            {/* Contact Section */}
            <section
                id='contact'
                className={styles.contact}>
                <p className={styles.contactPrompt}>Have an idea?</p>
                <h2 className={styles.contactTitle}>Let&apos;s talk!</h2>
                <form className={styles.contactForm}>
                    <input
                        type='text'
                        placeholder='Name'
                        className={styles.formInput}
                    />
                    <input
                        type='email'
                        placeholder='Email'
                        className={styles.formInput}
                    />
                    <textarea
                        placeholder='Message'
                        className={styles.formTextarea}
                        rows={4}
                    />
                    <button
                        type='submit'
                        className={styles.formButton}>
                        SEND
                    </button>
                </form>
            </section>

            <Footer />
        </main>
    );
}
