import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

import AOS from "aos";
import "aos/dist/aos.css";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import CartDrawer from "./components/CartDrawer";
import PageTransition from "./components/PageTransition";

import Home from "./pages/Home";
import About from "./pages/About";
import Products from "./pages/Products";
import Contact from "./pages/Contact";

// ScrollToTop Component
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
    AOS.refresh();
  }, [pathname]);

  return null;
}

function AnimatedRoutes({ onAddToCart }) {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route
          path="/"
          element={
            <PageTransition>
              <Home onAddToCart={onAddToCart} />
            </PageTransition>
          }
        />

        <Route
          path="/about"
          element={
            <PageTransition>
              <About />
            </PageTransition>
          }
        />

        <Route
          path="/products"
          element={
            <PageTransition>
              <Products onAddToCart={onAddToCart} />
            </PageTransition>
          }
        />

        {/* <Route
          path="/products/:id"
          element={
            <PageTransition>
              <ProductDetails onAddToCart={onAddToCart} />
            </PageTransition>
          }
        /> */}

        <Route
          path="/contact"
          element={
            <PageTransition>
              <Contact />
            </PageTransition>
          }
        />
      </Routes>
    </AnimatePresence>
  );
}

export default function App() {
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    AOS.init({
      duration: 900,      
      once: false,
      mirror: true,          
      easing: "ease-in-out",
      offset: 100,        
    });
  }, []);

  const handleAddToCart = (product) => {
    if (!product || !product.id) {
      console.error("Invalid product passed to handleAddToCart:", product);
      return;
    }

    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id);

      if (existingItem) {
        return prevItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevItems, { ...product, quantity: 1 }];
      }
    });

    setCartOpen(true);
  };

  // Update item quantity (+ / -)
  const handleUpdateQuantity = (id, newQuantity) => {
    if (newQuantity <= 0) {
      handleRemoveItem(id);
    } else {
      setCartItems((prevItems) =>
        prevItems.map((item) =>
          item.id === id ? { ...item, quantity: newQuantity } : item
        )
      );
    }
  };

  const handleRemoveItem = (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const totalCartCount = cartItems.reduce(
    (acc, item) => acc + (item.quantity || 0),
    0
  );

  return (
    <BrowserRouter>
      <ScrollToTop />

      <Navbar
        cartCount={totalCartCount}
        openCart={() => setCartOpen(true)}
      />

      <AnimatedRoutes onAddToCart={handleAddToCart} />

      <Footer />

      <CartDrawer
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
      />
    </BrowserRouter>
  );
}
