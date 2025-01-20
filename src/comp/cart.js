import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { IoIosArrowDown, IoIosSearch } from 'react-icons/io';
import { IoBagOutline, IoPersonOutline } from 'react-icons/io5';
import { RiShoppingBag4Line, RiShieldCheckLine } from 'react-icons/ri';
import { BiLeaf } from 'react-icons/bi';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { useNavigate } from "react-router-dom";


function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [discount, setDiscount] = useState(0); // Initialize discount to 0
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


  useEffect(() => {
    // Load cart items from local storage
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(storedCart);
  }, []);

  const updateQuantity = (id, delta) => {
    // Update the quantity of a specific item
    const updatedCart = cartItems.map(item =>
      item.id === id ? { ...item, quantity: Math.max(item.quantity + delta, 1) } : item
    );
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const removeItem = id => {
    // Remove an item from the cart
    const updatedCart = cartItems.filter(item => item.id !== id);
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  // Calculate Totals
  const subTotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const discountAmount = (subTotal * discount) / 100;
  const grandTotal = subTotal - discountAmount;

  // Handle Discount
  const applyDiscount = () => {
    setDiscount(10); // Fixed 10% discount for demo purposes
  };

  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const navigate = useNavigate();

  const products = [
    { name: "Cash Karanga", link: "/karanga" },
    { name: "Asali asili", link: "/asali" },
    { name: "Candle", link: "/candle" },
    { name: "Coconut oil", link: "/coconut" },
    { name: "Bee Honey", link: "/honey" },
    { name: "Food and Beverages", link: "/food" },
    { name: "Home Decor", link: "/decor" },
    { name: "Cosmetics", link: "/cosmetics" },
    { name: "Spices", link: "/spices" },
    { name: "Nuts", link: "/nuts" },
    { name: "Cleaning Products", link: "/cleaning" },
    { name: "Spice Jiko", link: "/jiko" },
    { name: "Ateke Kahawa", link: "/kahawa" },
    { name: "Swahili Chilli", link: "/chili" },
    { name: "Olive Oil", link: "/olive" },
  ];

  const handleInputChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
  
    if (term) {
      setFilteredProducts(
        products.filter((product) =>
          product.name.toLowerCase().includes(term.toLowerCase())
        )
      );
    } else {
      setFilteredProducts([]);
    }
  };
  
  const handleSearchIconClick = () => {
    if (searchTerm) {
      const foundProduct = products.find((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
  
      if (foundProduct) {
        navigate(foundProduct.link);
      } else {
        alert("Product not found!");
      }
    } else {
      alert("Please enter a search term!");
    }
  };

     function addToCart(item) {
        // Retrieve existing cart data from local storage
        let cart = JSON.parse(localStorage.getItem("cart")) || [];
      
        // Check if the item already exists in the cart
        const existingItem = cart.find(cartItem => cartItem.id === item.id);
      
        if (existingItem) {
            // If the item exists, update the quantity
            existingItem.quantity += 1;
            
            // Create a custom alert div for already added item
            showAlert(`${item.name} is already in the cart! Quantity updated.`);
        } else {
            // Otherwise, add a new item with quantity 1
            cart.push({ ...item, quantity: 1 });
            
            // Create a custom alert div for the first time addition
            showAlert(`${item.name} added to the cart!`);
        }
      
        // Save the updated cart to local storage
        localStorage.setItem("cart", JSON.stringify(cart));
    
        // Update state to trigger a re-render and reflect changes in the cart
        setCartItems(cart);
    }
    
    // Function to display the alert box
    function showAlert(message) {
        let alertBox = document.createElement('div');
        alertBox.textContent = message;
        alertBox.style.position = 'fixed';
        alertBox.style.top = '20px';
        alertBox.style.left = '50%';
        alertBox.style.transform = 'translateX(-50%)'; // Center the box horizontally
        alertBox.style.padding = '10px';
        alertBox.style.backgroundColor = '#4CAF50';
        alertBox.style.color = 'white';
        alertBox.style.borderRadius = '5px';
        alertBox.style.zIndex = '1000';
      
        // Append alert box to body
        document.body.appendChild(alertBox);
      
        // Remove the alert after 1 second (1000 milliseconds)
        setTimeout(() => {
            alertBox.style.transition = 'opacity 0.5s';
            alertBox.style.opacity = '0';
            setTimeout(() => {
                alertBox.remove();
            }, 800); // Wait for the transition to complete before removing the element
        }, 1200); // 1.2 second before disappearing
    }
    
    
    
      const [] = useState([]);
    
      useEffect(() => {
        // Fetch cart items from localStorage or a backend API
        const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
        setCartItems(storedCart);
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
              onChange={handleInputChange}
            />
      
            {/* Search Results */}
            {searchTerm && (
              <div className="mt-3">
                <h5>Search Results:</h5>
                {filteredProducts.length > 0 ? (
                   <ul style={{ listStyle: "none", padding: 0 }}>
                   {filteredProducts.map((product, index) => (
                     <li key={index} style={{ marginBottom: "10px" }}>
                       <Link
                         to={product.link}
                         style={{ textDecoration: "none", color: "#007BFF" }}
                       >
                         {product.name}
                       </Link>
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
                <div
        className="search-menu d-flex align-items-center justify-content-center bg-light rounded-circle shadow-sm p-2 ms-2"
        data-bs-toggle="tooltip"
        data-bs-placement="top"
        title="Search"
        onClick={handleSearchIconClick} // Only navigates when icon is clicked
        style={{ cursor: "pointer" }}
      >
        <IoIosSearch className="text-primary fs-4" />
      </div>
                            <div className="separator  mx-2 text-grey">|</div>
                            <div
        className="icon-menu position-relative d-flex align-items-center justify-content-center bg-light rounded-circle shadow-sm p-2"
        data-bs-toggle="tooltip"
        data-bs-placement="top"
        title="My Cart"
      >
        {/* Link to Cart */}
        <Link to="/cart" className="text-primary text-decoration-none">
          <IoBagOutline className="fs-4" />
        </Link>
      
        {/* Badge for cart count */}
        {cartItems.length > 0 && (
          <span
            className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
            style={{ fontSize: "0.75rem" }}
          >
            {cartItems.reduce((total, item) => total + item.quantity, 0)}
          </span>
        )}
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
      <h1 className="text-start">My Cart</h1>
      <div className="cart-content row">
        {/* Cart Items Section */}
        <div className="cart-items col-12 col-md-8">
          {cartItems.length > 0 ? (
            cartItems.map(item => (
              <div className="cart-item d-flex mb-4 border-bottom pb-3" key={item.id}>
                {/* Item Image */}
                <img
                  src={item.image}
                  alt={item.name}
                  className="item-image img-fluid"
                  style={{ maxWidth: "200px", height: "auto", marginRight: "1rem", width: "100px" }}
                />

                {/* Item Details and Actions */}
                <div className="d-flex align-items-center justify-content-between spice-card w-100">
                  {/* Left-Aligned Section */}
                  <div className="d-flex align-items-center">
                    <div className="ms-3">
                      <h6 className="mb-1 fw-bold">{item.name}</h6>
                      <p className="mb-1 text-muted">Unit : {item.unit}</p>
                      <button
                        className="btn btn-link text-danger text-decoration-none d-flex align-items-center p-0"
                        onClick={() => removeItem(item.id)}
                      >
                        <i className="bi bi-trash-fill me-1"></i>
                        Remove
                      </button>
                    </div>
                  </div>

                  {/* Right-Aligned Section */}
                  <div className="ms-auto text-end">
                    <p className="mb-2 fw-bold">Quantity</p>
                    <div className="d-flex align-items-center mb-2 justify-content-end">
                      <button
                        className="btn btn-outline-secondary btn-sm"
                        onClick={() => updateQuantity(item.id, -1)}
                      >
                        -
                      </button>
                      <input
                        type="text"
                        className="form-control form-control-sm text-center mx-2"
                        value={item.quantity}
                        style={{ width: "40px" }}
                        readOnly
                      />
                      <button
                        className="btn btn-outline-secondary btn-sm"
                        onClick={() => updateQuantity(item.id, 1)}
                      >
                        +
                      </button>
                    </div>
                    <p className="fw-bold mb-0" style={{ marginRight: "10px" }}>
                      Tsh {item.price !== undefined ? item.price.toLocaleString() : "Price not available"}
                    </p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>Your cart is empty!</p>
          )}
        </div>

        {/* Order Summary Section */}
        <div className="order-summary col-12 col-md-4">
          <h2>Order Summary</h2>
          <div className="summary-details">
            {/* Discount Section */}
            <div className="discount-section d-flex mt-3">
              <input
                type="text"
                className="form-control"
                placeholder="Discount Voucher"
              />
              <button
                className="btn btn-secondary ms-2"
                onClick={applyDiscount}
                style={{ flexShrink: 0 }}
              >
                Apply
              </button>
            </div>

            {/* Totals */}
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

          {/* Checkout Button */}
          <button className="checkout-btn btn btn-primary w-100">Checkout Now</button>

          {/* Payment Support Section */}
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
}

export default Cart;