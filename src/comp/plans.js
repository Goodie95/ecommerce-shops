import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { IoIosArrowDropright, IoIosArrowDropleft } from 'react-icons/io';
import { IoIosSearch } from 'react-icons/io';
import { IoBagOutline } from "react-icons/io5";
import { IoPersonOutline } from "react-icons/io5";
import { IoIosArrowDown } from "react-icons/io";
import { RiShoppingBag4Line, RiShieldCheckLine } from 'react-icons/ri';
import { BiLeaf } from 'react-icons/bi';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './SubscriptionPlans.css';

const Plans = () => {
  // State for menu visibility
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null); // Ref for the menu content
  const buttonRef = useRef(null); // Ref for the button

  // Toggle menu visibility
  const toggleMenu = () => {
    setMenuOpen((prevMenuOpen) => !prevMenuOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      // Close the menu if clicked outside the button or menu content
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target)
      ) {
        setMenuOpen(false);
      }
    };

    // Add event listener
    document.addEventListener('mousedown', handleClickOutside);

    // Cleanup event listener on component unmount
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <>
      {/* Header Section */}
      <div className="container-fluid">
        <div className="row bg-white align-items-center py-3 px-4">
          {/* Logo */}
          <div className="col-12 col-md-auto mb-3 mb-md-0">
            <div className="logo">
              <img
                src="image/logo eshops.png"
                alt="logo"
                className="img-fluid"
                style={{ maxWidth: '155px', height: 'auto', margin: '0px' }}
              />
            </div>
          </div>

          {/* Menu */}
          <div className="col-12 col-md-auto d-flex justify-content-center mb-3 mb-md-0">
            <div className="menu-container d-flex align-items-center px-3 py-2 bg-light rounded gap-2">
              <button
                ref={buttonRef} // Button ref to detect clicks
                className="menu-button btn d-flex align-items-center gap-2"
                onClick={toggleMenu} // Toggle the menu when clicked
              >
                <div className="menu-icon d-flex flex-column gap-1">
                  <div className="line bg-primary" style={{ height: '3px', width: '20px' }}></div>
                  <div className="line bg-primary" style={{ height: '3px', width: '20px' }}></div>
                  <div className="line bg-primary" style={{ height: '3px', width: '20px' }}></div>
                </div>
                <span className="text-primary fw-bold">Menu</span>
              </button>
              {menuOpen && (
                <div ref={menuRef} className="menu-content bg-light rounded shadow p-3 position-absolute mt-5">
                  <ul className="list-unstyled mb-0">
                    <li><Link to="/home" className="text-dark text-decoration-none">Home</Link></li>
                    <li><Link to="/about" className="text-dark text-decoration-none">About</Link></li>
                    <li><Link to="/services" className="text-dark text-decoration-none">Services</Link></li>
                    <li><Link to="/account" className="text-dark text-decoration-none">Account</Link></li>
                    <li><Link to="/plans" className="text-dark text-decoration-none">Subscription Plans</Link></li>
                  </ul>
                </div>
              )}
            </div>
          </div>

          {/* Search Input */}
          <div className="col-12 col-lg d-flex align-items-center bg-light rounded-pill px-3 py-2 flex-grow-1">
            <span className="text-secondary fw-bold me-3">All items</span>
            <IoIosArrowDown className="text-secondary fs-5 me-3" />
            <div className="separator text-muted mx-2">|</div>
            <input
              type="text"
              className="form-control border-0 bg-transparent"
              placeholder="Search..."
            />
          </div>

          {/* Search and Account Icons */}
          <div className="col-12 col-md-auto d-flex align-items-center justify-content-center gap-3 mt-3 mt-md-0">
            <div className="search-menu d-flex align-items-center justify-content-center bg-light rounded-circle shadow-sm p-2">
              <IoIosSearch className="text-primary fs-4" />
            </div>
            <div className="icon-menu d-flex align-items-center justify-content-center bg-light rounded-circle shadow-sm p-2">
              <Link to="/cart" className="text-primary text-decoration-none">
                <IoBagOutline className="fs-4" />
              </Link>
            </div>
            <div className="account-menu d-flex align-items-center justify-content-center bg-light rounded-circle shadow-sm p-2">
              <Link to="/signin" className="text-primary text-decoration-none">
                <IoPersonOutline className="fs-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="home">
        {/* Top Banner */}
        <div
  className="top_banner d-flex align-items-center justify-content-center text-center text-white"
  style={{
    background: " url('image/plans.png') center/cover no-repeat",
    height: "100vh", // Set to viewport height for responsiveness
    width: "100%",   // Make it full-width
    top: "0",        // Align at the top
    opacity: "67%",
    mixBlendMode: "multiply"
  }}
>
<div className="content-wrapper d-flex flex-column align-items-center justify-content-center">
  <h3
    className="text-white fw-bold mb-3"
    style={{
      color: 'white',
      marginLeft: '180px',
      fontFamily: 'Inter, sans-serif',
      fontWeight: 700,
      fontSize: '72px',
      lineHeight: '86.4px',
      letterSpacing: '-3px',
      textAlign: 'center',
      fontStyle: 'normal', // Ensures the text is not italic
    }}
  >
    Join E-shop As a Vendor
  </h3>
  <p className="mb-4 text-center">
  Expand your reach and grow your business by listing your products on E-Shop. Enjoy a <br /> seamless experience with our robust platform designed to help local manufacturers succeed.  </p>
</div>
</div>
      </div>

      <div className="d-flex justify-content-center">
  <h2 className="text-center mb-5">Subscription Plans</h2>
</div>
      <div className="row g-4">
        {/* Basic Plan */}
        <div className="col-12 col-md-6 col-lg-4">
          <div className="card plan-card h-100 border-0 shadow-sm">
            <div className="card-body text-center">
              <h5 className="card-title">Basic</h5>
              <p className="card-text text-muted">
                Lorem Ipsum is simply dummy text of the <br /> printing and typesetting industry.
              </p>
              <h3 className="fw-bold">Tsh 1000<span className="fs-6">/mo</span></h3>
              <hr />
              <ul className="list-unstyled">
                <li className="text-success">&#10003; List up to 50 products</li>
                <li className="text-success">&#10003; Advanced Statistics</li>
                <li className="text-success">&#10003; Basic Support</li>
                <li className="text-success">&#10003; Access to vendor dashboard</li>
                <li className="text-muted">&#10007; Advanced analytics reporting</li>
                <li className="text-muted">&#10007; Featured vendor placement</li>
              </ul>
              <button className="btn btn-outline-primary mt-3">Choose Plan</button>
            </div>
          </div>
        </div>

        {/* Standard Plan */}
        <div className="col-12 col-md-6 col-lg-4">
          <div className="card plan-card h-100 border-0 shadow-sm highlight">
            <div className="card-body text-center">
              <div className="badge bg-warning text-dark mb-2">Best Offer</div>
              <h5 className="card-title">Standard</h5>
              <p className="card-text text-muted">
                Lorem Ipsum is simply dummy text of the printing and typesetting industry.
              </p>
              <h3 className="fw-bold text-primary">Tsh 6000<span className="fs-6">/mo</span></h3>
              <hr />
              <ul className="list-unstyled">
                <li className="text-success">&#10003; List up to 200 products</li>
                <li className="text-success">&#10003; Advanced Statistics</li>
                <li className="text-success">&#10003; Priority Support</li>
                <li className="text-success">&#10003; Access to vendor dashboard</li>
                <li className="text-success">&#10003; Lorem ipsum dolor sit amet</li>
                <li className="text-success">&#10003; Lorem ipsum dolor sit amet</li>
              </ul>
              <button className="btn btn-outline-primary mt-3">Choose Plan</button>
            </div>
          </div>
        </div>

        {/* Premium Plan */}
        <div className="col-12 col-md-6 col-lg-4">
          <div className="card plan-card h-100 border-0 shadow-sm">
            <div className="card-body text-center">
              <h5 className="card-title">Premium</h5>
              <p className="card-text text-muted">
                Lorem Ipsum is simply dummy text of the printing and typesetting industry.
              </p>
              <h3 className="fw-bold">Tsh 2100<span className="fs-6">/mo</span></h3>
              <hr />
              <ul className="list-unstyled">
                <li className="text-success">&#10003; Unlimited product listings</li>
                <li className="text-success">&#10003; Dedicated account manager</li>
                <li className="text-success">&#10003; Access to vendor dashboard</li>
                <li className="text-success">&#10003; Advanced analytics</li>
                <li className="text-success">&#10003; Featured vendor placement</li>
                <li className="text-success">&#10003; Directory Listing</li>
              </ul>
              <button className="btn btn-outline-primary mt-3">Choose Plan</button>
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
      
            <footer className="footer">
                  <div className="footer-content">
                    {/* Left Section */}
                    <div className="footer-left">
                    <div className='footer-logo'>
                         <img src='image/logo eshops.png' alt='footer-logo'></img>
                    </div>
                      
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

    </>
  );
};

export default Plans;
