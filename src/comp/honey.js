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
import 'bootstrap-icons/font/bootstrap-icons.css';
import { useNavigate } from "react-router-dom";

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
    
    
  ]);

  const handleRemove = (id) => {
    setItems(items.filter(item => item.id !== id));
  };

  const [discount, setDiscount] = useState(0);

  // Handle Increment
  const [quantity, setQuantity] = useState(1); // Initial value set to 1

  // Decrement function
  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1); // Decrease quantity by 1
    }
  };

  // Increment function
  const incrementQuantity = () => {
    setQuantity(quantity + 1); // Increase quantity by 1
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
          }, 500); // Wait for the transition to complete before removing the element
      }, 1000); // 1 second before disappearing
  }
  

  const [cartItems, setCartItems] = useState([]);
  
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
  <div className="cart-content row">
    <div className="col-12 col-md-6 mb-4">
      <img
        src="image/honey.png" // Replace with your image path
        alt="Product"
        className="img-fluid rounded mx-auto d-block"
        style={{
          width: '100%', // Ensure the image scales down on smaller screens
          height: 'auto', // Maintain aspect ratio
        }}
      />
    </div>

    {/* Order Summary */}
    <div className="order-summary col-12 col-md-4" >
      <div className="col-12">
        <h2>Bee Honey</h2>
        <p className="w-100">
          <strong>Status:</strong> <span className="text-success">In stock</span>
        </p>
        <h3
  className="text-primary w-100 text-truncate"
  style={{
    fontStyle: 'normal',
    wordWrap: 'break-word', // Ensures long words break into the next line
    overflow: 'hidden',    // Prevents text overflow outside the container
    textAlign: 'left',   // Optional: Centers the text in the container
    fontSize: '32px',      // Adjust font size for better readability on mobile
  }}
>
  Tsh 2,300,000.00
</h3>
        <p className="w-100">
          Lorem ipsum dolor sit amet consectetur. Amet vitae nec facilisis leo
          pellentesque eget imperdiet amet. Elementum leo nunc velit arcu fin
          gilla estas condimentum urus. Pellentesque dis vitae velit at viverra
          arcu enim aing. Lacus platea tortor pellentesque.
        </p>

        {/* Quantity Input */}
        <div className="d-flex align-items-center mb-3 w-100">
          <label htmlFor="quantity" className="me-3">
            Quantity:
          </label>
          <div className="d-flex align-items-center w-100">
            <button className="btn btn-outline-secondary btn-sm" onClick={decrementQuantity}>
              -
            </button>
            <input
              type="text"
              className="form-control form-control-sm text-center mx-2"
              value={quantity} // Display current quantity
              style={{ width: '50px' }}
              readOnly
            />
            <button className="btn btn-outline-secondary btn-sm" onClick={incrementQuantity}>
              +
            </button>
          </div>
        </div>

        {/* Add to Cart Button */}
        <button
  className="btn btn-primary w-100"
  
  onClick={() =>
    addToCart({
      id: 5, // Unique identifier for the item
      name: "Bee Honey",
      price: 14000,
      unit: "45g",
      image: "image/honey.png",
    })
  }
>
<i className="bi bi-cart">
</i> Add To Cart
</button>
      </div>
    </div>
  </div>
</div>





    <div className="new-arrivals mt-4">
    <h1 className="text-start">Related Products</h1>

      <div className="products-carousel  position-relative">
        {/* Previous Button (Hidden on Mobile) */}
        
    
    
        {/* Products Container */}
        <div className="products row gx-3 w-100" >
                    <div className="row gx-4" >
                      {/* Card 1 */}
                      <div className="col-6 col-sm-12 col-md-3 mb-4">
                        <div className="card" style={{ width: "100%", borderRadius: "0", overflow: "hidden", border: 'none' }}>
                          <Link to="/karanga">
                            <img
                              src="image/nuts.png"
                              className="card-img-top"
                              alt="Product"
                              style={{
                                height: "15rem",            // Fixed height for image
                                objectFit: "cover",         // Ensure image covers the area without distortion
                                borderRadius: "10px",          // No rounded corners for image
                                border: "none",             // Remove any border from the image itself
                                width: "100%",
                              }}
                            />
                          </Link>
                          <div className="card-body text-left" >
                            <h5 className="card-title fw-bold" >Cash Karanga</h5>
                            <div className="d-flex justify-content-between align-items-center">
                              <p className="card-text text-muted mb-0">Tsh 14,000</p>
                              <button
                                className="btn btn-primary btn-sm fw-bold"
                                onClick={() =>
                                  addToCart({
                                    id: 1, // Unique identifier for the item
                                    name: "Cash Karanga",
                                    price: 14000,
                                    unit: "45g",
                                    image: "image/nuts.png",
                                  })
                                }
                              >
                                Add To Cart
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
        
        
                      {/* Card 2 */}
                      <div className="col-6 col-sm-12 col-md-3 mb-4">
                        <div className="card" style={{ width: "100%", borderRadius: "0", overflow: "hidden", border: 'none' }}>
                          <Link to="/asali">
                            <img
                              src="image/asali.png" // Replace with the correct image path
                              className="card-img-top"
                              alt="Product"
                              style={{
                                height: "15rem", objectFit: "cover", borderRadius: "10px",          // No rounded corners for image
                                border: "none",
                              }}
                            />
                          </Link>
                          <div className="card-body text-left">
                            <h5 className="card-title fw-bold">Asali asili</h5>
                            <div className="d-flex justify-content-between align-items-center">
                              <p className="card-text text-muted mb-0">Tsh 14,000</p>
                              <button
                                className="btn btn-primary btn-sm fw-bold"
                                onClick={() =>
                                  addToCart({
                                    id: 2, // Unique identifier for the item
                                    name: "Asali",
                                    price: 14000,
                                    unit: "45g",
                                    image: "image/asali.png",
                                  })
                                }
                              >
                                Add To Cart
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
        
                      {/* Card 3 */}
                      <div className="col-6 col-sm-12 col-md-3 mb-4">
                        <div className="card" style={{ width: "100%", borderRadius: "0", overflow: "hidden", border: 'none' }}>
                          <Link to="/candle">
                            <img
                              src="image/candle.png" // Replace with the correct image path
                              className="card-img-top"
                              alt="Product"
                              style={{
                                height: "15rem", objectFit: "cover", borderRadius: "10px",          // No rounded corners for image
                                border: "none",
                              }}
                            />
                          </Link>
                          <div className="card-body text-left">
                            <h5 className="card-title fw-bold">Candle</h5>
                            <div className="d-flex justify-content-between align-items-center">
                              <p className="card-text text-muted mb-0">Tsh 14,000</p>
                              <button
                                className="btn btn-primary btn-sm fw-bold"
                                onClick={() =>
                                  addToCart({
                                    id: 3, // Unique identifier for the item
                                    name: "Candle",
                                    price: 14000,
                                    unit: "45g",
                                    image: "image/candle.png",
                                  })
                                }
                              >
                                Add To Cart
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
        
                      {/* Card 4 */}
                      <div className="col-6 col-sm-12 col-md-3 mb-4">
                        <div className="card" style={{ width: "100%", borderRadius: "0", overflow: "hidden", border: 'none' }}>
                          <Link to="/coconut">
                            <img
                              src="image/coconut.png" // Replace with the correct image path
                              className="card-img-top"
                              alt="Product"
                              style={{
                                height: "15rem", objectFit: "cover", borderRadius: "10px",          // No rounded corners for image
                                border: "none",
                              }}
                            />
                          </Link>
                          <div className="card-body text-left">
                            <h5 className="card-title fw-bold">Coconut oil</h5>
                            <div className="d-flex justify-content-between align-items-center">
                              <p className="card-text text-muted mb-0">Tsh 14,000</p>
                              <button
                                className="btn btn-primary btn-sm fw-bold"
                                onClick={() =>
                                  addToCart({
                                    id: 4, // Unique identifier for the item
                                    name: "Coconut",
                                    price: 14000,
                                    unit: "45g",
                                    image: "image/coconut.png",
                                  })
                                }
                              >
                                Add To Cart
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
        
                      <div className="col-6 col-sm-12 col-md-3 mb-4">
                        <div className="card" style={{ width: "100%", borderRadius: "0", overflow: "hidden", border: 'none' }}>
                          <Link to="/kibegi">
                            <img
                              src="image/kibegi.png" // Replace with the correct image path
                              className="card-img-top"
                              alt="Product"
                              style={{
                                height: "15rem", objectFit: "cover", borderRadius: "10px",          // No rounded corners for image
                                border: "none",
                              }}
                            />
                          </Link>
                          <div className="card-body text-left">
                            <h5 className="card-title fw-bold">Bee Honey</h5>
                            <div className="d-flex justify-content-between align-items-center">
                              <p className="card-text text-muted mb-0">Tsh 14,000</p>
                              <button
                                className="btn btn-primary btn-sm fw-bold"
                                onClick={() =>
                                  addToCart({
                                    id: 16, // Unique identifier for the item
                                    name: "Bee Honey",
                                    price: 14000,
                                    unit: "45g",
                                    image: "image/kibegi.png",
                                  })
                                }
                              >
                                Add To Cart
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
        
                      <div className="col-6 col-sm-12 col-md-3 mb-4">
                        <div className="card" style={{ width: "100%", borderRadius: "0", overflow: "hidden", border: 'none' }}>
                          <Link to="/kahawa">
                            <img
                              src="image/ateke kahawa.png" // Replace with the correct image path
                              className="card-img-top"
                              alt="Product"
                              style={{
                                height: "15rem", objectFit: "cover", borderRadius: "10px",          // No rounded corners for image
                                border: "none",
                              }}
                            />
                          </Link>
                          <div className="card-body text-left">
                            <h5 className="card-title fw-bold">Ateke kahawa</h5>
                            <div className="d-flex justify-content-between align-items-center">
                              <p className="card-text text-muted mb-0">Tsh 14,000</p>
                              <button
                                className="btn btn-primary btn-sm fw-bold"
                                onClick={() =>
                                  addToCart({
                                    id: 7, // Unique identifier for the item
                                    name: "Atake Kahawa",
                                    price: 14000,
                                    unit: "45g",
                                    image: "image/ateke kahawa.png",
                                  })
                                }
                              >
                                Add To Cart
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
        
                      <div className="col-6 col-sm-12 col-md-3 mb-4">
                        <div className="card" style={{ width: "100%", borderRadius: "0", overflow: "hidden", border: 'none' }}>
                          <Link to="/asali">
                            <img
                              src="image/asali.png" // Replace with the correct image path
                              className="card-img-top"
                              alt="Product"
                              style={{
                                height: "15rem", objectFit: "cover", borderRadius: "10px",          // No rounded corners for image
                                border: "none",
                              }}
                            />
                          </Link>
                          <div className="card-body text-left">
                            <h5 className="card-title fw-bold">Asali asili</h5>
                            <div className="d-flex justify-content-between align-items-center">
                              <p className="card-text text-muted mb-0">Tsh 14,000</p>
                              <button
                                className="btn btn-primary btn-sm fw-bold"
                                onClick={() =>
                                  addToCart({
                                    id: 2, // Unique identifier for the item
                                    name: "Asali asili",
                                    price: 14000,
                                    unit: "45g",
                                    image: "image/asali.png",
                                  })
                                }
                              >
                                Add To Cart
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
        
                      <div className="col-6 col-sm-12 col-md-3 mb-4">
                        <div className="card" style={{ width: "100%", borderRadius: "0", overflow: "hidden", border: 'none' }}>
                          <Link to="/chili">
                            <img
                              src="image/chili.png" // Replace with the correct image path
                              className="card-img-top"
                              alt="Product"
                              style={{
                                height: "15rem", objectFit: "cover", borderRadius: "10px",          // No rounded corners for image
                                border: "none",
                              }}
                            />
                          </Link>
                          <div className="card-body text-left">
                            <h5 className="card-title fw-bold">Swahili Chilli</h5>
                            <div className="d-flex justify-content-between align-items-center">
                              <p className="card-text text-muted mb-0">Tsh 14,000</p>
                              <button
                                className="btn btn-primary btn-sm fw-bold"
                                onClick={() =>
                                  addToCart({
                                    id: 10, // Unique identifier for the item
                                    name: "Swahili Chilli",
                                    price: 14000,
                                    unit: "45g",
                                    image: "image/chili.png",
                                  })
                                }
                              >
                                Add To Cart
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
        
                    </div>
                  </div>
    
    
        {/* Next Button (Hidden on Mobile) */}
        
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
