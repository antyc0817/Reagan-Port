import AnimatedName from "./components/AnimatedName";
import Footer from "./components/Footer";
import HeroBanner from "./components/HeroBanner";
import HowICanHelp from "./components/HowICanHelp";
import styles from "./page.module.css";

export default function Home() {
    return (
        <main className={styles.page}>
            {/* Hero Section - Full screen, image to be added */}
            <section
                id='home'
                className={styles.hero}>
                <AnimatedName />
                <HeroBanner />
            </section>

            <HowICanHelp />

            <Footer />
        </main>
    );
}
