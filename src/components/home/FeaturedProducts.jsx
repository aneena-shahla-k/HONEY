import { motion } from "framer-motion";
import { ShoppingBag, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import styles from "./FeaturedProducts.module.css";
import img1 from "../../images/products/BF140.jpg";
import img2 from "../../images/products/pure1kg.jpg";
import img3 from "../../images/products/sting500.jpg";

const products = [
  {
    id: 1,
    title: "Black Forest Honey",
    price: 229,
    formattedPrice: "₹229",
    badge: "Best Seller",
    image: img1,
  },
  {
    id: 2,
    title: "Premium Pure Natural",
    price: 950,
    formattedPrice: "₹950",
    badge: "100% Pure",
    image: img2,
  },
  {
    id: 3,
    title: "Premium Stingless Honey",
    price: 2350,
    formattedPrice: "₹2,350",
    badge: "Premium",
    image: img3,
  },
];

export default function FeaturedProducts({ onAddToCart }) {
  const handleCartClick = (e, product) => {
    e.stopPropagation();
    if (onAddToCart) {
      onAddToCart(product);
    }
  };

  return (
    <section className={styles.products}>
      <div className={styles.glow} />

      <div className={styles.container}>
        <div className={styles.heading}>
          <span className={styles.tag}>ORGANIC & PURE</span>
          <h2>Finest Honey Collection</h2>
          <p>Handcrafted, natural honey directly sourced from premium apiaries.</p>
        </div>

        <div className={styles.grid}>
          {products.map((product) => (
            <motion.div
              className={styles.card}
              key={product.id}
              whileHover={{ y: -6 }}
              transition={{ duration: 0.2 }}
            >
              <div className={styles.imageBox} data-aos="zoom-in">
                <span className={styles.badge}>{product.badge}</span>
                <img
                  src={product.image}
                  alt={product.title}
                  className={styles.image}
                  loading="eager"
                  decoding="sync"
                />
              </div>

              <div className={styles.content}>
                <div className={styles.cardHeader}>
                  <h3>{product.title}</h3>
                </div>

                <div className={styles.actions}>
                  <div className={styles.priceContainer}>
                    <span className={styles.price}>{product.formattedPrice}</span>
                  </div>

                  <button
                    type="button"
                    onClick={(e) => handleCartClick(e, product)}
                    className={styles.cartIconBtn}
                    aria-label={`Add ${product.title} to cart`}
                  >
                    <ShoppingBag size={18} />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className={styles.exploreWrapper}>
          <Link to="/products" className={styles.exploreBtn}>
            <span>Explore All Products</span>
            <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
}
