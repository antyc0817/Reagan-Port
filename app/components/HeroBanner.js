import styles from "./HeroBanner.module.css";

export default function HeroBanner() {
  return (
    <div className={styles.wrapper}>
      <p className={styles.description}>
        Transforming messy workflows into seamless digital ecosystems by bridging functional structure and human connection.
      </p>
      <div className={styles.links}>
        <a href="https://www.linkedin.com/in/reaganlung" target="_blank" rel="noopener noreferrer">[LINKEDIN]</a>
        <span className={styles.linkPlaceholder}>[EMAIL]</span>
        {/* TODO: Add resume.pdf to public/ then change to: <a href="/resume.pdf" download="Reagan_Lung_Resume.pdf">[RESUME]</a> */}
        <span className={styles.linkPlaceholder}>[RESUME]</span>
      </div>
    </div>
  );
}
