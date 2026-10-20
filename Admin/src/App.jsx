
import React from "react";
import { Routes, Route } from "react-router-dom";

import Navbar from "./Components/Navbar";
import Sidebar from "./Components/Sidebar";

import Add from "./Pages/Add";
import List from "./Pages/List";
import Orders from "./Pages/Orders";

import "./App.css";
import Login from "./Pages/Login";

const App = () => {

  return (
    <div className="app">

      {/* Navbar */}
      <Navbar />

      {/* Sidebar + Pages */}
      <div className="main-container">

        {/* Sidebar */}
        <Sidebar />

        {/* Page Content */}
        <div className="page-content">
          <Routes>
             <Route path="/" element={<Login/>}/>
            <Route path="/add" element={<Add />} />
            <Route path="/list" element={<List />} />
            <Route path="/orders" element={<Orders />} />
          </Routes>
        </div>

      </div>

    </div>
  );
};

export default App;
