import Link from "next/link";
import AnimatedName from "./components/AnimatedName";
import Footer from "./components/Footer";
import HeroBanner from "./components/HeroBanner";
import HowICanHelp from "./components/HowICanHelp";
import WorksMarquee from "./components/WorksMarquee";
import styles from "./page.module.css";

const projects = [
  { slug: "panday", title: "PANDAY", description: "Project description for Panday. A creative branding and design project." },
  { slug: "whatsup", title: "WHATSUP", description: "Project description for WhatsUp. A digital design and branding initiative." },
  { slug: "cuisine-clinic", title: "CUISINE CLINIC", description: "Project description for Cuisine Clinic. A UI/UX design for a culinary wellness platform." },
  { slug: "soul-of-south-korea", title: "SOUL OF SOUTH KOREA", description: "Project description for Soul of South Korea. A branding and digital project." },
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
                <h3 className={styles.projectTitle}>[{project.title}]</h3>
                <p className={styles.projectLabel}>PROJECT NAME</p>
                <p className={styles.projectDesc}>{project.description}</p>
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
