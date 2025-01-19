import React from 'react';
import { Routes, Route } from 'react-router-dom';
import SignIn from './sign-in';
import Home from './home';  // Ensure Home is correctly imported
import Cart from './cart';

const Rout = () => {
  return (
    <Routes>
        <Route path="/" element={<Home />} /> {/* Home should render at '/' */}
        <Route path="/cart" element={<Cart />} />
    </Routes>
  );
};

export default Rout;
