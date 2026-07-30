import { Mail, Phone, MapPin, Send, ArrowUp } from "lucide-react";
import { FaFacebookF, FaInstagram, FaXTwitter } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import styles from "./Footer.module.css";

import logo from "../images/logo2.PNG"; 

export default function Footer() {
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowTop(window.scrollY > 400);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const socialIcons = [
    { icon: FaFacebookF, link: "#" },
    { icon: FaInstagram, link: "#" },
    { icon: FaXTwitter, link: "#" },
  ];

  return (
    <>
      {/* Main Footer */}
      <footer className={styles.footer}>
        <div className={styles.container}>
          <div className={styles.grid}>
            
            {/* Brand Info with Logo */}
            <div className={styles.col}>
              <div className={styles.logoWrapper}>
                <img src={logo} alt="Wayanad Premium Logo" className={styles.footerLogo} />
              </div>
              
              <div className={styles.socials}>
                {socialIcons.map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <a
                      key={index}
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.socialIcon}
                    >
                      <Icon size={15} />
                    </a>
                  );
                })}
              </div>
            </div>

            {/* Quick Links */}
            <div className={styles.col}>
              <h3 className={styles.heading}>Quick Links</h3>
              <ul className={styles.links}>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/about">About Us</Link></li>
                <li><Link to="/products">Products</Link></li>
                <li><Link to="/contact">Contact Us</Link></li>
              </ul>
            </div>

            {/* Contact Details */}
            <div className={styles.col}>
              <h3 className={styles.heading}>Contact Us</h3>
              <div className={styles.contactList}>
                <div className={styles.contactItem}>
                  <MapPin className={styles.contactIcon} size={18} />
                  <span>Wayanad, Kerala, India</span>
                </div>
                <div className={styles.contactItem}>
                  <Phone className={styles.contactIcon} size={18} />
                  <span>+91 81292 42208</span>
                </div>
                <div className={styles.contactItem}>
                  <Mail className={styles.contactIcon} size={18} />
                  <span>hello@wayanadpremium.com</span>
                </div>
              </div>
            </div>

            {/* Newsletter */}
            <div className={styles.col}>
              <h3 className={styles.heading}>Newsletter</h3>
              <p className={styles.newsletterText}>
                Subscribe for exclusive offers, recipes, and updates.
              </p>
              <form
                onSubmit={(e) => e.preventDefault()}
                className={styles.newsletterForm}
              >
                <input
                  type="email"
                  placeholder="Email Address"
                  className={styles.input}
                />
                <button type="submit" className={styles.sendBtn} aria-label="Subscribe">
                  <Send size={15} />
                </button>
              </form>
            </div>
          </div>

          <div className={styles.copyright}>
            © {new Date().getFullYear()} Wayanad Premium. All Rights Reserved.
          </div>
        </div>
      </footer>

      {showTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="Scroll to top"
          className={styles.scrollTopBtn}
        >
          <ArrowUp size={18} />
        </button>
      )}
    </>
  );
}
