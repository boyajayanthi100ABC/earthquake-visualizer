
import axios from 'axios';

const EARTHQUAKE_API_URL = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson';

export const fetchEarthquakeData = async () => {
  try {
    const response = await axios.get(EARTHQUAKE_API_URL);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch earthquake data:", error);
    throw new Error("Could not fetch earthquake data. Please try again later.");
  }
};
