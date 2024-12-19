import React from 'react';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import SignIn from './comp/sign-in';
import SignUp from './comp/sign-up';
import Home from './comp/home';
import Products from './comp/products';
import Cart from './comp/cart';
import Profile from './comp/profile';

function App() {
  return (
    <Router>
      <Routes>
        {/* Default route for root path */}
        <Route path="/" element={<Home />} />
        
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/home" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/profile" element={<Profile />} />

    
      </Routes>
    </Router>
  );
}

export default App;
