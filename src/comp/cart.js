import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { IoIosArrowDown, IoIosSearch } from 'react-icons/io';
import { IoBagOutline, IoPersonOutline } from 'react-icons/io5';
import { RiShoppingBag4Line, RiShieldCheckLine } from 'react-icons/ri';
import { BiLeaf } from 'react-icons/bi';
import './home.css';
import jikoImage from "../images/jiko.png";
import mixednutsImage from "../images/mixed nuts.png";
import nuts2Image from "../images/nuts2.png";
import '@fortawesome/fontawesome-free/css/all.min.css';



  const Cart = () => {

    const [menuOpen, setMenuOpen] = useState(false);
    
      // Toggle menu visibility
      const toggleMenu = () => {
        setMenuOpen(!menuOpen);
      };

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

      
    <div className="cart-container">
      <h1>My Cart</h1>
      <div className="cart-content">
        <div className="cart-items">
          {items.map((item) => (
            <div className="cart-item" key={item.id}>
              <img src={item.image} alt={item.name} className="item-image" />
              <div className="item-details">
                <h2>{item.name}</h2>
                <p>Unit: {item.unit}</p>
                <p className="item-price">Tsh {item.price.toLocaleString()}</p>
                <div className="quantity-controls">
                  <button onClick={() => decrementQuantity(item.id)}>-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => incrementQuantity(item.id)}>+</button>
                </div>
                <button className="remove-btn" onClick={() => removeItem(item.id)}>
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="order-summary">
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
          <button className="checkout-btn">Checkout Now</button>
          <div className="discount-section">
            <input type="text" placeholder="Discount Voucher" disabled />
            <button onClick={applyDiscount}>Apply</button>
          </div>
          <h4>Support Payment Method</h4>
          <img src="/image/selcom.png" alt="selcom-logo" />
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

export default Cart;
