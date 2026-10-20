import React from 'react'
import './Form.css'

const Form = () => {
  return (
    <form className="form">

      <h2>Form</h2>

      <input
        type="text"
        placeholder="Your Name"
      />

      <input
        type="email"
        placeholder="Your Email"
      />

      <input
        type="text"
        placeholder="Subject"
      />

      <textarea
        placeholder="Your Message"
        rows="6"
      ></textarea>

      <button type="submit">
        Send Message
      </button>

    </form>
  )
}

export default Form