import '../App.css';
import {Route, Routes} from 'react-router-dom';
import {useState} from 'react';
import Signup from './Signup';
import Login from './Login';
import Inventory from './Inventory';
import Wishlist from './Wishlist';
import Browse from './Browse';
import Navbar from './Navbar';

function App() {
  
  return (
    <div className="App">
      <h1>--BRD & GM--</h1>
      <small>Hi Davery :3</small>
      <Navbar/>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/inventory" element={<Inventory />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/browse" element={<Browse />} />
        <Route path="/login" element={<Login />} />
        
          
        
      </Routes>
    </div>
  );
}

export default App;
