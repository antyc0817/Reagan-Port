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
    description: "Built to bridge the gap between ambition and certification, Panday transforms the complexity of skilled trades into a clear, visual journey. This project utilized AI-driven guidance and career mapping to simplify the road to Red Seal, turning a daunting process into a structured path forward.",
  },
  {
    slug: "cuisine-clinic",
    title: "Cuisine Clinic",
    subtitle: "Custom Packaging & Dieline",
    date: "Oct 2025",
    description: "Built to evoke the calm of a fresh start, Cuisine Clinic turns a medical remedy into a physical experience. This project involved crafting custom packaging dielines and mockups to bring a sense of order to the morning after.",
  },
  {
    slug: "whatsup",
    title: "WhatSUP",
    subtitle: "Redesign & Brand Identity",
    date: "Jan - May 2025",
    description: "Built to breathe new life into a digital legacy, WhatSUP transforms an outdated presence into a sharp, modern experience. This project centered on a complete visual overhaul and logo redesign, using sitemap restructuring and usability testing to create an intuitive\u00A0flow.",
  },
  {
    slug: "soul-of-south-korea",
    title: "Soul of South Korea",
    subtitle: "Travel Brochure & Publication",
    date: "Oct 2025",
    description: "Built to transport the curious traveler, Soul of South Korea turns a tour itinerary into a tactile journey. This project involved crafting a clean editorial layout and print-ready brochure designed to make an unfamiliar destination feel like home.",
  },
];

export default function Home() {
  return (
    <main className={styles.page}>
      {/* Hero Section - Full screen, image to be added */}
      <section id="home" className={styles.hero}>
        <AnimatedName />
        <div className={styles.heroBlock}>
          <div className={styles.heroImage}>
            {/* Add your full-screen image here: <Image src="..." fill className={styles.heroImg} /> */}
          </div>
          <div className={styles.sliderStrip}>
            <span className={styles.sliderDot} />
            <span className={styles.sliderDot} />
            <span className={styles.sliderDot} />
          </div>
        </div>
        <HeroBanner />
      </section>

      <HowICanHelp />

      {/* Works Section - Zigzag: image left/right alternating */}
      <section id="works" className={styles.works}>
        <WorksMarquee />
        <div className={styles.projectList}>
          {projects.map((project, i) => (
            <Link
              key={project.slug}
              href={`/projects/${project.slug}`}
              className={`${styles.projectRow} ${i % 2 === 1 ? styles.projectRowReverse : ""}`}
            >
              <div className={styles.projectImage}>
                {/* Add project image: <Image src="..." fill /> */}
              </div>
              <div className={styles.projectInfo}>
                <div className={`${styles.projectInfoHead} ${i % 2 === 1 ? styles.projectInfoHeadRight : styles.projectInfoHeadLeft}`}>
                  <h3 className={styles.projectTitle}>[ {project.title} ]</h3>
                  <p className={styles.projectSubtitle}>[ {project.subtitle} ]</p>
                  <p className={styles.projectDate}>[ {project.date} ]</p>
                </div>
                <p className={`${styles.projectDesc} ${i % 2 === 1 ? styles.projectDescLeft : styles.projectDescRight}`}>{project.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* About Section */}
      <section id="about" className={styles.about}>
        <h2 className={styles.aboutTitle}>About</h2>
        <p className={styles.aboutText}>
          Creative designer with a passion for branding, UI/UX, and digital experiences. 
          I craft visual identities and user-centered solutions that resonate with audiences. 
          With expertise across branding, interface design, and digital media, I bring ideas to life.
        </p>
      </section>

      {/* Contact Section */}
      <section id="contact" className={styles.contact}>
        <h2 className={styles.contactTitle}>Let&apos;s talk!</h2>
        <form className={styles.contactForm}>
          <input type="text" placeholder="NAME" className={styles.formInput} />
          <input type="email" placeholder="EMAIL" className={styles.formInput} />
          <textarea placeholder="MESSAGE" className={styles.formTextarea} rows={4} />
          <button type="submit" className={styles.formButton}>SEND</button>
        </form>
      </section>

      <Footer />
    </main>
  );
}
