import React from 'react';
import { Routes, Route } from 'react-router-dom';
import SignIn from './sign-in';
import Home from './home';  // Ensure Home is correctly imported

const Rout = () => {
  return (
    <Routes>
        <Route path="/" element={<Home />} /> {/* Home should render at '/' */}
    </Routes>
  );
};

export default Rout;
