import styles from "./HeroBanner.module.css";

export default function HeroBanner() {
  return (
    <div className={styles.wrapper}>
        <p className={styles.description}>
          Transforming messy workflows into seamless<br />
          digital ecosystems by bridging functional<br />
          structure and human connection.
        </p>
      <div className={styles.divider} />
        <div className={styles.links}>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">[LINKEDIN]</a>
          <a href="mailto:hello@example.com">[EMAIL]</a>
          <a href="#" download>[RESUME]</a>
        </div>
      <div className={styles.blackBar} />
    </div>
  );
}
