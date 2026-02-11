import Link from "next/link";
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
      {/* Hero Section */}
      <section id="home" className={styles.hero}>
        <h1 className={styles.name}>Reagan Lung</h1>
        <div className={styles.heroBlock}>
          <div className={styles.turquoiseBlock} />
          <div className={styles.sliderStrip}>
            <span>1</span>
            <span>2</span>
            <span>3</span>
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

      {/* Works Section */}
      <section id="works" className={styles.works}>
        <h2 className={styles.worksTitle}>Works x Works x Works x Works</h2>
        <div className={styles.projectGrid}>
          {projects.map((project, i) => (
            <div
              key={project.slug}
              className={`${styles.projectCard} ${i % 2 === 0 ? styles.turquoise : styles.grey}`}
            >
              {i % 2 === 0 ? (
                <Link href={`/projects/${project.slug}`} className={styles.projectLink}>
                  [{project.title}]
                </Link>
              ) : (
                <div className={styles.projectContent}>
                  <Link href={`/projects/${project.slug}`}>
                    <h3 className={styles.projectTitle}>[{project.title}]</h3>
                  </Link>
                  <p className={styles.projectLabel}>PROJECT NAME</p>
                  <p className={styles.projectDesc}>{project.description}</p>
                </div>
              )}
            </div>
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

      {/* Footer */}
      <footer className={styles.footer}>
        <span className={styles.footerSep}>x</span>
        <p className={styles.footerName}>Reagan Lung</p>
        <div className={styles.footerBottom}>
          <span className={styles.footerIcon}>R</span>
          <span className={styles.footerCopy}>COPYRIGHT 2017</span>
          <a href="#" className={styles.footerPrivacy}>PRIVACY</a>
        </div>
      </footer>
    </main>
  );
}
