import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';
import Sidebar from './Components/Sidebar';
import Navbar from './Components/Navbar';
import API from './api';

function Home() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const res = await API.get('/items');
        setItems(res.data);
        setLoading(false);
      } catch (err) {
        setError(err.message || 'Failed to fetch items. Please check your backend server.');
        setLoading(false);
      }
    };
    fetchItems();
  }, []);

  const totalItems = items.length;
  const totalQuantity = items.reduce((sum, item) => sum + Number(item.quantity), 0);
  const uniqueCategories = [...new Set(items.map(item => item.category).filter(Boolean))];
  const totalCategories = uniqueCategories.length;
  const recentItems = items.slice(-4).reverse();

  const filteredItems = items.filter(item =>
    item.itemName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (item.category && item.category.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  if (loading) return (
    <div className="loading-container">
      <div className="spinner"></div>
      <p>Loading your StockFlow dashboard...</p>
    </div>
  );

  if (error) return <p className="home-page error-msg">Error: {error}</p>;

  return (
    <div className="home-page">
      

      {/* Hero section */}
      <header className="hero">
        <h1>Welcome to StockFlow</h1>
        <p>Your smart companion for tracking, managing, and organizing inventory seamlessly.</p>

        <div className="search-bar">
          <input
            type="text"
            placeholder="🔍 Search by item name or category..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
          {searchTerm && (
            <button className="clear-btn" onClick={() => setSearchTerm('')}>×</button>
          )}
        </div>
      </header>

      {/* Stats */}
      <section className="stats">
        <div className="stat-card">
          <h3>{totalItems}</h3>
          <p>🛒 Items</p>
        </div>
        <div className="stat-card">
          <h3>{totalCategories}</h3>
          <p>📂 Categories</p>
        </div>
        <div className="stat-card">
          <h3>{totalQuantity}</h3>
          <p>📦 In Stock</p>
        </div>
      </section>

      {/* Recent Items */}
      <section className="recent-items">
        <h2>🆕 Recently Added</h2>
        <div className="item-grid">
          {recentItems.length === 0 ? (
            <p>🚀 Start building your inventory by adding your first item!</p>
          ) : (
            recentItems.map(item => (
              <div key={item._id} className="item-card">
                <h3>{item.itemName}</h3>
                <p>Qty: {item.quantity}</p>
                <p>Category: {item.category}</p>
                <p>Price: ₹{item.price}</p>
              </div>
            ))
          )}
        </div>
      </section>

      {/* Filtered Items */}
      <section className="filtered-items">
        <h2>✨ Matching Results ({filteredItems.length})</h2>
        <div className="item-grid">
          {filteredItems.length === 0 ? (
            <p>❌ No items match your search. Try again!</p>
          ) : (
            filteredItems.map(item => (
              <div key={item._id} className="item-card">
                <h3>{item.itemName}</h3>
                <p>Qty: {item.quantity}</p>
                <p>Category: {item.category}</p>
                <p>Price: ₹{item.price}</p>
              </div>
            ))
          )}
        </div>
      </section>

      {/* Quick Actions */}
      <section className="quick-actions">
        <button onClick={() => navigate('/additem')}>➕ Add New Stock</button>
        <button onClick={() => navigate('/items')}>📦 Full Inventory</button>
      </section>

      <footer className="footer">
        <p>StockFlow © 2025 | Smarter Inventory, Seamless Control</p>
      </footer>
    </div>
  );
}

export default Home;
