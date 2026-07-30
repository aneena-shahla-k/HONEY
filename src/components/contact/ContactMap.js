import React from 'react';

const ContactMap = () => {
  return (
    <div className="contact-map-wrapper" style={{ width: '100%', height: '400px', marginTop: '50px' }}>
      <iframe
        title="Wayanad Premium Location"
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d250424.62002360813!2d75.98184515!3d11.6664273!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba6065c71109a13%3A0xe54c130097143493!2sWayanad%2C%20Kerala!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen=""
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    </div>
  );
};

export default ContactMap;
