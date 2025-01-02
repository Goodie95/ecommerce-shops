import React, { useState, useRef, useEffect } from 'react'; // Import useRef, useEffect from React
import { Link } from 'react-router-dom';
import { IoIosArrowDown, IoIosSearch } from 'react-icons/io';
import { IoBagOutline, IoPersonOutline } from 'react-icons/io5';
import { RiShoppingBag4Line, RiShieldCheckLine } from 'react-icons/ri';
import { BiLeaf } from 'react-icons/bi';
import Featuredproduct from './featured_products';
import 'bootstrap/dist/css/bootstrap.min.css';

const Sidebar = ({ onFilter, activeCategory, setActiveCategory }) => {
  const [priceRange, setPriceRange] = useState({ min: '', max: '' });

  const handleFilter = () => {
    if (onFilter) onFilter(priceRange);
  };

  const categories = ["All", "Food", "Cosmetics", "Cleaning Products", "Nuts", "Spices", "Handmade"];

  return (
    <aside className="sidebar">
      <div className="categories-container">
        <h3 className="categories-title">Categories</h3>
        <ul className="categories-list">
          {categories.map((category) => (
            <li
              key={category}
              className={`category-item ${activeCategory === category ? 'active-category' : ''}`}
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </li>
          ))}
        </ul>
      </div>

      <div className="sidebar-section price-section">
        <h3>Price</h3>
        <div className="price-filter">
          <label>Lowest</label>
          <input
            type="number"
            placeholder="Lowest price"
            value={priceRange.min}
            onChange={(e) => setPriceRange({ ...priceRange, min: e.target.value })}
          />
          <label>Highest</label>
          <input
            type="number"
            placeholder="Highest price"
            value={priceRange.max}
            onChange={(e) => setPriceRange({ ...priceRange, max: e.target.value })}
          />
          <button className="apply-button" onClick={handleFilter}>
            Apply
          </button>
        </div>
      </div>
    </aside>
  );
};

const Products = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [menuOpen, setMenuOpen] = useState(false);
  const [filteredPrice, setFilteredPrice] = useState({});
  
  const buttonRef = useRef(null); // Define the buttonRef
  const menuRef = useRef(null); // Define the menuRef

  const toggleMenu = () => setMenuOpen(!menuOpen);

  const handleFilter = (priceRange) => {
    console.log('Price Range:', priceRange);
    setFilteredPrice(priceRange);
  };

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
                    <li><Link to="/subscriptionPlans" className="text-dark text-decoration-none">Subscription Plans</Link></li>
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

      <div className="main-container">
        <Sidebar onFilter={handleFilter} activeCategory={activeCategory} setActiveCategory={setActiveCategory} />

        <div className="products-container">
          <div className="products-header">
            <h2>Products</h2>
            <button className="sort-button">Sort By <IoIosArrowDown className="arrow-icon" /></button>
          </div>

          <div className="filter-output">
            {filteredPrice.min && filteredPrice.max && (
              <p>Showing products between Tsh {filteredPrice.min} and Tsh {filteredPrice.max}</p>
            )}
          </div>

          <div className="p-featured-products" style={{marginBottom: '50px'}}>
            <div className="p-featured-products-grid">
              {Featuredproduct.map((product) => (
                <div key={product.id} className="p-featured-product">
                  <img
                    src={process.env.PUBLIC_URL + '/' + product.image}
                    alt={product.Name}
                    className="p-featured-product-image"
                  />
                  <h3>{product.Name}</h3>
                  <p>Tsh {product.price}</p>
                  <button className="add-to-cart">Add to Cart</button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className='description'>
                <div className="free-delivery-container" style={{marginBottom: '20px', marginTop: '20px'}}>
                <RiShoppingBag4Line size={50} className="delivery-icon" />
                <p className="free-delivery-text">Free Delivery</p>
                <p className="free-delivery-text-1">Lorem ipsum dolor sit amet <br />consectetur adipisicing elit amesevuda.</p>
                </div>
      
                 {/* Separator */}
                  <span className="separator-1">|</span>
      
                <div className="secure-payments-container">
                <RiShieldCheckLine size={50} className="secure-icon" />
                <p className="secure-payments-text">Secure Payments</p>
                <p className="secure-payments-text-1">Lorem ipsum dolor sit amet <br />consectetur adipisicing elit amesevuda.</p>
                </div>
      
                     {/* Separator */}
                 <span className="separator-1">|</span>
      
                <div className="quality-container">
                <BiLeaf size={50} className="quality-icon" />
                <p className="quality-text">Best Quality Material</p>
                <p className="quality-text-1">Lorem ipsum dolor sit amet <br />consectetur adipisicing elit amesevuda.</p>
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

export default Products;