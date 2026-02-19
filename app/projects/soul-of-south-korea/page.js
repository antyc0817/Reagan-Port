import Image from "next/image";
import styles from "../projects.module.css";

export const metadata = {
  title: "Soul of South Korea | Reagan",
  description: "Soul of South Korea project by Reagan Lung",
};

export default function SoulOfSouthKoreaProject() {
  return (
    <main className={styles.project}>
      <div className={styles.heroWrap}>
        <div className={`${styles.heroImageContainer} ${styles.fullViewportHeroContainer}`}>
          <Image
            src="/images/soul-of-south-korea/hero.png"
            alt="Soul of South Korea hero"
            fill
            className={`${styles.heroImg} ${styles.fullViewportHeroImg}`}
            sizes="100vw"
            unoptimized
            priority
          />
        </div>
        <p className={`${styles.heroCaption} ${styles.heroCaptionOnImage}`}>
          Travel Brochure & Publication | [ <em>Oct 2025</em> ]
        </p>
      </div>
      <section className={styles.projectIntro}>
        <h2 className={styles.projectIntroHeadline}>
          Capturing the contrast between fast urban energy and ancient tradition.
        </h2>
        <div className={styles.projectIntroMeta}>
          <div className={styles.projectIntroDivider} />
          <div className={styles.projectIntroDetails}>
            <div className={styles.projectIntroItem}>
              <span className={styles.projectIntroLabel}>Role</span>
              <span className={styles.projectIntroValue}>Graphic Designer</span>
            </div>
            <div className={styles.projectIntroDividerV} />
            <div className={styles.projectIntroItem}>
              <span className={styles.projectIntroLabel}>Tools</span>
              <span className={styles.projectIntroValue}>Adobe InDesign, Photoshop, &amp; Illustrator</span>
            </div>
            <div className={styles.projectIntroDividerV} />
            <div className={styles.projectIntroItem}>
              <span className={styles.projectIntroLabel}>Focus</span>
              <span className={styles.projectIntroValue}>Editorial Design</span>
            </div>
          </div>
        </div>
      </section>
      <section className={styles.projectSection}>
        <div className={styles.projectSectionGrid}>
          <h3 className={styles.projectSectionTitle}>[ Objective ]</h3>
          <div className={styles.projectSectionImage}>
            <Image
              src="/images/soul-of-south-korea/s1.png"
              alt="Soul of South Korea objective visual"
              width={960}
              height={720}
              className={styles.projectSectionImg}
              unoptimized
            />
          </div>
          <div className={styles.projectSectionText}>
            <p>
              Travel brochures often feel like a mess of cluttered lists and generic photos that fail to capture the energy of the trip. I saw an opportunity to take a dense G Adventures itinerary and turn it into a premium editorial experience.
            </p>
            <p>
              My goal was to balance that heavy travel data with the vibrant atmosphere of South Korea. By using structured layouts in InDesign and a careful eye for imagery, I built a system that stays sharp and orderly, proving that even a complex schedule can be presented with total clarity.
            </p>
          </div>
        </div>
      </section>
      <section className={`${styles.projectSection} ${styles.typographySection} ${styles.soulTypographySection}`}>
        <h3 className={styles.projectSectionTitle}>[ Typography ]</h3>
        <p className={styles.typographyIntro}>
          Travel guides usually sacrifice personality for readability, or vice versa. The typography for this project had to capture South Korea&apos;s energy while making a dense schedule easy to follow.
        </p>
        <div className={styles.typographyCards}>
          <article className={`${styles.typographyCard} ${styles.soulTypographyCardAligned}`}>
            <div className={styles.typographyCardHeader}>
              <span className={styles.typographyCardNum}>1.</span>
              <h4 className={styles.typographyCardTitle}>Cultural Character</h4>
            </div>
            <div
              className={`${styles.typographySpecimen} ${styles.soulTypographySpecimen}`}
              style={{ fontFamily: "'Amanojaku', serif" }}
            >
              <div>Seoul</div>
              <div className={styles.typographySpecimenLine2}>Table of Content</div>
            </div>
            <p className={styles.typographyFontName}>Amanojaku</p>
            <p className={styles.typographyRole}>As display typeface</p>
            <div className={styles.typographyCardRow}>
              <span className={styles.typographyLabel}>Reason:</span>
              <p className={styles.typographyCardText}>
                I chose this for the titles to bring a sense of energy and movement to the page. Its expressive style captures the &quot;spirit&quot; of South Korea, immediately signalling a journey that is vibrant and authentic.
              </p>
            </div>
          </article>
          <article className={`${styles.typographyCard} ${styles.soulTypographyCardAligned}`}>
            <div className={styles.typographyCardHeader}>
              <span className={styles.typographyCardNum}>2.</span>
              <h4 className={styles.typographyCardTitle}>Functional Structure</h4>
            </div>
            <div
              className={`${styles.typographySpecimen} ${styles.soulTypographySpecimen}`}
              style={{ fontFamily: "'Altone', sans-serif" }}
            >
              <div>South Korea Itinerary</div>
              <div className={styles.typographySpecimenLine2}>Day 1 · Seoul · 08:30</div>
            </div>
            <p className={styles.typographyFontName}>Altone</p>
            <p className={styles.typographyRole}>As primary body typeface</p>
            <div className={styles.typographyCardRow}>
              <span className={styles.typographyLabel}>Reason:</span>
              <p className={styles.typographyCardText}>
                To balance the bold titles, I used this geometric sans-serif for the main text. It provides the necessary structure to keep dense travel itineraries organized and easy to read, ensuring the layout remains breathable and professional.
              </p>
            </div>
          </article>
        </div>
      </section>
      <section className={styles.projectSection} style={{ textAlign: "center" }}>
        <h3 className={styles.projectSectionTitle}>[ Editorial Flipbook ]</h3>
        <p style={{ margin: 0, fontSize: "clamp(1rem, 1.5vw, 1.2rem)", letterSpacing: "0.1em", textTransform: "uppercase", opacity: 0.65 }}>
          Click to Read
        </p>
      </section>
    </main>
  );
}
