// components/EarthquakeMarker.js
import React from 'react';
import { Marker, Popup, Tooltip } from 'react-leaflet';
import L from 'leaflet';


// Define the icons for different magnitudes
const weakIcon = new L.Icon({
  iconUrl: './location-dot-green-solid.svg',
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

const moderateIcon = new L.Icon({
  iconUrl: './location-dot-yellow-solid.svg',
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

const strongIcon = new L.Icon({
  iconUrl: './location-dot-solid.svg',
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});



const EarthquakeMarker = ({ feature }) => {
  const { coordinates } = feature.geometry;
  const { mag, place, url, status, time } = feature.properties;


  // Determine the appropriate icon based on magnitude
  let earthquakeIcon;
  if (mag < 3) {
    earthquakeIcon = weakIcon; // Weak (Magnitude < 3)
  } else if (mag >= 3 && mag < 5) {
    earthquakeIcon = moderateIcon; // Moderate (3 <= Magnitude < 5)
  } else {
    earthquakeIcon = strongIcon; // Strong (Magnitude >= 5)
  }

  // Convert Unix timestamp to Date object
  const timestamp = new Date(time);

  // Format the timestamp into a human-readable format
  const formattedTime = timestamp.toLocaleString('en-US', {
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric', 
    hour: '2-digit', 
    minute: '2-digit', 
    second: '2-digit', 
    timeZoneName: 'short',
  });


  return (

    // Marker to point out the location
    <Marker position={[coordinates[1], coordinates[0]]} icon={earthquakeIcon}>  

      <Tooltip direction="top" offset={[0, -32]} opacity={1} permanent={false}>
        {place}
      </Tooltip>



    {/* Pop up appears when we click on the marker  */}
      <Popup>
        <p><strong> Earthquake Magnitude: </strong> {mag} </p>
        <p><strong>Location:</strong> {place}</p>
        <p><strong>Date and Time:</strong> {formattedTime}</p>
        <p><strong>Depth:</strong> {coordinates[2]} km</p>
        <p><strong>Status:</strong> { status } </p>
        <a href={url} target="_blank" rel="noopener noreferrer">More Info</a>

      </Popup>
    </Marker>
  );
};

export default EarthquakeMarker;
