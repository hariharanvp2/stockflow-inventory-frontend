import React, { useState } from 'react';
import API from './api';
import './AddItem.css';
import Sidebar from './Components/Sidebar';
import Navbar from './Components/Navbar';
import sampleItems from './SampleItem';

const AddItem = () => {
  const [form, setForm] = useState({ itemName: '', quantity: '', price: '', description: '', category: '' });
  const [message, setMessage] = useState('');

  const addItem = async (e) => {
    e.preventDefault();
    try {
      await API.post('/items', form);
      setForm({ itemName: '', quantity: '', price: '', description: '', category: '' });
      setMessage('✅ Added to StockFlow successfully!');
    } catch (err) {
      console.error('Error adding item:', err.response?.data || err.message);
      setMessage('❌ Could not add item. Please try again.');
    }
  };

  return (
    <div className="add-item-wrapper">
      

      <div className="add-item-container">
        {/* Left gradient panel */}
        <div className="add-item-info">
          <h1>📝 Create New Entry</h1>
          <p>Add fresh stock to your warehouse and keep your records updated effortlessly.</p>
        </div>

        {/* Right form section */}
        <div className="add-item-form-section">
          <form onSubmit={addItem} className="add-item-form">
            <input
              type="text"
              placeholder="Product Name"
              value={form.itemName}
              onChange={e => setForm({ ...form, itemName: e.target.value })}
              required
            />
            <input
              type="number"
              placeholder="Available Units"
              value={form.quantity}
              onChange={e => setForm({ ...form, quantity: e.target.value })}
              required
            />
            <input
              type="number"
              placeholder="Unit Price (₹)"
              value={form.price}
              onChange={e => setForm({ ...form, price: e.target.value })}
              required
            />
            <input
              type="text"
              placeholder="Category (e.g., Electronics, Stationery)"
              value={form.category}
              onChange={e => setForm({ ...form, category: e.target.value })}
            />
            <textarea
              placeholder="Additional Notes (optional)"
              value={form.description}
              onChange={e => setForm({ ...form, description: e.target.value })}
            />

            <button type="submit" className="submit-btn">💾 Save to StockFlow</button>
          </form>
          {message && <p className="form-message">{message}</p>}
        </div>
      </div>

      {/* Reference products section */}
      <div className="sample-section">
        <h2>📌 Reference Products</h2>
        {sampleItems.length > 0 ? (
          <ul className="sample-list">
            {sampleItems.map(item => (
              <li key={item._id} className="sample-card">
                <div className="sample-header">
                  <h3>{item.itemName}</h3>
                  <span className="sample-category">{item.category || 'Misc'}</span>
                </div>
                <p>Available: {item.quantity}</p>
                <p>Price per unit: ₹{item.price}</p>
                {item.description && <p className="sample-desc">{item.description}</p>}
              </li>
            ))}
          </ul>
        ) : (
          <p>No reference products to show yet.</p>
        )}
      </div>
    </div>
  );
};

export default AddItem;
