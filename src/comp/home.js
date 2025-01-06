import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { IoIosArrowDropright, IoIosArrowDropleft } from 'react-icons/io';
import { RiShoppingBag4Line } from "react-icons/ri";
import { RiShieldCheckLine } from "react-icons/ri";
import { BiLeaf } from "react-icons/bi";
import { IoIosSearch } from 'react-icons/io';
import { IoBagOutline } from "react-icons/io5";
import { IoPersonOutline } from "react-icons/io5";
import { IoIosArrowDown } from "react-icons/io";
import Homeproduct from './home_product';
import Categoryproduct from './category_product';
import Featuredproduct from './featured_products';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap/dist/css/bootstrap.min.css'; 
import './category.css';
   


const Home = () => {

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
   
  // State for New Arrivals
  const [newArrivals] = useState(Homeproduct);
  const [currentIndex, setCurrentIndex] = useState(0);

  // State for Categories
  const [categories] = useState(Categoryproduct);
  const [categoryIndex, setCategoryIndex] = useState(0);

  // State for Featured Products
  const [featuredProducts] = useState(Featuredproduct);
  const [featuredIndex, setFeaturedIndex] = useState(0);

  // Handle the next button for New Arrivals
  const handleNextNewArrivals = () => {
    if (currentIndex < newArrivals.length - 4) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  // Handle the previous button for New Arrivals
  const handlePrevNewArrivals = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
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
    if (featuredIndex < featuredProducts.length - 12) {
      setFeaturedIndex(featuredIndex + 12); 
  };

  // Handle the previous button for Featured Products
    if (featuredIndex > 0) {
      setFeaturedIndex(featuredIndex - 12);
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
                style={{ maxWidth: '155px', height: 'auto', margin: '0px'}}
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
            <input
              type="text"
              className="form-control border-0 bg-transparent"
              placeholder="Search..."
            />
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
                      <div className="separator  mx-2 text-grey">|</div>
                      <div className="icon-menu d-flex align-items-center justify-content-center bg-light rounded-circle shadow-sm p-2"
                                  data-bs-toogle="tooltip"
                                  data-bs-placement="top"
                                  title="My Cart"
                                  >
                        <Link to="/cart" className="text-primary text-decoration-none">
                          <IoBagOutline className="fs-4" />
                        </Link>
                      </div>
                      <div className="separator  mx-2 text-grey">|</div>
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
    
  <div className="home">
  {/* Top Banner */}
  <div
    className="top_banner d-flex align-items-center justify-content-center text-center text-white"
    style={{
      background: "linear-gradient(0deg, #D9D9D9 0%, #040E1F 100%), url('image/cover1.png')) center/cover no-repeat",
      height: "500px",
    }}
  >
    
  <div className="contact w-100 d-flex flex-column justify-content-center align-items-start" style={{ position: "relative", paddingLeft: "20px", paddingTop: "20px" }}>
    <h3 className="text-uppercase text-warning fw-light mb-2" style={{paddingTop: "10px",marginBottom: "250px" }}>
      Up to 30% off today
    </h3>
    <h2 className="text-uppercase fw-bold fs-1" style={{paddingTop: "20px", }}>
      Spice Nyanya
    </h2>
    <p className="mb-4">
  Lorem ipsum dolor sit amet consectetur adipisicing elit.Beatae dicta in placeat hic labore.
</p>
    <Link to="/products" className="btn btn-warning fw-bold px-4 py-2">
      Shop Now
    </Link>
  

    </div>
  </div>

  
{/* New Arrivals Section */}
<div className="new-arrivals mt-4 ms-3">
  <h2>New Arrivals</h2>
  <div className="products-carousel d-flex flex-wrap justify-content-start position-relative">
    {/* Previous Button (Hidden on Mobile) */}
    <button
      className="carousel-button prev position-absolute top-50 start-0 translate-middle-y bg-warning text-white border-0 rounded-circle p-2 d-none d-md-block"
      onClick={handlePrevNewArrivals}
    >
      <IoIosArrowDropleft size={30} />
    </button>

    {/* Products Container */}
    <div className="products row gx-3 w-100">
      {newArrivals.slice(currentIndex, currentIndex + 4).map((product) => (
        <div
          key={product.id}
          className="product col-12 col-sm-6 col-md-3 d-flex flex-column align-items-center"
        >
          <img
            src={process.env.PUBLIC_URL + '/' + product.image}
            alt={product.Name}
            className="product-image img-fluid mb-2"
            style={{
              border: 'none',
              boxShadow: 'none',
              marginTop: '20px',
              overflow: 'hidden',
              textAlign: 'center',
              transition: 'transform .3s ease-in-out',
              width: '200px',
              height: '200px',
              objectFit: 'cover',
            }}
          />
          <h3>{product.Name}</h3>
          <p>Tsh {product.price}</p>
          <button className="add-to-cart btn btn-primary w-100">Add to Cart</button>
        </div>
      ))}
    </div>

    {/* Next Button (Hidden on Mobile) */}
    <button
      className="carousel-button next position-absolute top-50 end-0 translate-middle-y bg-warning text-white border-0 rounded-circle p-2 d-none d-md-block"
      onClick={handleNextNewArrivals}
    >
      <IoIosArrowDropright size={30} />
    </button>
  </div>
</div>


{/* Shop by Category */}
<div className="shop-by-category container-fluid py-5">
  <h2 className="text-center mb-4">Shop by Category</h2>

  <div className="d-flex align-items-center position-relative">
    {/* Previous Button */}
    <button
      className="btn btn-outline-warning position-absolute start-0 top-50 translate-middle-y d-none d-md-inline"
      onClick={handlePrevCategory}
      style={{ zIndex: 5 }}  
    >
      <IoIosArrowDropleft size={30} />
    </button>

    {/* Products Grid */}
    <div className="row g-2 mx-0">
      {categories.slice(categoryIndex, categoryIndex + 6).map((product) => (
        <div key={product.id} className="col-6 col-sm-4 col-md-2 d-flex flex-column align-items-center">
          <div className="c-product d-flex flex-column align-items-center mx-1">
            <img
              src={process.env.PUBLIC_URL + "/" + product.image}
              alt={product.Name}
              className="c-product-image img-fluid"
              style={{
                objectFit: 'cover',
                width: '172.28px',    // Fixed width
                height: '172px',      // Fixed height
              }}
            />
            <h3 className="c-product-name text-center mt-3">{product.Name}</h3>
          </div>
        </div>
      ))}
    </div>

    {/* Next Button */}
    <button
      className="btn btn-outline-warning position-absolute end-0 top-50 translate-middle-y d-none d-md-inline"
      onClick={handleNextCategory}
      style={{ zIndex: 5 }}  
    >
      <IoIosArrowDropright size={30} />
    </button>
  </div>
</div>





       {/* Featured Products */}
<div className="featured-products container mt-5" style={{marginBottom: '20px'}}>
  <div className="row align-items-center mb-3" >
  <div className="col">
    <h2>Featured Products</h2>
  </div>
  <div className="col text-end">
    <Link to="/featured-products" className="btn btn-outline-danger">
      SELL ALL
    </Link>
  
    </div>
    
  

  <div className="row g-4">
    {featuredProducts.slice(featuredIndex, featuredIndex + 12).map((product) => (
      <div key={product.id} className="col-12 col-sm-6 col-md-4 col-lg-3">
        <div className="card border-0 shadow-sm h-100 text-center">
          <div
            className="card-img-container"
            style={{
              height: '250px', // Fixed height for the image container
              overflow: 'hidden', // Ensure images stay within the container
              borderRadius: '8px',
            }}
          >
            <img
              src={process.env.PUBLIC_URL + '/' + product.image}
              alt={product.Name}
              className="card-img-top w-100"
              style={{
                height: '100%', // Makes the image fill the container height
                objectFit: 'cover', // Ensures the image scales properly
              }}
            />
          </div>
          <div className="card-body" >
            <h5 className="card-title">{product.Name}</h5>
            <p className="card-text text-muted">Tsh {product.price}</p>
            <button className="btn btn-primary w-100">Add to Cart</button>
          </div>
        </div>
      </div>
    ))}
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
</div>

 

           
          
            
         
         
        </div>
        
      </div>
      
      </div>
      
      </div>
      
    </>
  );
};

export default Home;
