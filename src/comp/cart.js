import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { IoIosArrowDown, IoIosSearch } from 'react-icons/io';
import { IoBagOutline, IoPersonOutline } from 'react-icons/io5';
import { RiShoppingBag4Line, RiShieldCheckLine } from 'react-icons/ri';
import { BiLeaf } from 'react-icons/bi';
import jikoImage from "../images/jiko.png";
import mixednutsImage from "../images/mixed nuts.png";
import nuts2Image from "../images/nuts2.png";
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const Cart = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [menuOpen, setMenuOpen] = useState(false);

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
  

  const [items, setItems] = useState([
    {
      id: 1,
      name: "Spice",
      unit: "45g",
      price: 23000,
      quantity: 2,
      image: jikoImage,
    },
    {
      id: 2,
      name: "Mixed Nuts",
      unit: "500mg",
      price: 23000,
      quantity: 1,
      image: mixednutsImage,
    },
    {
      id: 3,
      name: "Tote Bag",
      unit: "12",
      price: 12000,
      quantity: 4,
      image: nuts2Image,
    },
  ]);

  const [discount, setDiscount] = useState(0);

  // Handle Increment
  const incrementQuantity = (id) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  // Handle Decrement
  const decrementQuantity = (id) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  // Handle Remove Item
  const removeItem = (id) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  // Calculate Total Price
  const subTotal = items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const discountAmount = (subTotal * discount) / 100;
  const grandTotal = subTotal - discountAmount;

  // Handle Discount
  const applyDiscount = () => {
    setDiscount(10); // Fixed 10% discount for demo purposes
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
        </div>
      </div>

      <div className="cart-container">
  <h1>My Cart</h1>
  <div className="cart-content row">
    <div className="cart-items col-12 col-md-8">
      {items.map((item) => (
        <div className="cart-item d-flex mb-4" key={item.id}>
          <img
            src={item.image}
            alt={item.name}
            className="item-image img-fluid"
            style={{ maxWidth: '100px', marginRight: '1rem' }}
          />
          <div className="item-details flex-grow-1">
            <h2>{item.name}</h2>
            <p>Unit: {item.unit}</p>
            <p className="item-price">Tsh {item.price.toLocaleString()}</p>
            <div className="quantity-controls d-flex align-items-center">
              <button
                className="btn btn-sm btn-outline-primary"
                onClick={() => decrementQuantity(item.id)}
              >
                -
              </button>
              <span className="mx-2">{item.quantity}</span>
              <button
                className="btn btn-sm btn-outline-primary"
                onClick={() => incrementQuantity(item.id)}
              >
                +
              </button>
            </div>
            <button
              className="remove-btn btn btn-sm btn-danger mt-2"
              onClick={() => removeItem(item.id)}
            >
              Remove
            </button>
          </div>
        </div>
      ))}
    </div>

    {/* Order Summary */}
    <div className="order-summary col-12 col-md-4">
      <h2>Order Summary</h2>
      <div className="summary-details">
        <p>
          Sub Total: <span>Tsh {subTotal.toLocaleString()}</span>
        </p>
        <p>
          Discount (10%): <span>Tsh {discountAmount.toLocaleString()}</span>
        </p>
        <p>
          <strong>Grand Total:</strong> <span>Tsh {grandTotal.toLocaleString()}</span>
        </p>
      </div>
      <button className="checkout-btn btn btn-primary w-100">Checkout Now</button>
      <div className="discount-section d-flex mt-3">
        <input
          type="text"
          className="form-control"
          placeholder="Discount Voucher"
          disabled
        />
        <button
          className="btn btn-secondary ms-2"
          onClick={applyDiscount}
          style={{ flexShrink: 0 }}
        >
          Apply
        </button>
      </div>
      <h4 className="mt-4">Support Payment Method</h4>
      <img src="/image/selcom.png" alt="selcom-logo" className="img-fluid" />
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

export default Cart;
