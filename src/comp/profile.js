import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { IoIosArrowForward } from 'react-icons/io';
import { IoIosArrowDown, IoIosSearch } from 'react-icons/io';
import { IoBagOutline, IoPersonOutline } from 'react-icons/io5';
import { RiShoppingBag4Line, RiShieldCheckLine } from 'react-icons/ri';
import { BiLeaf } from 'react-icons/bi';
import './home.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const Profile = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [menuOpen, setMenuOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);  // New state to manage edit view

  // Toggle menu visibility
  const buttonRef = useRef(null); // Define the buttonRef
  const menuRef = useRef(null); // Define the menuRef

  const toggleMenu = () => setMenuOpen(!menuOpen);

  useEffect(() => {
    const handleClickOutside = (event) => {
      // Close the menu if clicked outside the button or menu content
      if (
        menuRef.current && !menuRef.current.contains(event.target) &&
        buttonRef.current && !buttonRef.current.contains(event.target)
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

  // Handle edit logic here
  const handleEditClick = () => {
    setIsEditing(true);  // When Edit is clicked, show the right container for editing
  };

  const [searchTerm, setSearchTerm] = useState("");
    const [filteredProducts, setFilteredProducts] = useState([]);
  
    const products = [
      "Cash Karanga",
      "Asali asili",
      "Candle",
      "Coconut oil",
      "Peanut Butter",
      "Bee Honey",
      "Candles",
      "Food and Beverages",
      "Home Decor",
      "Cosmetics",
      "Spices",
      "Nuts",
      "Cleaning Products",
      "Spice Jiko",
      "Ateke Kahawa",
      "Rice Bag",
      "Swahili Chilli",
      "Olive Oil",
    ];
  
    const handleSearch = (event) => {
      const value = event.target.value;
      setSearchTerm(value);
  
      // Filter products based on search term
      const filtered = products.filter((product) =>
        product.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredProducts(filtered);
    };

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
            <div className="d-flex align-items-center">
              <span className="text-secondary fw-bold me-3 text-nowrap">All items</span>
            </div>
            <IoIosArrowDown className="text-secondary fs-5 me-3" />
            <div className="separator text-muted mx-2">|</div>
            <div>
      {/* Search Input */}
      <input
        type="text"
        className="form-control border-0 bg-transparent"
        placeholder="Search..."
        value={searchTerm}
        onChange={handleSearch}
      />

      {/* Search Results */}
      {searchTerm && (
        <div className="mt-3">
          <h5>Search Results:</h5>
          {filteredProducts.length > 0 ? (
            <ul className="list-group">
              {filteredProducts.map((product, index) => (
                <li className="list-group-item" key={index}>
                  {product}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-muted">No products found.</p>
          )}
        </div>
      )}
    </div>
          </div>

          {/* Search and Account Icons */}
          <div className="col-12 col-md-auto d-flex align-items-center justify-content-center gap-3 mt-3 mt-md-0">
            <div className="search-menu d-flex align-items-center justify-content-center bg-light rounded-circle shadow-sm p-2"
              data-bs-toogle="tooltip"
              data-bs-placement="top"
              title="Search"
            >
              <IoIosSearch className="text-primary fs-4" />
            </div>
            <div className="separator mx-2 text-grey">|</div>
            <div className="icon-menu d-flex align-items-center justify-content-center bg-light rounded-circle shadow-sm p-2"
              data-bs-toogle="tooltip"
              data-bs-placement="top"
              title="My Cart"
            >
              <Link to="/cart" className="text-primary text-decoration-none">
                <IoBagOutline className="fs-4" />
              </Link>
            </div>
            <div className="separator mx-2 text-grey">|</div>
            <div className="account-menu d-flex align-items-center justify-content-center bg-light rounded-circle shadow-sm p-2"
              data-bs-toogle="tooltip"
              data-bs-placement="top"
              title="My Profile"
            >
              <Link to="/signin" className="text-primary text-decoration-none">
                <IoPersonOutline className="fs-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Profile Header */}
      <div className="myprofile text-start mb-4">
        <h2>My Profile</h2>
      </div>

      <div className="container-fluid py-4">
        {/* Profile Page Container */}
        <div className="row">
          {/* Left Container */}
          <div className="col-12 col-md-4 mb-4">
            <div className="square p-3 border rounded">
              <div className="profile-header d-flex align-items-center mb-3">
                <div className="profile-image me-3">
                  <img src="/image/user.png" alt="User" className="img-fluid rounded-circle" />
                </div>
                <div className="profile-info">
                  <h3>John Miller</h3>
                  <p>+255 745 678 90</p>
                </div>
              </div>

              <button className="btn w-100 mb-3 d-flex justify-content-between bg-white hover:bg-[#EFF7FA]" onClick={handleEditClick}>
                <span>Edit Account</span>
                <IoIosArrowForward className="arrow" />
              </button>

              <button className="btn w-100 mb-3 d-flex justify-content-between bg-white hover:bg-[#EFF7FA]">
                <span>Orders</span>
                <IoIosArrowForward className="arrow" />
              </button>
            </div>
          </div>

          {/* Right Container (Only shown when editing) */}
          {isEditing && (
            <div className="col-12 col-md-8">
              <div className="profile-card p-3 border rounded">
                {/* Header Section */}
                <div className="d-flex justify-content-between align-items-center">
                  <span className="fw-bold">Edit Account</span>
                  <button className="btn btn-outline-secondary">
                    <i className="fas fa-pen"></i> Edit
                  </button>
                </div>
                <div className="d-flex align-items-center mb-3">
                  <div className="profile-image me-3">
                    <img
                      src="https://via.placeholder.com/80"
                      alt="User"
                      className="img-fluid rounded-circle user-avatar"
                    />
                  </div>
                  <div className="upload-section">
                    <button
                      className="btn btn-outline-primary"
                      style={{
                        width: '222px',
                        height: '50px',
                        borderRadius: '13px',
                        border: '1px solid #000000',
                        color: '#E7E7E7',
                      }}
                    >
                      Upload Photo (Max 1 Mb)
                    </button>
                  </div>
                </div>

                {/* User Details */}
                <div className="profile-details">
                  <div className="mb-3">
                    <label className="form-label">Name</label>
                    <input className="form-control" type="text" placeholder="John Miller" />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Phone Number</label>
                    <input className="form-control" type="text" placeholder="+255 763 123 456" />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input className="form-control" type="text" placeholder="john@gmail.com" />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Location</label>
                    <input className="form-control" type="text" placeholder="Kijitonyama, Dar Es Salaam" />
                  </div>
                </div>
              </div>
            </div>
          )}
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


export default Profile;
