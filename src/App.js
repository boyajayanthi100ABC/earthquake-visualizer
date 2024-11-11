import React, { useState, useEffect } from 'react';
import { useEarthquakeData } from './hooks/useEarthquakeData';
import EarthquakeMap from './components/EarthquakeMap';
import ErrorBoundary from './components/ErrorBoundary';
import './App.css';
import Header from './components/Header';
import {TailSpin } from 'react-loader-spinner';

const App = () => {
  const { data, error } = useEarthquakeData();
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [places, setPlaces] = useState([]);
  const [intensity, setIntensity] = useState("");

  useEffect(() => {
    if (data) {
      const places = getFilteredData().features.map(
        (feature) => feature.properties.place
      );
      setPlaces(places);
    }
    setSelectedPlace(null);
  }, [data, intensity]);

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

// Function to handle place selection
const handlePlaceSelect = (place) => {
  const feature = data.features.find(f => f.properties.place === place);
  if (feature) {
    const { coordinates, status, url } = feature.geometry;
    setSelectedPlace({ place, coordinates });
  }
};

const getFilteredData = () => {
  let lowerLimit = -100;
  let higherLimit = 10;

  switch (intensity) {
    case "LOW":
      lowerLimit = -100;
      higherLimit = 3;
      break;
    case "MEDIUM":
      lowerLimit = 3;
      higherLimit = 5;
      break;
    case "HIGH":
      lowerLimit = 5;
      higherLimit = 10;
      break;
  }
  const filteredData = {
    ...data,
    features: [
      ...data.features.filter(
        (eachFeature) =>
          eachFeature.properties.mag >= lowerLimit &&
          eachFeature.properties.mag < higherLimit
      ),
    ],
  };

  return filteredData;
};

  return (
    <div>
    <Header places={places} onPlaceSelect={handlePlaceSelect} intensity={intensity} setIntensity={setIntensity} /> 
    <ErrorBoundary>
      <EarthquakeMap earthquakeData={getFilteredData()} selectedPlace={selectedPlace}/>
    </ErrorBoundary>
    </div>
  );
};

export default App;
