import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const navigate = useNavigate();
  const [loggedInUsername, setLoggedInUsername] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('username');
    if (token && username) {
      setLoggedInUsername(username);
    } else {
      setLoggedInUsername('');
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    setLoggedInUsername('');
    navigate('/login');
  };

  const isLoggedIn = !!localStorage.getItem('token');

  return (
    <nav className="navbar">
      <div className="navbar-content">
        {/* Left side: Brand */}
        <div className="navbar-left">
          <h2 className="brand">StockFlow</h2>
        </div>

        {/* Center: Welcome + optional search */}
        <div className="navbar-center">
          {isLoggedIn ? (
            <span className="welcome-text">
              👋 Hello! User😊 <strong>{loggedInUsername}</strong>
            </span>
          ) : (
            <span className="welcome-text">Welcome to InventoryPro</span>
          )}
        </div>

        {/* Right side: Actions */}
        <div className="navbar-right">
          {isLoggedIn ? (
            <button className="logout-btn" onClick={handleLogout}>
              🚪 Logout
            </button>
          ) : (
            <div className="auth-links">
              <Link to="/login" className="nav-link">Login</Link>
              <Link to="/register" className="nav-link">Register</Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
