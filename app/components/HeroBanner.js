import styles from "./HeroBanner.module.css";

export default function HeroBanner() {
  return (
    <div className={styles.wrapper}>
        <p className={styles.description}>
          Transforming messy workflows into seamless digital ecosystems by bridging functional structure and human connection.
        </p>
      <div className={styles.divider} />
        <div className={styles.links}>
          <a href="https://www.linkedin.com/in/reaganlung" target="_blank" rel="noopener noreferrer">[LINKEDIN]</a>
          <a href="mailto:reaganlung.digital@gmail.com">[EMAIL]</a>
          <a href="/resume.pdf" download>[RESUME]</a>
        </div>
      <div className={styles.blackBar} />
    </div>
  );
}
