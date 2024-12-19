import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { IoIosArrowDown, IoIosSearch } from 'react-icons/io';
import { IoBagOutline, IoPersonOutline } from 'react-icons/io5';
import { RiShoppingBag4Line, RiShieldCheckLine } from 'react-icons/ri';
import { BiLeaf } from 'react-icons/bi';
import './home.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

const Profile = () => {
    const [menuOpen, setMenuOpen] = useState(false);
        
          // Toggle menu visibility
          const toggleMenu = () => {
            setMenuOpen(!menuOpen);
          };
    
    const [name, setName] = useState('John Miller');
    const [phoneNumber, setPhoneNumber] = useState('+255 763 123 456');
    const [email, setEmail] = useState('john@gmail.com');
    const [location, setLocation] = useState('Kijitonyama, Dar es Salaam');
  
    const handleEdit = () => {
      // Handle edit logic here
      console.log('Edit clicked');
      
    };



  return (
    <>
      <div className="header">
        <div className="top_header">
          <div className="logo">
            <img src="image/logo eshops.png" alt="logo" />
          </div>

          <div className="menu-container">
            <button className="menu-button" onClick={toggleMenu}>
              <div className="menu-icon">
                <div className="line"></div>
                <div className="line"></div>
                <div className="line"></div>
              </div>
              <span className="menu-text">Menu</span>
            </button>
            {menuOpen && (
              <div className="menu-content">
                <ul>
                  <li><Link to="/home">Home</Link></li>
                  <li><Link>About</Link></li>
                  <li><Link>Services</Link></li> 
                   <li><Link>Account</Link></li>
                   <li><Link>SubscriptionPlans</Link></li>
                </ul>
              </div>
            )}
          </div>

          <div className="input-container">
            <div className="all-items">All items</div>
            <IoIosArrowDown className="arrow-icon" />
            <div className="separator">|</div>
            <input className="input" type="text" placeholder="Search..." />
          </div>

          <div className="search-menu">
            <IoIosSearch className="search-icon" />
          </div>
          
          
          <div className="separator">|</div>
          <div className="icon-menu">
            {/* Wrap the icon inside the Link component to navigate to /cart */}
            <Link to="/cart" className='link'>
              <IoBagOutline className="bag-icon" />
            </Link>
          </div>
          
          <div className="separator">|</div>
          <div className="account-menu">
            {/* Wrap the icon inside the Link component to navigate to /profile or /signin */}
            <Link to="/profile" className="link"> 
              <IoPersonOutline className="account-icon" />
            </Link>
          </div>
        </div>
      </div>

      <div className='myprofile'>
      <h2>My Profile</h2>
      </div>
      <div className="profile-page-container">
      {/* Left Container */}
      {/*<div className="profile-left">*/}
      <div className="square">
      <div className="profile-header">
        <div className="profile-image">
          {/* Add your image here */}
          <img src="/image/user.png" alt="User" />
        </div>
        <div className="profile-info">
          <h3>John Miller</h3>
          <p>+255 745 678 90</p>
        </div>
      </div>

      <button className="edit-account-button">
      Edit Account <span className="arrow"></span>
    </button>

      <div className="profile-section">
        <h3>Orders</h3>
        {/* Add your orders component here */}
      </div>
    </div>
    {/*</div>*/}
    

    <div className="profile-right">
     <div className="profile-card">
      {/* Header Section */}
      <div className="profile-header">
        <div className="profile-image">
          <img
            src="https://via.placeholder.com/80"
            alt="User"
            className="user-avatar"
          />
        </div>
        <button className="p-edit-button">
          <i className="fas fa-pen"></i> Edit
        </button>
      </div>

      {/* Upload Photo */}
      <div className="upload-section">
        <button className="upload-button">Upload Photo (Max 1 Mb)</button>
      </div>

      {/* User Details */}
      <div className="profile-details">
        <div className="input-field">
          <label>Name</label>
          <input className="input" type="text" placeholder="John Miller" />
          </div>

        <div className="input-field">
          <label>Phone Number</label>
          <input className="input" type="text"  placeholder="+255 763 123 456" />
        </div>

        <div className="input-field">
          <label>Email</label>
          <input className="input" type="text" placeholder="john@gmail.com"/>
        </div>

        <div className="input-field">
          <label>Location</label>
          <input className="input" type="text" placeholder="Kijitonyama, Dar Es Salaam" />
        </div>
      </div>
      </div>
    </div> 
    </div> 
    
      
      

      <div className="description">
        <div className="free-delivery-container">
          <RiShoppingBag4Line size={50} className="delivery-icon" />
          <p className="free-delivery-text">Free Delivery</p>
          <p className="free-delivery-text-1">Lorem ipsum dolor sit amet<br />consectetur adipisicing elit.</p>
        </div>
        <span className="separator-1">|</span>
        <div className="secure-payments-container">
          <RiShieldCheckLine size={50} className="secure-icon" />
          <p className="secure-payments-text">Secure Payments</p>
          <p className="secure-payments-text-1">Lorem ipsum dolor sit amet<br />consectetur adipisicing elit.</p>
        </div>
        <span className="separator-1">|</span>
        <div className="quality-container">
          <BiLeaf size={50} className="quality-icon" />
          <p className="quality-text">Best Quality Material</p>
          <p className="quality-text-1">Lorem ipsum dolor sit amet<br />consectetur adipisicing elit.</p>
        </div>
      </div>

      <div className="footer-container">
      <footer className="footer">
      <div className="footer-content">
        {/* Left Section */}
        <div className="footer-left">
        <div className='footer-logo'>
             <img src='image/logo eshops.png' alt='footer-logo'></img>
        </div>
          <p className="footer-tagline">"Your Online & Offline Partner"</p>
          <p className="footer-description">
            Lorem ipsum dolor sit amet consectetur. Augue quis urna tristique posuere. Ut a a cras vel v
          </p>
          <div className="footer-social-icons">
            <div className="icon-circle">
              <i className="fab fa-linkedin-in"></i>
            </div>
            <div className="icon-circle">
              <i className="fab fa-instagram"></i>
            </div>
            <div className="icon-circle">
              <i className="fab fa-facebook-f"></i>
            </div>
          </div>
        </div>

        {/* Center Sections */}
        <div className="footer-links">
          <h3>Shop</h3>
          <ul>
            <li>Food</li>
            <li>Beverages</li>
            <li>Cosmetics</li>
            <li>Home Decor</li>
          </ul>
        </div>

        <div className="footer-links">
          <h3>Help & Information</h3>
          <ul>
            <li>How to order</li>
            <li>Terms & Condition</li>
            <li>Help center</li>
            <li>Term of Use</li>
          </ul>
        </div>

        {/* Right Section */}
        <div className="footer-links">
          <h3>My Account</h3>
          <ul>
            <li>My Orders</li>
            <li>Favourites</li>
            <li>Lorem ipsum</li>
            <li>Lorem ipsum</li>
          </ul>
        </div>
      </div>

      <hr className="footer-divider" />
      <div className="footer-copyright">
        <p>© Eshops 2024 Copyright</p>
      </div>
    </footer>
      </div>
    </>
  );
};


export default Profile;
