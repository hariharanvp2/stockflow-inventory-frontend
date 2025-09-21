// src/userauthentication/Register.jsx
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../api";
import "./Register.css";

const Register = () => {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    phoneNumber: "",
  });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setMessage("");
    try {
      const res = await API.post("/api/auth/register", form);
      setMessage(res.data.message || "Registration successful!");
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      setMessage(err.response?.data?.message || "Registration failed. Please try again.");
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div className="register-layout">
      {/* Left branding panel */}
      <div className="register-left">
        <h1>Join StockFlow 🚀</h1>
<p>Create your account and take control of your inventory with ease</p>

      </div>

      {/* Right form */}
      <div className="register-right">
        <h2>Create Account</h2>
        <form onSubmit={handleRegister}>
          <div className="input-group">
            <input
              type="text"
              name="username"
              value={form.username}
              onChange={handleChange}
              required
            />
            <label>Username</label>
          </div>

          <div className="input-group">
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
            />
            <label>Email</label>
          </div>

          <div className="input-group">
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              required
            />
            <label>Password</label>
          </div>

          <div className="input-group">
            <input
              type="tel"
              name="phoneNumber"
              value={form.phoneNumber}
              onChange={handleChange}
            />
            <label>Phone Number (Optional)</label>
          </div>

          <button type="submit">Register</button>
        </form>

        {message && <p className="form-message">{message}</p>}

        <p>
          Already have an account? <Link to="/login">Login here</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
