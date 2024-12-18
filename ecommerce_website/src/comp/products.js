import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { IoIosArrowDown, IoIosSearch } from 'react-icons/io';
import { IoBagOutline, IoPersonOutline } from 'react-icons/io5';
import { RiShoppingBag4Line, RiShieldCheckLine } from 'react-icons/ri';
import { BiLeaf } from 'react-icons/bi';
import './home.css';
import Featuredproduct from './featured_products';

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

  const toggleMenu = () => setMenuOpen(!menuOpen);

  const handleFilter = (priceRange) => {
    console.log('Price Range:', priceRange);
    setFilteredPrice(priceRange);
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
            <Link to="/signin" className="link"> 
              <IoPersonOutline className="account-icon" />
            </Link>
          </div>
        </div>
      </div>

      <div className="main-container">
        <Sidebar onFilter={handleFilter} activeCategory={activeCategory} setActiveCategory={setActiveCategory} />

        <div className="products-container">
          <div className="products-header">
            <h2>Products</h2>
            <button className="sort-button">Sort By  <IoIosArrowDown className='arrow-icon' /></button>
            
          </div>

          <div className="filter-output">
            {filteredPrice.min && filteredPrice.max && (
              <p>Showing products between Tsh {filteredPrice.min} and Tsh {filteredPrice.max}</p>
            )}
          </div>

          <div className="p-featured-products">
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
        <p>Footer Content Goes Here</p>
      </div>
    </>
  );
};

export default Products;
