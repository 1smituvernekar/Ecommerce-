import React from 'react'
import './About.css'

const About = () => {
  return (
    <div className="about">

      <div className="about-container">

        <div className="about-image">

          <img
            src="https://images.unsplash.com/photo-1441986300917-64674bd600d8"
            alt="Shopping"
          />

        </div>


        <div className="about-content">

          <h2>About Us</h2>

          <p>
            Welcome to our online store. We provide
            quality products with a simple and enjoyable
            shopping experience.
          </p>

          <p>
            Our goal is to make online shopping easy,
            convenient and accessible for everyone.
          </p>

          <button>
            Explore Products
          </button>

        </div>

      </div>


      <div className="about-features">

        <div className="feature">
          <h3>Quality Products</h3>
          <p>We focus on providing reliable products.</p>
        </div>

        <div className="feature">
          <h3>Fast Delivery</h3>
          <p>Get your orders delivered conveniently.</p>
        </div>

        <div className="feature">
          <h3>Easy Shopping</h3>
          <p>Simple and user-friendly shopping experience.</p>
        </div>

      </div>

    </div>
  )
}

export default About