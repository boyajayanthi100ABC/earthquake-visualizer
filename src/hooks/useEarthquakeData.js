// hooks/useEarthquakeData.js
import { useState, useEffect } from 'react';
import { fetchEarthquakeData } from '../api/earthquakeAPI';

export const useEarthquakeData = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);


  // Data fetching for Earthquakes
  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchEarthquakeData();
        setData(data);
      } catch (error) {
        setError(error.message);
      }
    };
    loadData();
  }, []);

  return { data, error };
};
