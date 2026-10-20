import React from "react";
import { Link } from "react-router-dom";
import "./Sidebar.css";

const Sidebar = () => {
  return (
    <div className="sidebar-div">
      <div className="sidebar">
        <ul>
          <li>
            <Link to="/">ADD</Link>
          </li>

          <li>
            <Link to="/list">LIST</Link>
          </li>

          <li>
            <Link to="/orders">ORDERS</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;