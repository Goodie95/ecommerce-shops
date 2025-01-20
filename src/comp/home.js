import React, { useState, useEffect, useRef } from 'react';
import { useCart } from './CartContext';
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
import './causel.css';
import { useNavigate } from "react-router-dom";


const Home = () => {

  {/*const { addToCart } = useCart(); // Get the addToCart function from context

  const Products = [
    { id: 1, name: "Cash Karanga", price: 14000, image: "image/nuts.png" },
    // Add more products as needed
  ];

  const handleAddToCart = (Product) => {
    addToCart(Product); // Add product to the cart
    alert('Product added to cart');
  }; */}
  

  // State for menu visibility
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null); // Ref for the menu content
  const buttonRef = useRef(null); // Ref for the button
  const [showFirstSet, setShowFirstSet] = useState(true);  // Shows the first 4 cards
  const [showSecondSet, setShowSecondSet] = useState(false); // Shows cards from 5th onward

  


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
  const itemsPerPage = 6; // Number of items visible at a time


  // State for Featured Products
  const [featuredProducts] = useState(Featuredproduct);
  const [featuredIndex, setFeaturedIndex] = useState(0);

  // Handle Next Button Click (To show the second set of cards)
  const handleNextNewArrivals = () => {
    setShowFirstSet(false); // Hide the first 4 cards
    setShowSecondSet(true); // Show the 5th and subsequent cards
    if (categoryIndex + itemsPerPage < Categoryproduct.length) {
      setCategoryIndex(categoryIndex + itemsPerPage);
    }
  };

  // Handle Prev Button Click (To show the first set of cards)
  const handlePrevNewArrivals = () => {
    setShowFirstSet(true); // Show the first 4 cards
    setShowSecondSet(false); // Hide the 5th and subsequent cards
    if (categoryIndex - itemsPerPage >= 0) {
      setCategoryIndex(categoryIndex - itemsPerPage);
    }
  };

  const handleNext = () => {
    setShowFirstSet(false); // Hide the first 4 cards
    setShowSecondSet(true); // Show the 5th and subsequent cards
    if (categoryIndex + itemsPerPage < Categoryproduct.length) {
      setCategoryIndex(categoryIndex + itemsPerPage);
    }
  };

  // Handle Prev Button Click (To show the first set of cards)
  const handlePrev = () => {
    setShowFirstSet(true); // Show the first 4 cards
    setShowSecondSet(false); // Hide the 5th and subsequent cards
    if (categoryIndex - itemsPerPage >= 0) {
      setCategoryIndex(categoryIndex - itemsPerPage);
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
                style={{ maxWidth: '155px', height: 'auto', margin: '0px'}}
              />
            </div>
          </div>

          {/* Menu */}
          <div className="col-12 col-md-auto d-flex justify-content-center mb-3 mb-md-0" style={{  zIndex: 1}}>
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
    
  <div className="home">
  {/* Top Banner */}
  <div
  id="carouselExampleAutoplay"
  className="carousel slide top_banner d-flex align-items-center justify-content-center text-center text-white"
  data-bs-ride="carousel"
  data-bs-interval="1200"
  style={{ height: "500px" }}
>
  {/* Indicators */}
  <div className="carousel-indicators">
    <button
      type="button"
      data-bs-target="#carouselExampleAutoplay"
      data-bs-slide-to="0"
      className="active"
      aria-current="true"
      aria-label="Slide 1"
      style={{color: "b"}}
    ></button>
    <button
      type="button"
      data-bs-target="#carouselExampleAutoplay"
      data-bs-slide-to="1"
      aria-label="Slide 2"
    ></button>
    <button
      type="button"
      data-bs-target="#carouselExampleAutoplay"
      data-bs-slide-to="2"
      aria-label="Slide 3"
    ></button>
  </div>

  {/* Slides */}
  <div className="carousel-inner">
    <div
      className="carousel-item active"
      style={{
        backgroundImage: "url('image/cover1.png')",
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        height: "500px",
      }}
    >
      {/* Contact Section Inside the Active Carousel Item */}
      <div
        className="contact w-100 d-flex flex-column justify-content-center align-items-start text-start"
        style={{
          position: "absolute",
          paddingLeft: "20px",
          paddingTop: "30px",
          color: "#fff",
        }}
      >
        <h3
          className="text-uppercase text-warning fw-light mb-2"
          style={{ paddingTop: "10px", marginBottom: "250px" }}
        >
          Up to 30% off today
        </h3>
        <h2
          className="text-uppercase fw-bold fs-1"
          style={{ paddingTop: "20px" }}
        >
          Spice Nyanya
        </h2>
        <p className="mb-4">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae dicta
          in placeat hic labore.
        </p>
        <Link to="/products" className="btn btn-warning fw-bold px-4 py-2">
          Shop Now
        </Link>
      </div>
    </div>
    <div
      className="carousel-item"
      style={{
        backgroundImage: "url('image/home decor.png')",
        backgroundPosition: "center",
        backgroundSize: "100% auto", 
        backgroundRepeat: "no-repeat",
        height: "500px",
        
      }}
      
    >
      <div
        className="contact w-100 d-flex flex-column justify-content-center align-items-start text-start"
        style={{
          position: "absolute",
          paddingLeft: "20px",
          paddingTop: "30px",
          color: "#fff",
        }}
      >
        <h3
          className="text-uppercase text-warning fw-light mb-2"
          style={{ paddingTop: "10px", marginBottom: "250px" }}
        >
          Up to 30% off today
        </h3>
        <h2
          className="text-uppercase fw-bold fs-1"
          style={{ paddingTop: "20px" }}
        >
          Home Decor
        </h2>
        <p className="mb-4">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae dicta
          in placeat hic labore.
        </p>
        <Link to="/products" className="btn btn-warning fw-bold px-4 py-2">
          Shop Now
        </Link>
      </div>
    </div>
    <div
      className="carousel-item"
      style={{
        backgroundImage: "url('image/cosmetics.png')",
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        height: "500px",
      }}
    >
      <div
        className="contact w-100 d-flex flex-column justify-content-center align-items-start text-start"
        style={{
          position: "absolute",
          paddingLeft: "20px",
          paddingTop: "30px",
          color: "#fff",
        }}
      >
        <h3
          className="text-uppercase text-warning fw-light mb-2"
          style={{ paddingTop: "10px", marginBottom: "250px" }}
        >
          Up to 30% off today
        </h3>
        <h2
          className="text-uppercase fw-bold fs-1"
          style={{ paddingTop: "20px" }}
        >
          Cosmetics
        </h2>
        <p className="mb-4">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae dicta
          in placeat hic labore.
        </p>
        <Link to="/products" className="btn btn-warning fw-bold px-4 py-2">
          Shop Now
        </Link>
      </div>
    </div>
  </div>

  {/* Controls */}
  
</div>

</div>


    
  

  
{/* New Arrivals Section */}
<div className="new-arrivals mt-4 ms-3">
      <h2>New Arrivals</h2>
      <div className="products-carousel position-relative d-flex justify-content-between align-items-center">
        {/* Previous Button */}
        <button
          className="carousel-button prev position-absolute top-50 translate-middle-y border-0 d-flex justify-content-center align-items-center"
          onClick={handlePrevNewArrivals} // Show first 4 cards
          style={{
            width: '60px',
            height: '60px',
            border: '0.5px solid lightgray',
            borderRadius: '50%',
            backgroundColor: 'transparent',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            left: '-0.5px',
            zIndex: 5,
          }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 40 40" fill="none" stroke="black" strokeWidth="1.0">
            <circle cx="20" cy="20" r="19" stroke="grey" fill="none" />
            <path d="M24 28 L16 20 L24 12" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        {/* Products Container */}
        <div className="products row gx-3 gy-4 w-100" style={{ padding: '0 40px' }}>
          <div className="row gx-3 gy-4">
            {/* Cards from 1 to 4 (First Set) */}
            {showFirstSet && (
              <>
                <div className="col-6 col-md-3 mb-4">
                  <div className="card" style={{ width: '100%', borderRadius: '0', overflow: 'hidden', border: 'none',boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
                    <Link to="/karanga">
                      <img src="image/nuts.png" className="card-img-top" alt="Product" style={{ height: '15rem', objectFit: 'cover', borderRadius: '10px', border: 'none' }} />
                    </Link>
                    <div className="card-body text-left">
                      <h5 className="card-title fw-bold">Cash Karanga</h5>
                      <div className="d-flex justify-content-between align-items-center">
                        <p className="card-text text-muted mb-0">Tsh 14,000</p>
                        <button className="btn btn-primary btn-sm fw-bold" onClick={() => addToCart({ id: 1, name: 'Cash Karanga', price: 14000, unit: '45g', image: 'image/nuts.png' })}>
                          Add To Cart
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Card 2 */}
    <div className="col-6 col-md-3 mb-4">
      <div className="card" style={{ width: "100%", borderRadius: "0", overflow: "hidden", border: 'none',boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
      <Link to="/asali">
        <img
          src="image/asali.png" // Replace with the correct image path
          className="card-img-top"
          alt="Product"
          style={{ height: "15rem", objectFit: "cover", borderRadius: "10px",          // No rounded corners for image
            border: "none", }}  
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
</button>          </div>
        </div>
      </div>
    </div>

    {/* Card 3 */}
    <div className="col-6 col-md-3 mb-4">
      <div className="card" style={{ width: "100%", borderRadius: "0", overflow: "hidden", border: 'none',boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
      <Link to="/candle">
        <img
          src="image/candle.png" // Replace with the correct image path
          className="card-img-top"
          alt="Product"
          style={{ height: "15rem", objectFit: "cover", borderRadius: "10px",          // No rounded corners for image
            border: "none", }}
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
</button>          </div>
        </div>
      </div>
    </div>

    {/* Card 4 */}
    <div className="col-6 col-md-3 mb-4">
      <div className="card" style={{ width: "100%", borderRadius: "0", overflow: "hidden", border: 'none',boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
      <Link to="/coconut">
        <img
          src="image/coconut.png" // Replace with the correct image path
          className="card-img-top"
          alt="Product"
          style={{ height: "15rem", objectFit: "cover", borderRadius: "10px",          // No rounded corners for image
            border: "none", }}
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
      name: "Coconut oil",
      price: 14000,
      unit: "45g",
      image: "image/coconut.png",
    })
  }
>
  Add To Cart
</button>          </div>
        </div>
      </div>
    </div>
              </>
            )}

            {/* Cards from 5th onwards (Second Set) */}
            {showSecondSet && (
              <>
                <div className="col-6 col-md-3 mb-4">
                  <div className="card" style={{ width: '100%', borderRadius: '0', overflow: 'hidden', border: 'none',boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
                    <Link to="/coconut">
                      <img src="image/coconut.png" className="card-img-top" alt="Product" style={{ height: '15rem', objectFit: 'cover', borderRadius: '10px', border: 'none' }} />
                    </Link>
                    <div className="card-body text-left">
                      <h5 className="card-title fw-bold">Coconut oil</h5>
                      <div className="d-flex justify-content-between align-items-center">
                        <p className="card-text text-muted mb-0">Tsh 14,000</p>
                        <button className="btn btn-primary btn-sm fw-bold" onClick={() => addToCart({ id: 4, name: 'Coconut oil', price: 14000, unit: '45g', image: 'image/coconut.png' })}>
                          Add To Cart
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Card 2 */}
    

    {/* Card 3 */}
    <div className="col-6 col-md-3 mb-4">
      <div className="card" style={{ width: "100%", borderRadius: "0", overflow: "hidden", border: 'none',boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
      <Link to="/candle">
        <img
          src="image/candle.png" // Replace with the correct image path
          className="card-img-top"
          alt="Product"
          style={{ height: "15rem", objectFit: "cover", borderRadius: "10px",          // No rounded corners for image
            border: "none", }}
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
</button>          </div>
        </div>
      </div>
    </div>

    {/* Card 4 */}
    <div className="col-6 col-md-3 mb-4">
      <div className="card" style={{ width: "100%", borderRadius: "0", overflow: "hidden", border: 'none',boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
      <Link to="/coconut">
        <img
          src="image/coconut.png" // Replace with the correct image path
          className="card-img-top"
          alt="Product"
          style={{ height: "15rem", objectFit: "cover", borderRadius: "10px",          // No rounded corners for image
            border: "none", }}
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
      name: "Coconut oil",
      price: 14000,
      unit: "45g",
      image: "image/coconut.png",
    })
  }
>
  Add To Cart
</button>          </div>
        </div>
      </div>
    </div>
              </>
            )}
          </div>
        </div>

        {/* Next Button */}
        <button
          className="carousel-button next position-absolute top-50 translate-middle-y border-0 d-flex justify-content-center align-items-center "
          onClick={handleNextNewArrivals} // Show second set of cards
          style={{
            width: '60px',
            height: '60px',
            border: '1px solid black',
            borderRadius: '5%',
            backgroundColor: 'transparent',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            right: '-3px',
            zIndex: 5,
          }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 40 40" fill="none" stroke="black" strokeWidth="1.0">
            <circle cx="20" cy="20" r="19" stroke="grey" fill="none" />
            <path d="M16 28 L24 20 L16 12" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
    </div>



{/* Shop by Category */}
<div className="shop-by-category container-fluid py-5">
      <h2 className="text-center mb-4">Shop by Category</h2>

      <div className="d-flex align-items-center position-relative">
        {/* Previous Button */}
        <button
          className="carousel-button prev position-absolute top-50 translate-middle-y border-0"
          onClick={handlePrev}
          style={{
            width: '90px',
            height: '90px',
            border: '1px solid black',
            borderRadius: '50%',
            backgroundColor: 'transparent',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            left: '-50px',
            zIndex: 5,
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="40"
            height="40"
            viewBox="0 0 40 40"
            fill="none"
            stroke="black"
            strokeWidth="1.0"
          >
            <circle cx="20" cy="20" r="19" stroke="grey" fill="none" />
            <path d="M24 28 L16 20 L24 12" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        {/* Products Grid */}
        <div className="row g-2 mx-0" style={{ padding: '0 40px' }}>
  {Categoryproduct.slice(categoryIndex, categoryIndex + itemsPerPage).map((product) => (
    <div
      key={product.id}
      className="col-6 col-sm-4 col-md-2 d-flex flex-column align-items-center"
      style={{
        maxWidth: '200px', // Ensures consistent card width
        margin: 'auto', // Center-aligns cards horizontally
        marginBottom: '15px', // Space between rows
      }}
    >
      <div
        className="c-product d-flex flex-column align-items-center mx-1"
        style={{
          background: 'transparent',
          padding: '10px', // Adds padding inside the card for spacing
          border: '1px solid #ddd', // Optional: Adds a light border for better visibility
          borderRadius: '8px', // Smooth edges for a modern look
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', // Subtle shadow for depth
          transition: 'transform 0.3s ease', // Smooth hover animation
        }}
      >
        <Link to={product.link || '#'}>
          <img
            src={process.env.PUBLIC_URL + '/' + product.image}
            alt={product.Name}
            className="c-product-image img-fluid"
            style={{
              objectFit: 'cover',
              width: '100%', // Image adjusts to card's width
              height: '172px',
              borderRadius: '5px', // Optional: Rounded corners for images
            }}
          />
        </Link>
        <h3
          className="c-product-name text-center mt-3"
          style={{
            fontStyle: 'normal',
            fontSize: '14px', // Consistent font size
            fontWeight: '600',
            color: '#333',
          }}
        >
          {product.Name}
        </h3>
      </div>
    </div>
  ))}
</div>


        {/* Next Button */}
        <button
          className="carousel-button next position-absolute top-50 translate-middle-y border-0"
          onClick={handleNext}
          style={{
            width: '90px',
            height: '90px',
            border: '1px solid black',
            borderRadius: '50%',
            backgroundColor: 'transparent',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            right: '-50px',
            zIndex: 5,
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="40"
            height="40"
            viewBox="0 0 40 40"
            fill="none"
            stroke="black"
            strokeWidth="1.0"
          >
            <circle cx="20" cy="20" r="19" stroke="grey" fill="none" />
            <path d="M16 28 L24 20 L16 12" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
    </div>







       {/* Featured Products */}
<div className="featured-products container mt-5" style={{marginBottom: '20px', width: '100%'}}>
  <div className="row align-items-center mb-3" >
  <div className="col">
    <h2>Featured Products</h2>
  </div>
  <div className="col text-end" style={{ marginRight: '20px' }}>
  <Link 
    to="/featured-products" 
    className="btn btn-outline-danger" 
    style={{ color: 'black', border: '1px solid black' }}
  >
    SELL ALL
  </Link>
</div>

    
  

<div className="row g-4" style={{ border: 'none' }}>
  {featuredProducts.slice(featuredIndex, featuredIndex + 12).map((product) => (
    <div key={product.id} className="col-6 col-sm-6 col-md-4 col-lg-3">
      <div className="card border-0 shadow-sm h-100 text-center" style={{ border: 'none' }}>
        <div
          className="card-img-container"
          style={{
            height: '250px', // Fixed height for the image container
            overflow: 'hidden', // Ensure images stay within the container
            borderRadius: '8px',
            border: 'none',
          }}
        >
          <Link to={product.link || '#'}>
          <img
            src={process.env.PUBLIC_URL + '/' + product.image}
            alt={product.Name}
            className="card-img-top w-100"
            style={{
              height: '100%', // Makes the image fill the container height
              objectFit: 'cover',
              border: 'none', // Ensures the image scales properly
            }}
          />
          </Link>
        </div>
        <div className="card-body" style={{ textAlign: 'left' }}>
          <h5 className="card-title">{product.Name}</h5>
          <div className="d-flex justify-content-between align-items-center">
            <p className="card-text text-muted mb-0">Tsh {product.price}</p>
            <button
              className="btn btn-primary btn-sm fw-bold"
              onClick={() =>
                addToCart({
                  id: product.id, // Use the product's unique id
                  name: product.Name, // Use the product's name
                  price: product.price, // Use the product's price
                  unit: product.unit || '1 unit', // Provide the unit (or a default value)
                  image: product.image, // Use the product's image
                })
              }
            >
              Add To Cart
            </button>
          </div>
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

          <footer className="footer" style={{margin: 'auto'}}>
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
    
    </>
  );
};

export default Home;