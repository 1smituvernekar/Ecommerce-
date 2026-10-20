
import React, { useState } from "react";
import "./Login.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const backendUrl = "http://localhost:4000";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      // Admin login API
      const { data } = await axios.post(
        `${backendUrl}/api/user/admin`,
        {
          email,
          password,
        }
      );

      console.log(data);

      if (data.success && data.token) {
        // Save admin token
        localStorage.setItem("token", data.token);

        // Open admin add product page
        navigate("/add");
      } else {
        alert(data.message || "Admin login failed");
      }
    } catch (error) {
      console.log(
        "Admin login error:",
        error.response?.data || error.message
      );

      alert(
        error.response?.data?.message ||
          "Login failed. Please check your credentials."
      );
    }
  };

  return (
    <div className="login-page">
      <div className="login">
        <h2>LOGIN FORM</h2>

        <form onSubmit={onSubmitHandler} className="form">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button className="btn" type="submit">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
