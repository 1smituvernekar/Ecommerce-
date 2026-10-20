import React from 'react'
import Hero from '../Components/Hero'
import AllProducts from '../Components/AllProducts'
import BestSeller from '../Components/BestSeller'
import  Form from '../Components/Form'
import Footer from '../Components/Footer'

const Home = () => {
  return (
    <div>
      <Hero/>
      <BestSeller/>
      <AllProducts/>
      <Form/>
      <Footer/>
    </div>
  )
}

export default Home