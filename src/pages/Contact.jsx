import React from 'react'
import ContactForm from '../components/contact/ContactForm'
import ContactBanner from '../components/contact/ContactBanner'
import ContactMap from '../components/contact/ContactMap'

export default function Contact() {
  return (
    <div>
        <ContactBanner/>
        <ContactForm/>
        <ContactMap/>
    </div>
  )
}
