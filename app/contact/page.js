import Footer from "../components/Footer";
import styles from "./page.module.css";

export default function ContactPage() {
  return (
    <main>
      <section id="contact" className={styles.contact}>
        <p className={styles.contactPrompt}>Have an idea?</p>
        <h2 className={styles.contactTitle}>Let&apos;s talk!</h2>
        <form className={styles.contactForm}>
          <input type="text" placeholder="Name" className={styles.formInput} />
          <input type="email" placeholder="Email" className={styles.formInput} />
          <textarea placeholder="Message" className={styles.formTextarea} rows={4} />
          <button type="submit" className={styles.formButton}>
            SEND
          </button>
        </form>
      </section>
      <Footer />
    </main>
  );
}
