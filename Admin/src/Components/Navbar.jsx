import React from "react";
import "./Navbar.css";
import { assets } from "../assets/admin_assets/assets";

const Navbar = () => {

  const removeToken = () => {
    localStorage.removeItem("token");

    window.location.href = "/login";
  };

  return (
    <div className="navbar-component">

      <div className="navbar">
        <img src={assets.logo} alt="Logo" />
      </div>

      <button onClick={removeToken} className="logout-btn">
        Logout
      </button>

    </div>
  );
};

export default Navbar;