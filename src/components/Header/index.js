import React from 'react';
import SearchBar from '../SearchBar';

const Header = ({ places, onPlaceSelect }) => {
  return (
    <div>
      <div className="header-div">
        <h2>Earthquake Visualization Application</h2>
      </div>
      <div className="row-center">
        <SearchBar places={places} onPlaceSelect={onPlaceSelect} />
      </div>
    </div>
  );
};

export default Header;
