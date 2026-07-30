import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, RefreshCw, ShoppingBag, ArrowRight } from "lucide-react";
import styles from "./HoneyMatcher.module.css";

// Products Data & Images
import img1 from "../../images/products/BF140.jpg";
import img2 from "../../images/products/pure1kg.jpg";
import img3 from "../../images/products/sting500.jpg";

const questions = [
  {
    id: 1,
    title: "What is your main goal?",
    options: [
      { label: "Daily Wellness & Immunity", value: "immunity" },
      { label: "Rich Flavor & Cooking", value: "flavor" },
      { label: "Medicinal & Special Care", value: "medicinal" },
    ],
  },
  {
    id: 2,
    title: "Who is this honey for?",
    options: [
      { label: "Kids & Family", value: "family" },
      { label: "Fitness & Weight Care", value: "fitness" },
      { label: "Elders & Health Conscious", value: "elders" },
    ],
  },
];

const recommendations = {
  immunity: {
    title: "Premium Pure Natural Honey",
    price: "₹950",
    badge: "100% Raw",
    desc: "Perfect for daily immunity boosting, warm water mixes, and natural sweetening.",
    image: img2,
    id: 2,
  },
  flavor: {
    title: "Black Forest Honey",
    price: "₹229",
    badge: "Rich & Bold",
    desc: "Dark, aromatic wild forest honey with deep caramel notes for culinary perfection.",
    image: img1,
    id: 1,
  },
  medicinal: {
    title: "Premium Stingless Honey (Cheruthen)",
    price: "₹2,350",
    badge: "Rare Medicinal",
    desc: "Rare stingless bee honey packed with antioxidants, ideal for medicinal use.",
    image: img3,
    id: 3,
  },
};

export default function HoneyMatcher({ onAddToCart }) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState(null);

  const handleSelect = (optionValue) => {
    const updatedAnswers = { ...answers, [step]: optionValue };
    setAnswers(updatedAnswers);

    if (step < questions.length - 1) {
      setStep(step + 1);
    } else {
      // Calculate Result based on first answer choice
      const primaryGoal = updatedAnswers[0] || "immunity";
      setResult(recommendations[primaryGoal] || recommendations.immunity);
    }
  };

  const handleReset = () => {
    setStep(0);
    setAnswers({});
    setResult(null);
  };

  return (
    <section className={styles.matcherSection}>
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.tag}>
            <Sparkles size={14} /> PERSONALIZED RECOMMENDATION
          </span>
          <h2>Find Your Perfect Honey Blend</h2>
          <p>Answer 2 quick questions to discover the ideal Wayanad honey for your lifestyle.</p>
        </div>

        <div className={styles.cardWrapper}>
          <AnimatePresence mode="wait">
            {!result ? (
              <motion.div
                key={`step-${step}`}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className={styles.questionCard}
              >
                <div className={styles.stepBadge}>Step {step + 1} of 2</div>
                <h3>{questions[step].title}</h3>

                <div className={styles.optionsGrid}>
                  {questions[step].options.map((option, idx) => (
                    <button
                      key={idx}
                      className={styles.optionBtn}
                      onClick={() => handleSelect(option.value)}
                    >
                      <span>{option.label}</span>
                      <ArrowRight size={16} />
                    </button>
                  ))}
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="result"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
                className={styles.resultCard}
              >
                <div className={styles.resultBadge}>Match Found!</div>
                <div className={styles.resultGrid}>
                  <div className={styles.imgBox}>
                    <span className={styles.badge}>{result.badge}</span>
                    <img src={result.image} alt={result.title} />
                  </div>

                  <div className={styles.resultDetails}>
                    <h3>{result.title}</h3>
                    <p className={styles.desc}>{result.desc}</p>
                    <p className={styles.price}>{result.price}</p>

                    <div className={styles.actionBtns}>
                      <button
                        className={styles.addToCartBtn}
                        onClick={() => onAddToCart && onAddToCart(result)}
                      >
                        <ShoppingBag size={18} />
                        Add to Cart
                      </button>

                      <button className={styles.resetBtn} onClick={handleReset}>
                        <RefreshCw size={16} />
                        Retake Quiz
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
