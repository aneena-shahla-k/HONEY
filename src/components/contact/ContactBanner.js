import React from 'react';
import './ContactBanner.css'; 

const ContactBanner = () => {
  return (
    <div className="contact-banner-container">
      <div className="contact-banner-overlay" />
      <div className="contact-banner-content">
        <h1>Contact Us</h1>
        <p>Home &gt; Contact</p>
      </div>
    </div>
  );
};

export default ContactBanner;
