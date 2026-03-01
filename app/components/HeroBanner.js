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
        <a href="/Reagan%20Resume.pdf" target="_blank" rel="noopener noreferrer">[RESUME]</a>
      </div>
    </div>
  );
}
