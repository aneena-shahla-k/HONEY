import React from "react";
import { X, Plus, Minus, Trash2, ShoppingBag } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./CartDrawer.module.css"; 

export default function CartDrawer({
  isOpen,
  onClose,
  cartItems = [],
  onUpdateQuantity,
  onRemoveItem,
}) {
  // Price ഫോർമാറ്റ് സുരക്ഷിതമാക്കാൻ ഒരു Helper Function
  const parsePrice = (price) => {
    if (typeof price === "number") return price;
    if (typeof price === "string") {
      return Number(price.replace(/[^0-9.-]+/g, "")) || 0;
    }
    return 0;
  };

  // Total Subtotal കണക്കാക്കുന്നു
  const subtotal = cartItems.reduce((total, item) => {
    return total + parsePrice(item.price) * (item.quantity || 1);
  }, 0);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop Blur Overlay */}
          <motion.div
            className={styles.overlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Drawer Container */}
          <motion.div
            className={styles.drawer}
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
          >
            {/* Header */}
            <div className={styles.header}>
              <div className={styles.headerTitle}>
                <ShoppingBag size={20} />
                <h2>Your Cart ({cartItems.reduce((acc, i) => acc + (i.quantity || 1), 0)})</h2>
              </div>
              <button onClick={onClose} className={styles.closeBtn}>
                <X size={20} />
              </button>
            </div>

            {/* Cart Body */}
            <div className={styles.body}>
              {cartItems.length === 0 ? (
                <div className={styles.emptyState}>
                  <p>Your cart is currently empty.</p>
                </div>
              ) : (
                <div className={styles.itemList}>
                  {cartItems.map((item) => (
                    <div key={item.id} className={styles.itemCard}>
                      <img
                        src={item.image}
                        alt={item.title || item.name}
                        className={styles.itemImage}
                      />
                      
                      <div className={styles.itemDetails}>
                        {/* title അല്ലെങ്കിൽ name രണ്ടിൽ ഏതുണ്ടെങ്കിലും പ്രിന്റ് ചെയ്യും */}
                        <h4>{item.title || item.name}</h4>
                        <p className={styles.itemPrice}>
                          ₹{parsePrice(item.price)}
                        </p>

                        <div className={styles.quantityControls}>
                          <button
                            onClick={() =>
                              onUpdateQuantity(item.id, (item.quantity || 1) - 1)
                            }
                          >
                            <Minus size={14} />
                          </button>
                          <span>{item.quantity || 1}</span>
                          <button
                            onClick={() =>
                              onUpdateQuantity(item.id, (item.quantity || 1) + 1)
                            }
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                      </div>

                      <button
                        className={styles.removeBtn}
                        onClick={() => onRemoveItem(item.id)}
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer with Total */}
            {cartItems.length > 0 && (
              <div className={styles.footer}>
                <div className={styles.subtotalRow}>
                  <span>Subtotal</span>
                  <span className={styles.subtotalAmount}>₹{subtotal.toLocaleString("en-IN")}</span>
                </div>
                <button className={styles.checkoutBtn}>
                  Proceed to Checkout
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
