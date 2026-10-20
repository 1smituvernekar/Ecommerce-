import React, { useContext, useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import './Navbar.css'

import { assets } from '../assets/frontend_assets/assets'
import { ShopContext } from '../Context/ShopContext'

const Navbar = () => {

  // Get cart count from ShopContext
  const { getCartCount } = useContext(ShopContext)

  // Get token from localStorage
  const [token, setToken] = useState(
    localStorage.getItem('token')
  )

  // Search input
  const [search, setSearch] = useState('')

  // Mobile menu
  const [menuOpen, setMenuOpen] = useState(false)

  // Used for navigation
  const navigate = useNavigate()


  // ================= LOGOUT =================

  const removeToken = () => {

    // Remove token from localStorage
    localStorage.removeItem('token')

    // Remove token from React state
    setToken(null)

    // Go to login page
    navigate('/login')
  }


  // ================= SEARCH =================

  const handleSearch = (e) => {

    // Stop form from refreshing the page
    e.preventDefault()

    // Remove extra spaces
    const searchValue = search.trim()

    // If search box is not empty
    if (searchValue !== '') {

      navigate('/AllProducts')

      // Clear search box
      setSearch('')

      // Close mobile menu
      setMenuOpen(false)
    }
  }


  // ================= ORDERS =================

  const handleOrders = () => {

    // If token exists
    if (token) {

      navigate('/orders')

    } else {

      // If token does not exist
      alert('Please login first')

      navigate('/login')
    }
  }


  return (
    <nav className="navbar">


      {/* ================= LOGO ================= */}

      <Link
        to="/"
        className="logo"
      >

        <img
          src={assets.logo}
          alt="Logo"
        />

      </Link>


      {/* ================= NAVIGATION ================= */}

      <div
        className={`nav-menu ${menuOpen ? 'active' : ''}`}
      >

        <NavLink
          to="/"
          onClick={() => setMenuOpen(false)}
        >
          Home
        </NavLink>

        <NavLink
          to="/about"
          onClick={() => setMenuOpen(false)}
        >
          About
        </NavLink>

        <NavLink
          to="/contact"
          onClick={() => setMenuOpen(false)}
        >
          Contact
        </NavLink>

<NavLink
          to="/allProducts"
          onClick={() => setMenuOpen(false)}
        >
         Products
        </NavLink>
      </div>


      {/* ================= RIGHT SIDE ================= */}

      <div className="nav-right">


        {/* ================= SEARCH ================= */}

        <form
          className="search-box"
          onSubmit={handleSearch}
        >

          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <button type="submit">

            <img
              src={assets.search_icon}
              alt="Search"
            />

          </button>

        </form>


        {/* ================= PROFILE ================= */}

        <div className="profile">

          <img
            src={assets.profile_icon}
            alt="Profile"
          />


          <div className="profile-menu">


            {/* LOGIN */}

            {!token && (

              <Link to="/login">
                Login
              </Link>

            )}


            {/* ORDERS */}

            <button
              onClick={handleOrders}
              className="orders-button"
            >
              Orders
            </button>


            {/* LOGOUT */}

            {token && (

              <button
                onClick={removeToken}
                className="logout-button"
              >
                Logout
              </button>

            )}

          </div>

        </div>


        {/* ================= CART ================= */}

        <Link
          to="/cart"
          className="cart"
        >

          <img
            src={assets.cart_icon}
            alt="Cart"
          />


          {/* Show cart number only if cart has items */}

          {getCartCount() > 0 && (

            <span className="cart-count">
              {getCartCount()}
            </span>

          )}

        </Link>


        {/* ================= MOBILE MENU ================= */}

        <img
          className="menu-icon"
          src={assets.menu_icon}
          alt="Menu"
          onClick={() => setMenuOpen(!menuOpen)}
        />

      </div>

    </nav>
  )
}

export default Navbar