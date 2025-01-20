import React, { useState, useRef, useEffect } from 'react'; // Import useRef, useEffect from React
import { Link } from 'react-router-dom';
import { IoIosArrowDown, IoIosSearch } from 'react-icons/io';
import { IoBagOutline, IoPersonOutline } from 'react-icons/io5';
import { RiShoppingBag4Line, RiShieldCheckLine } from 'react-icons/ri';
import { BiLeaf } from 'react-icons/bi';
import Featuredproduct from './featured_products';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from "react-router-dom";





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
  const [showDropdown, setShowDropdown] = useState(false); // Manage dropdown state
  const dropdownRef = useRef(null);
  const [activeCategory, setActiveCategory] = useState('All');
  const [menuOpen, setMenuOpen] = useState(false);
  const [filteredPrice, setFilteredPrice] = useState({});
  const toggleDropdown = () => setShowDropdown(prev => !prev);
  const [filteredProducts, setFilteredProducts] = useState([
    { id: 1, name: "Cash Karanga", price: 14000, link: "/karanga", image: "image/nuts.png" },
    { id: 2, name: "Asali asili", price: 14000, link: "/asali", image: "image/asali.png" },
    { id: 3, name: "Candle", price: 14000, link: "/candle", image: "image/candle.png" },
    { id: 4, name: "Coconut oil", price: 13000, link: "/coconut",  image: "image/coconut.png" },
    { id: 5, name: "Bee Honey", link: "/honey", price: 12000, image: "image/honey.png" },
    { id: 8, name: "Food and Beverages", price: 13000, link: "/food", image: "image/rice.png" },
    { id: 15,  name: "Home Decor", price: 14000, link: "/decor", image: "image/home decor.png" },
    { id: 13, name: "Cosmetics", price: 14000, link: "/cosmetics",image: "image/cosmetics.png" },
    { id: 18, name: "Spices", price: 14000, link: "/spices" , image: "image/spices.png"},
    { id: 17,name: "Nuts", price: 14000, link: "/nuts" , image: "image/nuts2.png"},
    { id: 12,name: "Cleaning Products", price: 14000, link: "/cleaning", image: "image/cleaning products.png" },
    { id: 6,name: "Spice Jiko", price: 14000,link: "/jiko", image: "image/jiko.png" },
    { id: 7,name: "Ateke Kahawa", price: 14000, link: "/kahawa", image: "image/ateke kahawa.png" },
    { id: 10,name: "Swahili Chilli", price: 14000, link: "/chili", image: "image/chili.png" },
    { id: 20,name: "Olive Oil", price: 14000, link: "/olive", image: "image/oliveoil.png" },
  ]);
   // Fixed: Declare state
  const [products] = useState([
    { id: 1, name: "Cash Karanga", price: 14000, link: "/karanga", image: "image/nuts.png" },
    { id: 2, name: "Asali asili", price: 14000, link: "/asali", image: "image/asali.png" },
    { id: 3, name: "Candle", price: 14000, link: "/candle", image: "image/candle.png" },
    { id: 4, name: "Coconut oil", price: 13000, link: "/coconut",  image: "image/coconut.png" },
    { id: 5, name: "Bee Honey", link: "/honey", price: 12000, image: "image/honey.png" },
    { id: 8, name: "Food and Beverages", price: 13000, link: "/food", image: "image/rice.png" },
    { id: 15,  name: "Home Decor", price: 14000, link: "/decor", image: "image/home decor.png" },
    { id: 13, name: "Cosmetics", price: 14000, link: "/cosmetics",image: "image/cosmetics.png" },
    { id: 18, name: "Spices", price: 14000, link: "/spices" , image: "image/spices.png"},
    { id: 17,name: "Nuts", price: 14000, link: "/nuts" , image: "image/nuts2.png"},
    { id: 12,name: "Cleaning Products", price: 14000, link: "/cleaning", image: "image/cleaning products.png" },
    { id: 6,name: "Spice Jiko", price: 14000,link: "/jiko", image: "image/jiko.png" },
    { id: 7,name: "Ateke Kahawa", price: 14000, link: "/kahawa", image: "image/ateke kahawa.png" },
    { id: 10,name: "Swahili Chilli", price: 14000, link: "/chili", image: "image/chili.png" },
    { id: 20,name: "Olive Oil", price: 14000, link: "/olive", image: "image/oliveoil.png" },
  ]);
  
  const handleSort = (criteria, sortType) => {
    let sortedProducts = [...products];
    if (criteria === 'price-asc') {
      sortedProducts.sort((a, b) => a.price - b.price);
    } else if (criteria === 'price-desc') {
      sortedProducts.sort((a, b) => b.price - a.price);
    } else if (criteria === 'name-asc') {
      sortedProducts.sort((a, b) => a.name.localeCompare(b.name));
    } else if (criteria === 'name-desc') {
      sortedProducts.sort((a, b) => b.name.localeCompare(a.name));
    }
    setFilteredProducts(sortedProducts);
    console.log(`Sorting by: ${sortType}`);
  };

  





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

      if (
        dropdownRef.current && !dropdownRef.current.contains(event.target) &&
        buttonRef.current && !buttonRef.current.contains(event.target)
      ) {
        setShowDropdown(false);
      }
    };

    // Add event listener
    document.addEventListener('mousedown', handleClickOutside);

    // Cleanup event listener on component unmount
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const [searchTerm, setSearchTerm] = useState("");
 
  const navigate = useNavigate();

  

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

      <div className="main-container">
        <Sidebar onFilter={handleFilter} activeCategory={activeCategory} setActiveCategory={setActiveCategory} />

        <div className="products-container">
          <div className="products-header">
            <h1>Products</h1>
            <div>
      <button 
      ref={buttonRef}
      className="btn" 
            style={{ backgroundColor: '#e8f0e9', color: '#000', padding: '10px 15px', fontSize: '1rem', borderRadius: '5px', border: 'none' }}
            onClick={toggleDropdown}>Sort By <IoIosArrowDown className="arrow-icon" /> </button>
      {showDropdown && (
        <ul>
        <li
          onClick={() => handleSort("price-asc")}
          style={{ cursor: "pointer" }}
        >
          Price: Low to High
        </li>
        <li
          onClick={() => handleSort("price-desc")}
          style={{ cursor: "pointer" }}
        >
          Price: High to Low
        </li>
        <li
          onClick={() => handleSort("name-asc")}
          style={{ cursor: "pointer" }}
        >
          Name: A to Z
        </li>
        <li
          onClick={() => handleSort("name-desc")}
          style={{ cursor: "pointer" }}
        >
          Name: Z to A
        </li>
      </ul>
      
      )}
      
    </div>

          </div>

          <div className="filter-output">
            {filteredPrice.min && filteredPrice.max && (
              <p>Showing products between Tsh {filteredPrice.min} and Tsh {filteredPrice.max}</p>
            )}
          </div>


          <div className="products-container">
  <div className="row gx-4">
    {filteredProducts.map((product, index) => (
      <div key={index} className="col-6 col-sm-6 col-md-4">
        <div className="card h-100" style={{ boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)", borderRadius: "10px", overflow: "hidden" }}>
          <Link to={product.link}>
            <img
              src={product.image} // Assuming product.image contains the image path
              className="card-img-top"
              alt={product.name}
              style={{ height: "200px", objectFit: "cover" }}
            />
          </Link>
          <div className="card-body text-left">
            <h5 className="card-title fw-bold">{product.name}</h5>
            <div className="d-flex justify-content-between align-items-center">
              <p className="card-text text-muted mb-0">Tsh {product.price}</p>
              <button
                className="btn btn-primary btn-sm fw-bold"
                onClick={() =>
                  addToCart({
                    id: product.id, // Assuming each product has a unique id
                    name: product.name,
                    price: product.price,
                    unit: "45g", // Adjust the unit if available in the product data
                    image: product.image,
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
</div>
        </div>




      </div>






      <div className='description' >
        <div className="free-delivery-container" style={{ marginBottom: '20px', marginTop: '20px' }}>
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

      <footer className="footer" style={{ margin: 'auto' }}>
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