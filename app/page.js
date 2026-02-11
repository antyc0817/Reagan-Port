import Image from "next/image";
import Link from "next/link";
import Footer from "./components/Footer";
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
        <h1 className={styles.name}>
          <span className={styles.nameIconWrapper}>
            <Image src="/r-icon.png" alt="R" fill className={styles.nameIcon} sizes="20rem" />
          </span>
          <span className={styles.nameText}>eagan Lung</span>
        </h1>
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
        <div className={styles.heroFooter}>
          <p className={styles.heroText}>Creative designer focused on branding, UI/UX, and digital experiences.</p>
          <span className={styles.year}>2013</span>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className={styles.skills}>
        <p className={styles.sectionLabel}>the creativity</p>
        <div className={styles.skillList}>
          <div className={styles.skillItem}>
            <h3 className={styles.skillTitle}>Branding</h3>
            <p className={styles.skillDesc}>Identity, logos, and visual systems that define brands.</p>
          </div>
          <div className={styles.skillItem}>
            <h3 className={styles.skillTitle}>UI.UX</h3>
            <p className={styles.skillDesc}>User-centered interfaces and experiences that delight.</p>
          </div>
          <div className={styles.skillItem}>
            <h3 className={styles.skillTitle}>Digital</h3>
            <p className={styles.skillDesc}>Web, motion, and interactive digital solutions.</p>
          </div>
        </div>
      </section>

      {/* Works Section - Zigzag: image left/right alternating */}
      <section id="works" className={styles.works}>
        <h2 className={styles.worksTitle}>Works x Works x Works x Works</h2>
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
