import React from 'react';
import { useEarthquakeData } from './hooks/useEarthquakeData';
import EarthquakeMap from './components/EarthquakeMap';
import ErrorBoundary from './components/ErrorBoundary';
import './App.css';
import Header from './components/Header';
import {TailSpin } from 'react-loader-spinner';

const App = () => {
  const { data, error } = useEarthquakeData();

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

  return (
    <div>
    <Header />
    <ErrorBoundary>
      <EarthquakeMap earthquakeData={data} />
    </ErrorBoundary>
    </div>
  );
};

export default App;
