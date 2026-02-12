import Image from "next/image";
import styles from "./Footer.module.css";

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={styles.footerTop}>
                <Image
                    src='/icons/a.png'
                    alt=''
                    width={24}
                    height={24}
                    className={styles.starIcon}
                    unoptimized
                />
                <p className={styles.footerName}>Reagan Lung</p>
            </div>
            <div className={styles.footerDivider} />
            <div className={styles.footerColumns}>
                <div className={styles.footerCol}>
                    <Image
                        src='/icons/r-icon.png'
                        alt='Reagan'
                        width={48}
                        height={48}
                        className={styles.footerIcon}
                        unoptimized
                    />
                </div>
                <div className={styles.footerColDivider} />
                <div className={styles.footerCol}>
                    <span className={styles.footerLinks}>
                        [HELLO] [@] [MEOW]
                    </span>
                </div>
                <div className={styles.footerColDivider} />
                <div className={styles.footerCol}>
                    <span className={styles.footerCopy}>[©] [2026]</span>
                </div>
            </div>
        </footer>
    );
}
