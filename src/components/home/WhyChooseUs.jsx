import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShieldCheck, Leaf, Sparkles, Award, ArrowRight } from "lucide-react";
import styles from "./WhyChooseUs.module.css";
import img1 from "../../images/honey1.jpeg";
import img2 from "../../images/wayanad.webp";
import img3 from "../../images/dry.jpg";
import img4 from "../../images/beekeping.jpg";

const features = [
  {
    id: "purity",
    icon: ShieldCheck,
    tag: "100% UNPROCESSED",
    title: "Raw & Unpasteurized",
    description:
      "Our honey is directly bottled from the hive without thermal treatment, preserving natural enzymes, antioxidants, and rich pollen content.",
    stat: "100%",
    statLabel: "Pure & Organic",
    badge: "Lab Certified",
    image : img1,
  },
  {
    id: "origin",
    icon: Leaf,
    tag: "SINGLE-ORIGIN",
    title: "Wild Wayanad Flora",
    description:
      "Sourced exclusively from the dense, unpolluted Western Ghats of Wayanad, giving it a distinct floral aroma and rich golden texture.",
    stat: "3000ft",
    statLabel: "Altitude Sourced",
    badge: "Eco-Harvested",
    image : img2,
  },
  {
    id: "process",
    icon: Sparkles,
    tag: "TRADITIONAL CARE",
    title: "Cold-Filtered Extraction",
    description:
      "Gravity-strained through fine mesh to retain all beneficial propolis while keeping out raw debris. Zero added sugars or syrups.",
    stat: "0%",
    statLabel: "Added Sugar",
    badge: "Zero Preservatives",
    image : img3,
  },
  {
    id: "quality",
    icon: Award,
    tag: "SUSTAINABLE",
    title: "Ethical Bee Keeping",
    description:
      "We practice sustainable harvesting that protects local bee colonies, ensuring nature thrives while delivering nature’s purest gift to you.",
    stat: "100%",
    statLabel: "Cruelty-Free",
    badge: "Sustainable",
    image : img4,
  },
];

export default function WhyChooseUs() {
  const [activeTab, setActiveTab] = useState(features[0].id);

  const activeFeature = features.find((f) => f.id === activeTab);

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        
        {/* Header */}
        <div className={styles.header}>
          <span className={styles.subtitle}>THE WAYANAD DIFFERENCE</span>
          <h2>Why Our Honey Stands Apart</h2>
          <p>Experience the journey of purity through nature’s finest craftsmanship.</p>
        </div>

        {/* Interactive Layout */}
        <div className={styles.interactiveGrid}>
          
          {/* Left: Interactive Tab Buttons */}
          <div className={styles.tabList} >
            {features.map((item) => {
              const Icon = item.icon;
              const isActive = item.id === activeTab;

              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`${styles.tabBtn} ${isActive ? styles.activeTab : ""}`}
                >
                  <div className={styles.iconCircle}data-aos="zoom-in-down">
                    <Icon size={20} />
                  </div>
                  <div className={styles.tabText}data-aos="zoom-in-down">
                    <span className={styles.tabTag}>{item.tag}</span>
                    <h3>{item.title}</h3>
                  </div>
                  <ArrowRight size={18} className={styles.arrow} />
                </button>
              );
            })}
          </div>

          {/* Right: Dynamic Visual Card with Image */}
          <div className={styles.displayCardWrapper}>
            <AnimatePresence mode="wait">
              <motion.div
                key={activeFeature.id}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className={styles.displayCard}
              >
                {/* Background Image Container */}
                <div className={styles.imageContainer}>
                  <img
                    src={activeFeature.image}
                    alt={activeFeature.title}
                    className={styles.bgImage}
                  />
                  <div className={styles.imageOverlay} />
                  <span className={styles.badge}>{activeFeature.badge}</span>
                </div>

                {/* Content Overlay */}
                <div className={styles.cardContent}>
                  <h3 className={styles.cardTitle}>{activeFeature.title}</h3>
                  <p className={styles.cardDesc}>{activeFeature.description}</p>

                  <div className={styles.statBox}>
                    <div className={styles.statValue}>{activeFeature.stat}</div>
                    <div className={styles.statLabel}>{activeFeature.statLabel}</div>
                  </div>
                </div>

              </motion.div>
            </AnimatePresence>
          </div>

        </div>

      </div>
    </section>
  );
}
