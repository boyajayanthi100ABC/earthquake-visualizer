import React from 'react';
import SearchBar from '../SearchBar';
import SeverityFilter from '../SeverityFilter';

import './index.css'

const Header = ({ places, onPlaceSelect, setIntensity, intensity }) => {
  return (
    <div>
      <div className="header-container">
        <p className="title"> Earthquake Visualization Application</p>
      </div>
      <div className="filters-container">
        <SearchBar places={places} onPlaceSelect={onPlaceSelect} />
       
        <SeverityFilter intensity={intensity} setIntensity={setIntensity} />
       
      </div>
    </div>
  );
};

export default Header;
