import React from 'react';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Nav from './comp/nav';
import SignIn from './comp/sign-in';
import SignUp from './comp/sign-up';
import Home from './comp/home';
import Plans from './comp/plans';
import Products from './comp/products';
import Cart from './comp/cart';
import Profile from './comp/profile';
import Karanga from './comp/karanga';
import Asali from './comp/asali';
import Candle from './comp/candle';
import Coconut from './comp/coconut';
import Food from './comp/food';
import Cosmetics from './comp/cosmetics';
import Cleaning from './comp/cleaning';
import Nuts from './comp/nuts';
import Decor from './comp/decor';
import Spices from './comp/spices';
import Honey from './comp/honey';
import Spicy from './comp/spicy';
import Kahawa from './comp/kahawa';
import Asa from './comp/asa';
import Kibegi from './comp/kibegi';
import Olive from './comp/olive';
import Chili from './comp/chili';
import Mixed from './comp/mixed';
import { CartProvider } from './comp/CartContext';


function App() {
  return (
    
    <Router>
      <Routes>
        {/* Default route for root path */}
        <Route path="/" element={<Home />} />
        
        <Route path="/signin" element={<SignIn />} />
        <Route path="/nav" element={<Nav />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/home" element={<Home />} />
        <Route path="/karanga" element={<Karanga />} />
        <Route path="/asali" element={<Asali />} />
        <Route path="/candle" element={<Candle />} />
        <Route path="/coconut" element={<Coconut />} />
        <Route path="/food" element={<Food />} />
        <Route path="/cosmetics" element={<Cosmetics />} />
        <Route path="/cleaning" element={<Cleaning />} />
        <Route path="/nuts" element={<Nuts />} />
        <Route path="/decor" element={<Decor />} />
        <Route path="/spices" element={<Spices />} />
        <Route path="/honey" element={<Honey />} />
        <Route path="/spicy" element={<Spicy />} />
        <Route path="/kahawa" element={<Kahawa />} />
        <Route path="/asa" element={<Asa />} />
        <Route path="/kibegi" element={<Kibegi />} />
        <Route path="/olive" element={<Olive />} />
        <Route path="/chili" element={<Chili />} />
        <Route path="/mixed" element={<Mixed />} />
        <Route path="/plans" element={<Plans />} />
        <Route path="/products" element={<Products />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/profile" element={<Profile />} />
        
        

    
      </Routes>
    </Router>

    
  );
}

export default App;
