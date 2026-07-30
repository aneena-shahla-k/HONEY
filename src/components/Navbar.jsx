import { useEffect, useState, useRef } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Search, ShoppingBag, User, Menu, X } from "lucide-react";
import logo from "../images/logo2.PNG";

import "./Navbar.css";

export default function Navbar({ openCart, cartCount = 0 }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  
  // Search state & navigation
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const searchInputRef = useRef(null);

  const navRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (searchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [searchOpen]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (navRef.current && !navRef.current.contains(e.target)) {
        setMenuOpen(false);
        setSearchOpen(false);
      }
    };

    const handleResize = () => {
      if (window.innerWidth > 992) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    window.addEventListener("resize", handleResize);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Search Execute ചെയ്യാനുള്ള Handler
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Products പേജിലേക്ക് search query പാസ്സ് ചെയ്യുന്നു
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
      setSearchQuery("");
    }
  };

  const navLinks = [
    { title: "Home", path: "/" },
    { title: "About", path: "/about" },
    { title: "Products", path: "/products" },
    { title: "Contact", path: "/contact" },
  ];

  return (
    <header className={`navbarWrapper ${scrolled ? "scrolled" : ""}`}>
      <div className="navbarContainer" ref={navRef}>
        <motion.nav layout transition={{ duration: 0.3 }} className="navbar">
          <Link to="/" className="logo">
            <img src={logo} alt="Wayanad Premium" className="logoImage" />
          </Link>

          <div className="desktopMenu">
            {navLinks.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  isActive ? "navLink active" : "navLink"
                }
              >
                {item.title}
              </NavLink>
            ))}
          </div>

          <div className="navActions">
            {/* Search Box Trigger & Input */}
            <div className="searchContainer" style={{ position: 'relative' }}>
              <button 
                className="iconBtn" 
                onClick={() => setSearchOpen(!searchOpen)} 
                aria-label="Search"
              >
                <Search size={18} />
              </button>

              <AnimatePresence>
                {searchOpen && (
                  <motion.form
                    onSubmit={handleSearchSubmit}
                    initial={{ opacity: 0, width: 0 }}
                    animate={{ opacity: 1, width: "220px" }}
                    exit={{ opacity: 0, width: 0 }}
                    transition={{ duration: 0.25 }}
                    className="searchBarOverlay"
                  >
                    <input
                      ref={searchInputRef}
                      type="text"
                      placeholder="Search honey..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="searchInput"
                    />
                    <button type="submit" className="searchSubmitBtn">
                      <Search size={14} />
                    </button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>

            <button className="iconBtn" aria-label="Account">
              <User size={18} />
            </button>

            <button
              className="iconBtn cartBtn"
              onClick={openCart}
              aria-label="Cart"
            >
              <ShoppingBag size={18} />
              {cartCount > 0 && <span className="cartBadge">{cartCount}</span>}
            </button>

            <button
              className="menuBtn"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </motion.nav>

        <AnimatePresence>
          {menuOpen && (
            <motion.div
              className="mobileMenu"
              initial={{ opacity: 0, y: -10, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.98 }}
              transition={{ duration: 0.2 }}
            >
              {navLinks.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={() => setMenuOpen(false)}
                  className={({ isActive }) =>
                    isActive ? "mobileLink active" : "mobileLink"
                  }
                >
                  {item.title}
                </NavLink>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
