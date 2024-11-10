import React, { useState } from 'react';
import { useEarthquakeData } from './hooks/useEarthquakeData';
import EarthquakeMap from './components/EarthquakeMap';
import ErrorBoundary from './components/ErrorBoundary';
import './App.css';
import Header from './components/Header';
import {TailSpin } from 'react-loader-spinner';

const App = () => {
  const { data, error } = useEarthquakeData();
  const [selectedPlace, setSelectedPlace] = useState(null);

  if (error) return <div className="error">Error: {error}</div>;
  if (!data) return <div className="loading">
    <TailSpin
  visible={true}
  height="80"
  width="80"
  color="skyblue"
  ariaLabel="tail-spin-loading"
  radius="1"
  wrapperStyle={{}}
  wrapperClass=""
  />
  </div>;

// Extract the places from the earthquake data
const places = data.features.map(feature => feature.properties.place);

// Function to handle place selection
const handlePlaceSelect = (place) => {
  const feature = data.features.find(f => f.properties.place === place);
  if (feature) {
    const { coordinates, status, url } = feature.geometry;
    setSelectedPlace({ place, coordinates });
  }
};

  return (
    <div>
    <Header places={places} onPlaceSelect={handlePlaceSelect} /> 
    <ErrorBoundary>
      <EarthquakeMap earthquakeData={data} selectedPlace={selectedPlace}/>
    </ErrorBoundary>
    </div>
  );
};

export default App;
