import React from 'react';
import { MdLocalShipping } from 'react-icons/md';
import { MdArrowDropDown } from 'react-icons/md';
import { IoIosSearch } from 'react-icons/io';
import { IoBagOutline } from "react-icons/io5";
import { IoPersonOutline } from "react-icons/io5";
import { IoIosArrowDown } from "react-icons/io";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

const Nav = () => {
  return (
    <>
      <div className="header bg-white d-flex align-items-center py-3 px-4">
        {/* Logo */}
        <div className="top_header d-flex align-items-center me-4">
          <div className="logo">
            <img src="image/logo eshops.png" alt="logo" className="img-fluid" style={{ width: '155px', height: '63px' }} />
          </div>
        </div>

        {/* Menu */}
        <div className="menu d-flex align-items-center px-3 py-2 bg-light rounded me-4">
          <span className="equal-sign text-primary fw-bold me-2">≡</span>
          <span className="text-primary fw-bold">Menu</span>
        </div>

        {/* Input Container */}
        <div className="input-container d-flex align-items-center bg-light rounded-pill px-3 py-2 flex-grow-1 me-4">
          <span className="all-items text-secondary fw-bold me-3">All items</span>
          <IoIosArrowDown className="text-secondary fs-5 me-3" />
          <div className="separator text-muted mx-2">|</div>
          <input
            type="text"
            className="form-control border-0 bg-transparent"
            placeholder="Search..."
          />
        </div>

        {/* Search Icon */}
        <div className="search-menu d-flex align-items-center justify-content-center bg-light rounded-circle shadow-sm me-3 p-2">
          <IoIosSearch className="text-primary fs-4" />
        </div>

        {/* Separator */}
        <div className="separator text-muted mx-2">|</div>

        {/* Cart Icon */}
        <div className="icon-menu d-flex align-items-center justify-content-center bg-light rounded-circle shadow-sm me-3 p-2">
          <IoBagOutline className="text-primary fs-4" />
        </div>

        {/* Separator */}
        <div className="separator text-muted mx-2">|</div>

        {/* Account Icon */}
        <div className="account-menu d-flex align-items-center justify-content-center bg-light rounded-circle shadow-sm p-2">
          <IoPersonOutline className="text-primary fs-4" />
        </div>
      </div>
    </>
  );
};

export default Nav;