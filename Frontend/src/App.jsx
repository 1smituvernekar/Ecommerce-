import React from 'react'
import{Routes,Route} from 'react-router-dom'
import Navbar from './Components/Navbar'
import Home from './Pages/Home'
import About from './Pages/About'
import Contact from './Pages/Contact'
import Product from './Pages/Product'
import Cart from './Pages/Cart'
import Orders from './Pages/Orders'
import PlaceOrder from './Pages/PlaceOrder'
import AllProducts from './Pages/AllProducts'
import Login from './Pages/Login'
const App = () => {
  return (
    <div>
      <Navbar/>
      <Routes>
<Route path='/' element={<Home/>}/>
<Route path='/about' element={<About/>}/>
<Route path='/contact' element={<Contact/>}/>
<Route path='/product/:id' element={<Product/>}/>
<Route path='/cart' element={<Cart/>}/>
<Route path='/orders' element={<Orders/>}/>
<Route path='/placeOrder' element={<PlaceOrder/>}/>
<Route path='/allProducts' element={<AllProducts/>}/>
<Route path='/login' element={<Login/>}/>


      </Routes>
    </div>
  )
}

export default App




