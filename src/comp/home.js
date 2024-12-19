import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { IoIosArrowDropright, IoIosArrowDropleft } from 'react-icons/io';
import { RiShoppingBag4Line } from "react-icons/ri";
import { RiShieldCheckLine } from "react-icons/ri";
import { BiLeaf } from "react-icons/bi";
import { MdLocalShipping } from 'react-icons/md';
import { MdArrowDropDown } from 'react-icons/md';
import { IoIosSearch } from 'react-icons/io';
import { IoBagOutline } from "react-icons/io5";
import { IoPersonOutline } from "react-icons/io5";
import { IoIosArrowDown } from "react-icons/io";
import './home.css';
import Homeproduct from './home_product';
import Categoryproduct from './category_product';
import Featuredproduct from './featured_products';
import '@fortawesome/fontawesome-free/css/all.min.css';


const Home = () => {

  // State for menu visibility
  const [menuOpen, setMenuOpen] = useState(false);

  // Toggle menu visibility
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  // State for New Arrivals
  const [newArrivals, setNewArrivals] = useState(Homeproduct);
  const [currentIndex, setCurrentIndex] = useState(0);

  // State for Categories
  const [categories, setCategories] = useState(Categoryproduct);
  const [categoryIndex, setCategoryIndex] = useState(0);

  // State for Featured Products
  const [featuredProducts, setFeaturedProducts] = useState(Featuredproduct);
  const [featuredIndex, setFeaturedIndex] = useState(0);

  // Handle the next button for New Arrivals
  const handleNextNewArrivals = () => {
    if (currentIndex < newArrivals.length - 4) {
      setCurrentIndex(currentIndex + 4);
    }
  };

  // Handle the previous button for New Arrivals
  const handlePrevNewArrivals = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 4);
    }
  };

  // Handle the next button for Categories
  const handleNextCategory = () => {
    if (categoryIndex < categories.length - 4) {
      setCategoryIndex(categoryIndex + 4);
    }
  };

  // Handle the previous button for Categories
  const handlePrevCategory = () => {
    if (categoryIndex > 0) {
      setCategoryIndex(categoryIndex - 4);
    }
  };

  // Handle the next button for Featured Products
  const handleNextFeatured = () => {
    if (featuredIndex < featuredProducts.length - 12) {
      setFeaturedIndex(featuredIndex + 12);
    }
  };

  // Handle the previous button for Featured Products
  const handlePrevFeatured = () => {
    if (featuredIndex > 0) {
      setFeaturedIndex(featuredIndex - 12);
    }
  };

  return (
    <>
    <div className='header'>
    <div className='top_header'>
        <div className='logo'>
             <img src='image/logo eshops.png' alt='logo'></img>
        </div>

        {/* Menu Button */}
        <div className="menu-container">
      {/* Menu Button */}
      <button className="menu-button" onClick={toggleMenu}>
        <div className="menu-icon">
          <div className="line"></div>
          <div className="line"></div>
          <div className="line"></div>
        </div>
        <span className="menu-text">Menu</span>
      </button>

      {/* Menu Content */}
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
          {/* Input field */}
        <div className='input-container'>
        <div className='all-items'>All items</div>

        <IoIosArrowDown className='arrow-icon' />
        
        <div className='separator'>
            <span className="separator">|</span> {/* Separator */}
            </div>
          <input className='input' type='text' placeholder='Search...'/>
        </div>
        
        <div className="search-menu">
         <IoIosSearch className="search-icon" />
        <span></span> 
            </div>

            <div className='separator'>
            <span className="separator">|</span> {/* Separator */}
            </div>

            <div className="icon-menu">
  {/* Wrap the icon inside the Link component to navigate to /cart */}
  <Link to="/cart" className='link'>
    <IoBagOutline className="bag-icon" />
  </Link>
</div>

            <div className='separator'>
            <span className="separator">|</span> {/* Separator */}
            </div>

            <div className="account-menu">
  {/* Wrap the icon inside the Link component to navigate to /profile or /signin */}
  <Link to="/signin" className="link"> 
    <IoPersonOutline className="account-icon" />
  </Link>
</div>
           

        </div>
    </div>
      <div className="home">
        {/* Top Banner */}
        <div className="top_banner">
          <div className="contact">
            <h3>UP TO 30% OFF TODAY</h3><br></br>
            <h2>Spice Nyanya</h2>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. <br /> Beatae dicta in placeat hic labore.
            </p>
            <Link to="/products" className="link">
              Shop Now
            </Link>
          </div>
        </div>

        {/* New Arrivals */}
        <div className="new-arrivals">
          <h2>New Arrivals</h2>
          <div className="products-carousel">
            {/* Previous Button */}
            <button className="carousel-button prev" onClick={handlePrevNewArrivals}>
              <IoIosArrowDropleft size={30} />
            </button>

            <div className="products">
              {newArrivals.slice(currentIndex, currentIndex + 4).map((product) => (
                <div key={product.id} className="product">
                  <img
                    src={process.env.PUBLIC_URL + '/' + product.image}
                    alt={product.Name}
                    className="product-image"
                  />
                  <h3>{product.Name}</h3>
                  <p>Tsh {product.price}</p>
                  <button className="add-to-cart">Add to Cart</button>
                </div>
              ))}
            </div>

            {/* Next Button */}
            <button className="carousel-button next" onClick={handleNextNewArrivals}>
              <IoIosArrowDropright size={30} />
            </button>
          </div>
        </div>

        {/* Shop by Category */}
        <div className="shop-by-category">
          <h2>Shop by Category</h2>
          <div className="c-products-carousely">
            {/* Previous Button */}
            <button className="c-carousel-button prev" onClick={handlePrevCategory}>
              <IoIosArrowDropleft size={30} />
            </button>

            <div className="c-products">
              {categories.slice(categoryIndex, categoryIndex + 6).map((product) => (
                <div key={product.id} className="c-product">
                  <img
                    src={process.env.PUBLIC_URL + '/' + product.image}
                    alt={product.Name}
                    className="c-product-image"
                  />
                  <h3 className="c-product-name">{product.Name}</h3>
                </div>
              ))}
            </div>

            {/* Next Button */}
            <button className="c-carousel-button next" onClick={handleNextCategory}>
              <IoIosArrowDropright size={30} />
            </button>
          </div>
        </div>

        {/* Featured Products */}
        <div className="featured-products">
          <div className="featured-header">
            <h2>Featured Products</h2>
            <Link to="/featured-products" className="sell-all-button">
              SELL ALL
            </Link>
          </div>
          <div className="featured-products-carousel">
            {/* Previous Button */}
            

            <div className="featured-products-grid">
              {featuredProducts.slice(featuredIndex, featuredIndex + 12).map((product) => (
                <div key={product.id} className="featured-product">
                  <img
                    src={process.env.PUBLIC_URL + '/' + product.image}
                    alt={product.Name}
                    className="featured-product-image"
                  />
                  <h3>{product.Name}</h3>
                  <p>Tsh {product.price}</p>
                  <button className="add-to-cart">Add to Cart</button>
                </div>
              ))}
            </div>

            <hr className="section-divider" />
          
            
          </div>
          <div className='description'>
          <div className="free-delivery-container">
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
        </div>
        
      </div>

    </>
  );
};

export default Home;
