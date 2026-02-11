"use client";

import Image from "next/image";
import starIcon from "../../assets/icons/a.png";
import styles from "./WorksMarquee.module.css";

function WorksSegment() {
  return (
    <span className={styles.segment}>
      Works{" "}
      <Image src={starIcon} alt="" width={18} height={18} className={styles.star} />
      {" "}
    </span>
  );
}

export default function WorksMarquee() {
  const segments = Array(20).fill(null);

  return (
    <div className={styles.marquee}>
      <div className={styles.track}>
        <span className={styles.group}>
          {segments.map((_, i) => (
            <WorksSegment key={`a-${i}`} />
          ))}
        </span>
        <span className={styles.group} aria-hidden="true">
          {segments.map((_, i) => (
            <WorksSegment key={`b-${i}`} />
          ))}
        </span>
      </div>
    </div>
  );
}
