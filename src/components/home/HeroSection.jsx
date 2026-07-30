import "./HeroSection.css";
import { ArrowRight, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";

function HeroSection() {
  const whatsappNumber = "918129242208"; 
  const whatsappMessage = encodeURIComponent(
    "Hello Wayanad Premium! I would like to know more about your pure honey products."
  );
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

  return (
    <section className="hero">
      <div className="overlay"></div>
      <div className="content">
        <p className="tag">NATURALLY PURE. NOTHING ADDED.</p>
        <div className="line"></div>
        <div data-aos="fade-up"><h1>
          Pure Forest Honey,
          <br />
          From Wayanad
        </h1></div>
        <p className="description">
          100% Natural Sidr Honey. No sugar. No adulteration.
          Trusted by 10,000+ families across India.
        </p>
        <div className="buttons" data-aos="fade-up">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="glass-btn-link"
          >
            <span className="glass-btn">
              <MessageCircle size={18} />
              Order via WhatsApp
            </span>
          </a>

          <Link to="/products" className="glass-btn-link">
            <span className="glass-btn secondary">
              Explore Products
              <ArrowRight size={18} />
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
