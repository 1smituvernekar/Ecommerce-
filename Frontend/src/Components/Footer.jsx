import React from 'react'
import './Footer.css'

const Footer = () => {
  return (
    <footer className="footer">

      <div className="footer-container">

        {/* About */}

        <div className="footer-box">

          <h2>SHOPPING</h2>

          <p>
            Discover quality products at affordable prices.
            Shop your favorite products easily and securely.
          </p>

        </div>


        {/* Links */}

        <div className="footer-box">

          <h3>Quick Links</h3>

          <ul>
            <li>Home</li>
            <li>About</li>
            <li>Products</li>
            <li>Contact</li>
          </ul>

        </div>


        {/* Contact */}

        <div className="footer-box">

          <h3>Contact</h3>

          <p>Email: support@example.com</p>
          <p>Phone: +91 98765 43210</p>
          <p>India</p>

        </div>


        {/* Newsletter */}

        <div className="footer-box">

          <h3>Newsletter</h3>

          <p>
            Subscribe to receive our latest updates.
          </p>

          <div className="footer-form">

            <input
              type="email"
              placeholder="Enter your email"
            />

            <button>
              Subscribe
            </button>

          </div>

        </div>

      </div>


      <div className="footer-bottom">

        <p>
          © 2026 Shopping. All Rights Reserved.
        </p>

      </div>

    </footer>
  )
}

export default Footer