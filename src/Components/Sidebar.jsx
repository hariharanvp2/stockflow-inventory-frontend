import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = () => {
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem('token');
  const username = localStorage.getItem('username') || "Guest";

  const [collapsed, setCollapsed] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    navigate('/login');
  };

  return (
    <div className={`sidebar ${collapsed ? "collapsed" : ""}`}>
      {/* Toggle Button */}
      <button className="toggle-btn" onClick={() => setCollapsed(!collapsed)}>
        {collapsed ? "☰" : "✖"}
      </button>

      {/* User Profile */}
      <div className="sidebar-profile">
        <div className="avatar">{username.charAt(0).toUpperCase()}</div>
        {!collapsed && <h3>{username}</h3>}
      </div>

      {/* Navigation Links */}
      <nav className="sidebar-nav">
        <Link to="/">🏠 {!collapsed && "Dashboard"}</Link>
        <Link to="/items">📦 {!collapsed && "Inventory"}</Link>
        <Link to="/additem">➕ {!collapsed && "Add Item"}</Link>
      </nav>

      {/* Footer */}
      <div className="sidebar-footer">
        {isLoggedIn ? (
          <button className="sidebar-logout" onClick={handleLogout}>
            🚪 {!collapsed && "Logout"}
          </button>
        ) : (
          <>
            <Link to="/login" className="sidebar-link">🔐 {!collapsed && "Login"}</Link>
            <Link to="/register" className="sidebar-link">📝 {!collapsed && "Register"}</Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
