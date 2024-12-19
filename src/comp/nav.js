import React from 'react'
import { MdLocalShipping } from 'react-icons/md';
import { MdArrowDropDown } from 'react-icons/md';
import { IoIosSearch } from 'react-icons/io';
import { IoBagOutline } from "react-icons/io5";
import { IoPersonOutline } from "react-icons/io5";
import { IoIosArrowDown } from "react-icons/io";
import './nav.css'
const Nav = () => {
  return (
    <>
    <div className='header'>
    <div className='top_header'>
        <div className='logo'>
             <img src='image/logo eshops.png' alt='logo'></img>
        </div>

        {/* Menu element */}
        <div className='menu'>
        <span className='equal-sign'>≡</span> {/* Equal sign (≡) */}
            <span>Menu</span> {/* Menu text */}
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
        <span></span> {/* Search text */}
            </div>

            <div className='separator'>
            <span className="separator">|</span> {/* Separator */}
            </div>

            <div className="icon-menu">
             <IoBagOutline className="bag-icon" />
            </div>

            <div className='separator'>
            <span className="separator">|</span> {/* Separator */}
            </div>

            <div className="account-menu">
             <IoPersonOutline className="account-icon" />
            </div>
           

        </div>
    </div>
    </>
  )
}

export default Nav