import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { Link } from 'react-router-dom';
import './signin.css';

const SignIn = () => {
  const navigate = useNavigate(); // Create the navigate function

  const handleLogin = (e) => {
    e.preventDefault(); // Prevent form submission
    // Add login logic here (e.g., form validation or API call)
    navigate('/profile'); // Navigate to the Home page
  };

  return (
    <div className="container">
      <div className="left-section">
        <div className="overlay-text">
          <h1>Please sign in to securely access your account.</h1>
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
          <h2>Sign in to access</h2>
          <h3>your account</h3>
          <form onSubmit={handleLogin}>
            <div className="input-group">
              <label htmlFor="phone">Phone Number</label>
              <input type="text" id="phone" placeholder="Enter your Phone Number" />
            </div>
            <div className="input-group">
              <label htmlFor="password">Password</label>
              <input type="password" id="password" placeholder="Enter your password" />
            </div>
            <div className="options">
              <label>
                <input type="checkbox" /> Remember Password
              </label>
              <a href="/forgot-password" className="forgot-password">Forget Password?</a>
            </div>
            <button type="submit" className="login-button">Login</button>
          </form>
          <div className="signup-link">
            <p>Don't have an account? <Link to="/signup">Create Account</Link></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
