import styles from "./HowICanHelp.module.css";

const services = [
  {
    title: "Branding",
    items: ["LOGO DESIGN", "VISUAL STYLE", "PRINT & PACKAGING"],
  },
  {
    title: "UI.UX",
    items: ["WIREFRAMING", "PROTOTYPING", "INTERFACE DESIGN"],
  },
  {
    title: "Digital",
    items: ["SEO STRATEGY", "WEB DEVELOPMENT", "CONTENT MANAGEMENT"],
  },
];

export default function HowICanHelp() {
  return (
    <section id="skills" className={styles.section}>
      <div className={styles.blackBar} />
      <p className={styles.header}>Here is how I can help</p>
      <div className={styles.serviceList}>
        {services.map((service) => (
          <div key={service.title} className={styles.serviceItem}>
            <h3 className={styles.serviceTitle}>{service.title}</h3>
            <p className={styles.serviceSub}>
              {service.items.map((item) => (
                <span key={item} className={styles.serviceSubItem}>[{item}]</span>
              ))}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
