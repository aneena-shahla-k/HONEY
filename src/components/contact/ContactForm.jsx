import React, { useState } from 'react';
import { Phone, Mail, MapPin, MessageCircle } from 'lucide-react';
import './ContactForm.css';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'Honey Query',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Submitted:', formData);
    // submit logic here
  };

  return (
    <section className="contact-section">
      <div className="container">
        <div className="contact-header text-center">
          <h2>Have Any Question?</h2>
          <p>We'd love to hear from you. Fill out the form and our team will get back to you shortly.</p>
        </div>

        {/* Quick Info Badges */}
        <div className="contact-info-grid">
          <div className="info-card" data-aos="zoom-in">
            <Phone size={24} className="info-icon" />
            <div>
              <h4>Call Us</h4>
              <p>+91 8129242208</p>
            </div>
          </div>
          <div className="info-card" data-aos="zoom-in">
            <Mail size={24} className="info-icon" />
            <div>
              <h4>Email Support</h4>
              <p>support@wayanadpremium.com</p>
            </div>
          </div>
          <div className="info-card" data-aos="zoom-in">
            <MapPin size={24} className="info-icon" />
            <div>
              <h4>Visit Us</h4>
              <p>Wayanad, Kerala, India</p>
            </div>
          </div>
        </div>

        {/* Form Container */}
        <div className="contact-form-card">
          <form onSubmit={handleSubmit}>
            <div className="form-row">
              <input 
                type="text" 
                name="name"
                placeholder="Your Name" 
                value={formData.name}
                onChange={handleChange}
                required 
              />
              <input 
                type="email" 
                name="email"
                placeholder="Your Email" 
                value={formData.email}
                onChange={handleChange}
                required 
              />
            </div>

            <div className="form-row">
              <input 
                type="tel" 
                name="phone"
                placeholder="Your Phone" 
                value={formData.phone}
                onChange={handleChange}
              />
              <select name="subject" value={formData.subject} onChange={handleChange}>
                <option value="Honey Query">Product Enquiry</option>
                <option value="Bulk Order">Bulk / Wholesale Order</option>
                <option value="Shipping">Shipping & Tracking</option>
                <option value="Other">Other Query</option>
              </select>
            </div>

            <div className="form-group">
              <textarea 
                name="message"
                rows="5" 
                placeholder="Write your message here..."
                value={formData.message}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-actions">
              <button type="submit" className="submit-btn">
                SEND MESSAGE
              </button>

              <a 
                href="https://wa.me/918129242208" 
                target="_blank" 
                rel="noreferrer" 
                className="whatsapp-quick-btn"
              >
                <MessageCircle size={18} /> Instant WhatsApp Chat
              </a>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
