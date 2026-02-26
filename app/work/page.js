import Image from "next/image";
import Link from "next/link";
import Footer from "../components/Footer";
import WorksMarquee from "../components/WorksMarquee";
import styles from "./page.module.css";

const projects = [
  {
    slug: "cuisine-clinic",
    title: "Cuisine Clinic",
    subtitle: "Custom Packaging & Dieline",
    date: "Oct 2025",
    description:
      "Built to evoke the calm of a fresh start, Cuisine Clinic turns a medical remedy into a physical experience. This project involved crafting custom packaging dielines and mockups to bring a sense of order to the morning after.",
    cover: "/images/cuisine-clinic/coverimg.webp",
  },
  {
    slug: "whatsup",
    title: "WhatSUP",
    subtitle: "Redesign & Brand Identity",
    date: "Jan - May 2025",
    description:
      "Built to breathe new life into a digital legacy, WhatSUP transforms an outdated presence into a sharp, modern experience. This project centered on a complete visual overhaul and logo redesign, using sitemap restructuring and usability testing to create an intuitive flow.",
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

export default function WorkPage() {
  return (
    <main className={styles.page}>
      <section className={styles.works}>
        <WorksMarquee />
        <div className={styles.projectList}>
          {projects.map((project, i) => (
            <Link
              key={project.slug}
              href={`/projects/${project.slug}`}
              className={`${styles.projectRow} ${i % 2 === 1 ? styles.projectRowReverse : ""}`}
            >
              <div className={styles.projectImage}>
                <Image src={project.cover} alt={project.title} fill className={styles.projectImg} sizes="50vw" unoptimized />
              </div>
              <div className={styles.projectInfo}>
                <div className={`${styles.projectInfoHead} ${i % 2 === 1 ? styles.projectInfoHeadRight : styles.projectInfoHeadLeft}`}>
                  <h3 className={styles.projectTitle}>[ {project.title} ]</h3>
                  <p className={styles.projectSubtitle}>[ {project.subtitle} ]</p>
                  <p className={styles.projectDate}>[ {project.date} ]</p>
                </div>
                <p className={`${styles.projectDesc} ${i % 2 === 1 ? styles.projectDescLeft : styles.projectDescRight}`}>
                  {project.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>
      <Footer />
    </main>
  );
}
