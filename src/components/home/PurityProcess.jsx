import React from "react";
import styles from "./PurityProcess.module.css";
import processImg from "../../images/dry.jpg"; 

const features = [
  {
    number: "01",
    title: "Ethically Wild-Harvested",
    desc: "Sourced directly from deep Wayanad forest canopies by indigenous gatherers.",
  },
  {
    number: "02",
    title: "100% Raw & Unrefined",
    desc: "Unheated, unpasteurized, and free from added sugar, syrups, or preservatives.",
  },
  {
    number: "03",
    title: "NMR Lab Certified",
    desc: "Strictly tested for zero adulteration to ensure absolute purity in every batch.",
  },
];

export default function PurityProcess() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        
        {/* Left Side: Creative Image Showcase */}
        <div className={styles.imageWrapper}>
          <img src={processImg} alt="Pure Wayanad Honey" className={styles.image} />
          <div className={styles.imageOverlay}></div>
          <div className={styles.floatingBadge}>
            <span>100% PURE</span>
            <small>Wayanad Forest Nectar</small>
          </div>
        </div>

        {/* Right Side: Editorial Content */}
        <div className={styles.content}>
          <span className={styles.badge}>THE WAYANAD STANDARD</span>
          <h2 className={styles.title}>
            Pure Forest Honey, <br />
            <span>Untouched by Industry</span>
          </h2>
          <p className={styles.description}>
            We believe honey should reach your table exactly as nature intended—pure, potent, and rich in natural antioxidants.
          </p>

          <div className={styles.featureList}>
            {features.map((item) => (
              <div key={item.number} className={styles.featureItem} data-aos="zoom-in-down">
                <span className={styles.num}>{item.number}</span>
                <div data-aos="zoom-in-down">
                  <h3 className={styles.itemTitle}>{item.title}</h3>
                  <p className={styles.itemDesc}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
