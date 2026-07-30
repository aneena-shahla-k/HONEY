import React from "react"; 
import "./AboutIndex.css";
import img1 from '../../images/about2.PNG'
import img2 from '../../images/dry.jpg'

const AboutIndex = () => {

  // ⚡ FORM & MODAL STATES ⚡
  
  return (
    <div className="about-page">

      {/* HERO */}
      <section className="about-hero">
        <div className="container">
          <h1>Purest Honey <span>Straight from Wayanad</span></h1>
          <p>100% Raw, Natural and Unprocessed. No sugar, no preservatives, no shortcuts</p>
        </div>
      </section>

      {/* STORY */}
      <section className="about-section">
        <div className="container grid">
          <div className="text">
            <h2>The Story Behind Wayanad Premium</h2>
            <p>Born deep within the lush, untouched forests of the Western Ghats, 
                Wayanad Premium was created with a simple mission: to restore absolute purity to your daily spoon of honey in a world 
                filled with adulteration. We partner with traditional local harvesters in Wayanad to ethically collect raw forest honey 
                that bees forage from rare medicinal flora. Kept entirely raw—unheated, unprocessed, and unfiltered—our honey retains all its 
                natural enzymes, rich nutrients, and distinct authentic flavors without a single drop of added sugar or preservatives. 
                Every batch undergoes strict quality and purity testing, earning the trust of over 10,000 families across India who welcome the pure, 
                 essence of Wayanad’s wild forests straight into their homes.</p>
          </div>
          <div className="image" data-aos="zoom-in">
            <img src={img1} alt="wellness" />
          </div>
        </div>
      </section>

      <section className="about-section light">
        <div className="container">
          <div className="philosophy" data-aos="zoom-in">
            <h2>Our Philosophy: Purity Without Compromise</h2>
            <p>
             Nature produces perfection—we simply protect it. Our guiding principle at Wayanad Premium is to honor the delicate ecosystem of the Western Ghats while bringing its natural richness straight to your table. We commit to ethical, sustainably sourced harvesting, leaving the forest unharmed and keeping our honey completely raw, unprocessed, and unfiltered. To us, quality isn’t a marketing phrase; it’s an uncompromising promise to every family we serve.
            </p>
          </div>
        </div>
      </section>

      {/* WHY US - Includes Button trigger */}
      <section className="about-section">
        <div className="container grid reverse">
          <div className="image" data-aos="zoom-in">
            <img src={img2} alt="therapy" />
          </div>
          <div className="text">
            <h2>Why Wayanad Premium</h2>
            <ul>
              <li>No Added Sugar/ No Adulteration: 0% Chemical guarantees</li>
              <li>Rich in Medicinal Properties: Sidr, Turmeric, Crystal Honey</li>
              <li>Trusted Brand: 10,000+ families</li>
              <li>All India Delivery</li>
            </ul>
          </div>
        </div>
      </section>
      
      <section className="stats">
        <div className="container stats-grid">
          <div data-aos="fade-up">
            <h2>10+</h2>
            <p>Years Experience</p>
          </div>
          <div data-aos="fade-up">
            <h2>10,000+</h2>
            <p>Happy Families</p>
          </div>
          <div data-aos="fade-up">
            <h2>25+</h2>
            <p>Expert Advice</p>
          </div>
          <div data-aos="fade-up">
            <h2>100%</h2>
            <p>Trustable</p>
          </div>
        </div>
      </section>

      {/* CTA - Triggering Modal */}
      {/* <section className="about-cta">
        <div className="container">
          <h2>Experience the Taste of Pure Nature</h2>
          <button className="btn">Explore</button>
        </div>
      </section> */}

      
    </div>
  );
};

export default AboutIndex;
