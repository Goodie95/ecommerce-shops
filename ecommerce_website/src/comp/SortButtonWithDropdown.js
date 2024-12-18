import React, { useState } from 'react';
import './home.css'; // Ensure this includes necessary styles for the dropdown

const SortButtonWithDropdown = ({ onSort }) => {
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const sortOptions = ["Price: Low to High", "Price: High to Low", "Newest Arrivals", "Best Sellers"];

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const handleOptionClick = (option) => {
    console.log(`Selected: ${option}`);
    onSort(option); // Pass selected option to parent component
    setDropdownVisible(false); // Close the dropdown after selecting
  };

  return (
    <div className="sort-button-container">
      <button className="sort-button" onClick={toggleDropdown}>
        Sort By
      </button>
      {dropdownVisible && (
        <div className="dropdown-menu">
          {sortOptions.map((option, index) => (
            <div
              key={index}
              className="dropdown-item"
              onClick={() => handleOptionClick(option)}
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SortButtonWithDropdown;
