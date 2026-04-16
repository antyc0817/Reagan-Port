import Image from "next/image";
import Link from "next/link";
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
        <div className={styles.pandayTriNodeList}>
          <article
            className={`${styles.pandayTriNodeItem} ${styles.pandayTriNodeItemImageLeft}`}
          >
            <figure className={styles.pandayTriNodeMedia}>
              <Image
                src="/images/panday/resources.webp"
                alt="Resources node visual"
                width={900}
                height={900}
                className={styles.pandayTriNodeImage}
                sizes="(max-width: 900px) 64vw, 280px"
                unoptimized
              />
            </figure>
            <div className={styles.pandayTriNodeContent}>
              <h4 className={styles.pandayTriNodeItemTitle}>Resources</h4>
              <p>
                These are your foundation. Before you can move forward, you need
                to know what you&apos;re working with.
              </p>
              <ul className={styles.pandayTriNodePoints}>
                <li>
                  Study guides, technical manuals, and government forms relevant
                  to your current level
                </li>
                <li>Work through a checklist as you go</li>
                <li>
                  The node fills up visually as you check items off, so your
                  progress is always visible on the canvas
                </li>
              </ul>
            </div>
          </article>
          <article
            className={`${styles.pandayTriNodeItem} ${styles.pandayTriNodeItemImageRight} ${styles.pandayTriNodeItemGreen}`}
          >
            <figure className={styles.pandayTriNodeMedia}>
              <Image
                src="/images/panday/action.webp"
                alt="Actions node visual"
                width={900}
                height={900}
                className={styles.pandayTriNodeImage}
                sizes="(max-width: 900px) 64vw, 280px"
                unoptimized
              />
            </figure>
            <div className={styles.pandayTriNodeContent}>
              <h4 className={styles.pandayTriNodeItemTitle}>Actions</h4>
              <p>
                These are your next steps. No ambiguity, no reading between the
                lines.
              </p>
              <ul className={styles.pandayTriNodePoints}>
                <li>
                  Specific tasks that need to happen to move from one level to
                  the next
                </li>
                <li>Each action is ordered so you always know what to do first</li>
                <li>
                  Check them off as you complete them and watch the node fill up
                  as you move closer to the next level
                </li>
              </ul>
            </div>
          </article>
          <article
            className={`${styles.pandayTriNodeItem} ${styles.pandayTriNodeItemImageLeft} ${styles.pandayTriNodeItemOrange}`}
          >
            <figure className={styles.pandayTriNodeMedia}>
              <Image
                src="/images/panday/roadblock.webp"
                alt="Roadblocks node visual"
                width={900}
                height={900}
                className={styles.pandayTriNodeImage}
                sizes="(max-width: 900px) 64vw, 280px"
                unoptimized
              />
            </figure>
            <div className={styles.pandayTriNodeContent}>
              <h4 className={styles.pandayTriNodeItemTitle}>Roadblocks</h4>
              <p>
                These are the obstacles that catch most apprentices off guard.
                Panday surfaces them before they happen.
              </p>
              <ul className={styles.pandayTriNodePoints}>
                <li>
                  Common industry hurdles like seasonal layoffs, exam anxiety, or
                  re-entry after a break
                </li>
                <li>
                  Each roadblock comes with a contingency plan so you know what
                  to do if it hits
                </li>
                <li>
                  Work through the checklist and track your preparedness the same
                  way as every other node
                </li>
              </ul>
            </div>
          </article>
        </div>
      </section>
      <section className={`${styles.projectSection} ${styles.pandayRoadmapSection}`}>
        <h3 className={styles.projectSectionTitle}>[ Roadmap ]</h3>
        <div className={styles.pandayRoadmapIntro}>
          <p className={styles.pandayRoadmapIntroLead}>
            This is where it all comes together.
          </p>
          <p>
            The roadmap is the core of Panday. A visual canvas that shows you
            exactly where you are, what needs to happen next, and how far
            you&apos;ve already come. Every node from every level sits in front of
            you in one place, organized by stage and color coded by type.
          </p>
          <p>
            No more digging through pages. No more guessing what comes next. Just
            a clear path from where you are today to your Red Seal.
          </p>
        </div>
        <div className={styles.pandayRoadmapGallery}>
          <article className={styles.pandayRoadmapCard}>
            <p className={styles.pandayRoadmapCardLabel}>
              <strong>Track your progress as you go</strong>
            </p>
            <div className={styles.pandayRoadmapMedia}>
              <Image
                src="/images/panday/roadmap1.webp"
                alt="Panday roadmap view with progress tracking"
                width={1400}
                height={900}
                className={styles.pandayRoadmapImage}
                sizes="(max-width: 900px) 92vw, 46vw"
                unoptimized
              />
            </div>
            <p className={styles.pandayRoadmapCardText}>
              Every node has a built in checklist. As you work through each item
              and check it off, the progress bar fills up and you can see exactly
              how far along you are. No separate tracker, no spreadsheet. Your
              progress lives directly on the canvas.
            </p>
          </article>

          <article className={styles.pandayRoadmapCard}>
            <p className={styles.pandayRoadmapCardLabel}>
              <strong>Ask anything, get answers grounded in the source</strong>
            </p>
            <div className={styles.pandayRoadmapMedia}>
              <Image
                src="/images/panday/roadmap2.webp"
                alt="Panday roadmap overview"
                width={1400}
                height={900}
                className={styles.pandayRoadmapImage}
                sizes="(max-width: 900px) 92vw, 46vw"
                unoptimized
              />
            </div>
            <p className={styles.pandayRoadmapCardText}>
              The AI assistant lives alongside your roadmap. Ask it anything
              about your journey, requirements, or next steps and it pulls
              answers directly from official ITA BC and government sources. No
              searching through PDFs, no second guessing whether the information
              is accurate.
            </p>
          </article>
        </div>
      </section>
      <section className={`${styles.projectSection} ${styles.pandayDesignSystemSection}`}>
        <h3 className={styles.projectSectionTitle}>[ Design System ]</h3>
        <p className={styles.pandayDesignSystemIntro}>
          Color isn&apos;t decoration here. It&apos;s how the system speaks. Every
          color in Panday was chosen with intention, directly tied to the trades
          world and the node system it powers. When you&apos;re navigating something
          this complex, color shouldn&apos;t make you think. It should already tell
          you what you&apos;re looking at and what to do with it.
        </p>

        <div className={styles.pandayDesignSystemGrid}>
          <article
            className={`${styles.pandayDesignSystemCard} ${styles.pandayDesignSystemCardBlue}`}
          >
            <div
              className={`${styles.pandayDesignSystemSwatch} ${styles.pandayDesignSystemSwatchBlue}`}
              aria-hidden
            />
            <p className={styles.pandayDesignSystemHex}>
              <strong>#0077CC</strong>
            </p>
            <h4 className={styles.pandayDesignSystemCardTitle}>Blueprint Blue</h4>
            <p className={styles.pandayDesignSystemCardText}>
              Represents trust, intelligence, and stability. The same thinking
              behind an architectural blueprint. When you see blue, you know
              you&apos;re looking at the information and materials you need to
              study and work through at your current level.
            </p>
          </article>

          <article
            className={`${styles.pandayDesignSystemCard} ${styles.pandayDesignSystemCardOrange}`}
          >
            <div
              className={`${styles.pandayDesignSystemSwatch} ${styles.pandayDesignSystemSwatchOrange}`}
              aria-hidden
            />
            <p className={styles.pandayDesignSystemHex}>
              <strong>#FE5000</strong>
            </p>
            <h4 className={styles.pandayDesignSystemCardTitle}>
              Construction Orange
            </h4>
            <p className={styles.pandayDesignSystemCardText}>
              High visibility and high energy, just like the safety gear worn on
              every job site. Orange marks the obstacles and challenges you might
              face along the way, surfacing them early so you can prepare before
              they slow you down.
            </p>
          </article>

          <article
            className={`${styles.pandayDesignSystemCard} ${styles.pandayDesignSystemCardGreen}`}
          >
            <div
              className={`${styles.pandayDesignSystemSwatch} ${styles.pandayDesignSystemSwatchGreen}`}
              aria-hidden
            />
            <p className={styles.pandayDesignSystemHex}>
              <strong>#00A36C</strong>
            </p>
            <h4 className={styles.pandayDesignSystemCardTitle}>Tradesman Green</h4>
            <p className={styles.pandayDesignSystemCardText}>
              A deep, confident green that signals growth and forward movement.
              Green marks the specific steps and tasks that need to happen to
              move from one level to the next. When you see green, you know
              exactly what needs to be done.
            </p>
          </article>
        </div>
      </section>
      <section className={`${styles.projectSection} ${styles.retrospectiveSection}`}>
        <h3 className={styles.projectSectionTitle}>[ Retrospective ]</h3>
      </section>

      <nav
        className={styles.projectNav}
        aria-label="Project navigation"
        data-section="project-nav"
      >
        <Link href="/work" className={styles.projectNavLink}>
          View All Work
        </Link>
        <Link href="/projects/whatsup" className={styles.projectNavLink}>
          Next: WhatSUP
        </Link>
      </nav>
    </main>
  );
}
