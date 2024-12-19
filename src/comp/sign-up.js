import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { Link } from 'react-router-dom';
import './signup.css';

const SignUp = () => {
  const navigate = useNavigate(); // Create the navigate function

  const handleLogin = (e) => {
    e.preventDefault(); // Prevent form submission
    // Add login logic here (e.g., form validation or API call)
    navigate('./Home'); // Navigate to the Home page
  };

  return (
    <div className="container">
      <div className="left-section">
        <div className="overlay-text">
          <h1>Please sign Up to securely access your account.</h1>
          <p>
            Welcome back! We're thrilled to have you return to our platform. Your presence means a lot to us.
          </p>
          
        </div>
      </div>
      <div className="right-section">
        <div className="form-container">
        <div className='logo'>
             <img src='image/logo eshops.png' alt='logo'></img>
        </div>
          <h2>Sign Up to access</h2>
          <h3>your account</h3>
          <form onSubmit={handleLogin}>
            <div className="input-group">
              <label htmlFor="phone">Full Name</label>
              <input type="text" id="phone" placeholder="Enter your Full Name" />
            </div>
            <div className="input-group">
              <label htmlFor="phone">Phone Number</label>
              <input type="text" id="phone" placeholder="Enter your Phone Number" />
            </div>
            <div className="input-group">
              <label htmlFor="password">Password</label>
              <input type="password" id="password" placeholder="Enter your password" />
            </div>
            <div className='group'>
            <div className="options">
              <label>
                <input type="checkbox" /> Remember Password
              </label>
            </div>
            <div className="signin-link">
            <p>Already have an account? <Link to="/signin">Login</Link></p>
          </div>
          </div>
            <button type="submit" className="login-button">Create Account</button>
          </form>
          
        </div>
      </div>
    </div>
  );
};

export default SignUp;
