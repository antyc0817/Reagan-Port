import Image from "next/image";
import { FileText, GitBranch, Map } from "lucide-react";
import styles from "../projects.module.css";
import PandayObjectiveSection from "./PandayObjectiveSection";

export const metadata = {
  title: "Panday | Reagan",
  description: "Panday project by Reagan Lung",
};

export default function PandayProject() {
  return (
    <main className={styles.project}>
      <div className={styles.heroWrap}>
        <div className={`${styles.heroImageContainer} ${styles.pandayHeroContainer}`}>
          <Image
            src="/images/panday/hero.webp"
            alt="Panday hero"
            fill
            className={`${styles.heroImg} ${styles.pandayHeroImgTone}`}
            sizes="100vw"
            unoptimized
            priority
          />
          <div className={styles.pandayHeroOverlay} aria-hidden />
          <div className={styles.pandayHeroBrandStack}>
            <Image
              src="/images/panday/panday%20logo.svg"
              alt="Panday logo"
              width={280}
              height={280}
              className={styles.pandayHeroLogo}
              unoptimized
            />
            <p className={styles.pandayHeroTagline}>
              Built to turn a broken system into a clear path forward.
            </p>
          </div>
          <div className={styles.pandayHeroInfo}>
            <div className={styles.pandayMetaBar}>
              <div className={styles.pandayMetaItem}>
                <span className={styles.pandayMetaLabel}>Role</span>
                <span className={styles.pandayMetaValue}>Lead UI/UX Designer</span>
              </div>
              <div className={styles.pandayMetaItem}>
                <span className={styles.pandayMetaLabel}>Team</span>
                <span className={styles.pandayMetaValue}>8 Members Cross-Functional</span>
              </div>
              <div className={styles.pandayMetaItem}>
                <span className={styles.pandayMetaLabel}>Duration</span>
                <span className={styles.pandayMetaValue}>Sep - Dec 2025</span>
              </div>
              <div className={styles.pandayMetaItem}>
                <span className={styles.pandayMetaLabel}>Focus</span>
                <span className={styles.pandayMetaValue}>UI/UX Case Study</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <PandayObjectiveSection />
      <section className={`${styles.projectSection} ${styles.pandayResearchSection}`}>
        <h3 className={styles.projectSectionTitle}>[ Research ]</h3>
        <div className={styles.pandayResearchBody}>
          <p>
            The problem wasn&apos;t a lack of information. It was that nobody could
            tell you where to start.
          </p>
          <p>
            I surveyed trades students and apprentices to understand what that
            experience actually looked like.
          </p>
        </div>
        <div className={styles.pandayResearchGallery}>
          <figure className={styles.pandaySurveyCard}>
            <Image
              src="/images/panday/survey1.webp"
              alt="Survey response chart from trades students"
              width={1400}
              height={980}
              className={styles.pandaySurveyImage}
              sizes="(max-width: 900px) 92vw, 46vw"
              unoptimized
            />
          </figure>
          <figure
            className={`${styles.pandaySurveyCard} ${styles.pandaySurveyCardAlt}`}
          >
            <Image
              src="/images/panday/survey2.webp"
              alt="Survey response summary from apprentices"
              width={1400}
              height={980}
              className={styles.pandaySurveyImage}
              sizes="(max-width: 900px) 92vw, 46vw"
              unoptimized
            />
          </figure>
        </div>
        <p className={styles.pandayResearchLeadIn}>
          Without anyone to guide them through the system, three problems kept
          coming up.
        </p>
        <div className={styles.pandayPainPoints}>
          <article className={styles.pandayPainPointCard}>
            <h4 className={styles.pandayPainPointTitle}>
              <span
                className={`${styles.pandayPainPointDot} ${styles.pandayPainPointDotOrange}`}
                aria-hidden
              />
              <span
                className={`${styles.pandayPainPointIconWrap} ${styles.pandayPainPointIconOrange}`}
                aria-hidden
              >
                <FileText className={styles.pandayPainPointIcon} />
              </span>
              Too much, too scattered
            </h4>
            <p className={styles.pandayPainPointText}>
              The information is out there, but it&apos;s spread across government
              PDFs, outdated ITA pages, and forums with no clear hierarchy.
              There&apos;s no single place to start and no way to know what
              actually applies to you.
            </p>
          </article>

          <article className={styles.pandayPainPointCard}>
            <h4 className={styles.pandayPainPointTitle}>
              <span
                className={`${styles.pandayPainPointDot} ${styles.pandayPainPointDotGreen}`}
                aria-hidden
              />
              <span
                className={`${styles.pandayPainPointIconWrap} ${styles.pandayPainPointIconGreen}`}
                aria-hidden
              >
                <Map className={styles.pandayPainPointIcon} />
              </span>
              No clear path forward
            </h4>
            <p className={styles.pandayPainPointText}>
              The guidance that exists treats everyone the same. It doesn&apos;t
              account for where you&apos;re coming from, your entry point, your
              background, or how far along you already are. It&apos;s generic
              advice for a journey that isn&apos;t generic.
            </p>
          </article>

          <article className={styles.pandayPainPointCard}>
            <h4 className={styles.pandayPainPointTitle}>
              <span
                className={`${styles.pandayPainPointDot} ${styles.pandayPainPointDotBlue}`}
                aria-hidden
              />
              <span
                className={`${styles.pandayPainPointIconWrap} ${styles.pandayPainPointIconBlue}`}
                aria-hidden
              >
                <GitBranch className={styles.pandayPainPointIcon} />
              </span>
              No signal between steps
            </h4>
            <p className={styles.pandayPainPointText}>
              Even when someone figures out what to do first, the next step
              isn&apos;t obvious. There&apos;s nothing connecting one requirement to
              the next. Every transition from one level to the next is a guess.
            </p>
          </article>
        </div>
        <p className={styles.pandayResearchClosing}>
          The system wasn&apos;t broken because the information was missing. It was
          broken because nothing connected it together. No structure, no starting
          point, no way to know what came next. And for thousands of apprentices
          in BC, that gap was the difference between finishing and giving up.
        </p>
      </section>
      <section className={`${styles.projectSection} ${styles.pandayIdeationSection}`}>
        <h3 className={styles.projectSectionTitle}>[ Ideation ]</h3>
        <div className={styles.pandayIdeationBody}>
          <p>
            The problem wasn&apos;t too much information. It was that none of it
            had any shape.
          </p>
          <p>
            Everything felt equally urgent and equally confusing. There was no
            clear starting point and no way to tell what actually mattered.
          </p>
          <p className={styles.pandayIdeationBeat}>Then something clicked.</p>
          <p>
            In video games, you never face the final boss first. The game builds
            you up to it. Level by level, checkpoint by checkpoint. You always
            know where you are and what comes next.
          </p>
          <p className={styles.pandayIdeationBeat}>
            That&apos;s what the trades path was missing.
          </p>
          <p>
            <strong>Red Seal is the final boss.</strong> Levels 1 through 4 are
            the stages to get there. And within each stage, three types of nodes
            give every requirement, obstacle, and next step its own place on the
            map.
          </p>
        </div>
      </section>
      <section className={`${styles.projectSection} ${styles.pandayTriNodeSection}`}>
        <h3 className={styles.projectSectionTitle}>[ Tri-Node Ecosystem ]</h3>
        <div className={styles.pandayTriNodeBody}>
          <p className={styles.pandayTriNodeLead}>
            <strong>Three node types. One clear system.</strong>
          </p>
          <p>
            Once the level structure was in place, the next question was what
            actually lives inside each level.
          </p>
          <p>
            The trades journey isn&apos;t one type of thing. There are resources
            to work through, obstacles that might slow you down, and actions that
            move you forward. Treating them all the same way would bring back the
            exact problem we were trying to solve.
          </p>
          <p>
            So every milestone on the roadmap gets categorized into one of three
            node types. Each one has its own color, its own purpose, and its own
            place in the journey.
          </p>
        </div>
      </section>
    </main>
  );
}
