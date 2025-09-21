📊 StockFlow – Inventory Manager
A full-stack web app to manage your stock efficiently. Built with React (Vite), Node.js, Express, and MongoDB, StockFlow helps you add, edit, and track products with ease.

✨ Features

  🔑 User authentication (login & signup) 
  ➕ Add, ✏️ update, ❌ delete products
  🔍 Search & filter by name or category
  📈 Dashboard with live statistics
  🆕 Recently added products section
  ☁ Hosted on Render (backend + frontend)

🛠 Tech Stack
  Frontend: React (Vite), React Router, Custom CSS
  Backend: Node.js, Express.js, JWT Auth
  Database: MongoDB (Mongoose)
  Deployment: Render

⚡Setup

Clone the repo
git clone https://github.com/hariharanvp2/stockflow-inventory-frontend
cd stockflow-inventory


Backend

cd backend
npm install
touch .env   # add MONGO_URI, JWT_SECRET
npm start


Frontend

cd ../frontend
npm install
npm run dev    # dev mode
npm run build  # production build

🔗 API Overview

Auth

POST /api/auth/signup → register

POST /api/auth/login → login

Products

GET /items → fetch all

GET /items/:id → fetch one

POST /items → add new

PUT /items/:id → update

DELETE /items/:id → delete

🚀 How to Use

Sign up or log in

View product stats on the dashboard

Add new stock with “Add Product”

Use search bar to filter quickly

Manage all stock in “Inventory”

🙌 Credits

Render → hosting

MongoDB Atlas → database

React + Express → app backbone

