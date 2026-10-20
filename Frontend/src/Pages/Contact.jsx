import React from 'react'

import './Contact.css'

const Contact = () => {
  return (
    <div className="contact">

      <div className="contact-container">

        <div className="contact-info">

          <h2>Contact Us</h2>

          <p>
            Have a question or need help?
            Get in touch with us.
          </p>

          <div className="contact-item">
            <h3>Address</h3>
            <p>India</p>
          </div>

          <div className="contact-item">
            <h3>Email</h3>
            <p>support@example.com</p>
          </div>

          <div className="contact-item">
            <h3>Phone</h3>
            <p>+91 98765 43210</p>
          </div>

        </div>


        <div className="contact-form">

          <Form />

        </div>

      </div>

    </div>
  )
}

export default Contact