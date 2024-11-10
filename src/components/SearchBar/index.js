import React, { useState } from 'react';

const SearchBar = ({ places, onPlaceSelect }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredPlaces, setFilteredPlaces] = useState(places);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);  // Track dropdown visibility

  const handleSearchChange = (event) => {
    const term = event.target.value.toLowerCase();
    setSearchTerm(term);

    // Filter places based on the search term
    setFilteredPlaces(places.filter(place => place.toLowerCase().includes(term)));
  };

  const handlePlaceSelect = (place) => {
    setSearchTerm(place);
    onPlaceSelect(place);  
    setIsDropdownOpen(false);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen); 
  };

  return (
    <div className="search-bar">
        <div className="row-align-center">
      <input
        type="text"
        value={searchTerm}
        onChange={handleSearchChange}
        onClick={toggleDropdown}  
        placeholder="Search for a location..."
        className="search-bar-input"
      />
      <img src="./magnifying-glass-solid.svg" className="search-icon" />
      </div>

      {isDropdownOpen && filteredPlaces.length > 0 && (
        <ul className="dropdown-list" style={{ width: '300px', position: 'absolute', zIndex: 999 }}>
          {filteredPlaces.map((place, index) => (
            <li key={index} onClick={() => handlePlaceSelect(place)}>
              {place}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
