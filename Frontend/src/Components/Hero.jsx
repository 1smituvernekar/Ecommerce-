import React from 'react'
import {assets} from '../assets/frontend_assets/assets'
import './Hero.css'
const Hero = () => {
  return (
    <div className='hero'>
      <div className="hero-left">
<img src={assets.hero_img2} alt=''/>
      </div>
      <div className="hero-right">
<h2>
  Discover sustainably sourced apparel designed for maximum comfort and an effortless look.<span>Redefine Your Daily Style.</span>
</h2>
      </div>
    </div>
  )
}

export default Hero