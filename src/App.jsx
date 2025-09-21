import React from 'react';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import Register from './userauthentication/Register.jsx';
import Login from './userauthentication/Login.jsx';
import ProtectedRoute from './Components/ProtectedRoutes.jsx'
import Home from './Home.jsx';
import Items from './Items.jsx';
import AddItem from './AddItem.jsx';
import Sidebar from './Components/Sidebar.jsx';
import Navbar from './Components/Navbar.jsx';


function App() {
  return (
    //add BrowserRouter and Routes to handle navigation

    <BrowserRouter>
      
      <Routes>
        
 
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/"
          element={
            <ProtectedRoute>
               <Sidebar/>
    <Navbar/>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/items"
          element={
            <ProtectedRoute>
               <Sidebar/>
    <Navbar/>
              <Items />
            </ProtectedRoute>
          }
        />
        
        <Route
          path="/additem"
          element={
            <ProtectedRoute>
               <Sidebar/>
    <Navbar/>
              <AddItem />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>

  );
}

export default App;