import React, { useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import EarthquakeMarker from '../EarthquakeMarker';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import './index.css';

const EarthquakeMap = ({ earthquakeData, selectedPlace }) => {
  const mapRef = useRef();

  useEffect(() => {
    if (selectedPlace) {
      const { coordinates } = selectedPlace;
      const map = mapRef.current;
      map.setView([coordinates[1], coordinates[0]], 8); 

      // Find the marker corresponding to the selected place and open the popup
      const marker = earthquakeData.features.find(feature => feature.properties.place === selectedPlace.place);
      if (marker) {
        const markerPosition = [marker.geometry.coordinates[1], marker.geometry.coordinates[0]];
        const popup = L.popup()
          .setLatLng(markerPosition)
          .setContent(`
            <p><strong>Earthquake Magnitude:</strong> ${marker.properties.mag}</p>
            <p><strong>Location:</strong> ${marker.properties.place}</p>
            <p><strong>Date and Time:</strong> ${new Date(marker.properties.time).toLocaleString()}</p>
            <p><strong>Depth:</strong> ${coordinates[2]} km</p>
            <p><strong>Status:</strong> ${marker.properties.status} </p>
            <a href="${marker.properties.url}" target="_blank" rel="noopener noreferrer">More Info</a>      
          `)
          .openOn(map);
      }
    }
  }, [selectedPlace, earthquakeData]);

  return (
    <MapContainer center={[20, 0]} zoom={2} style={{ height: '90vh', width: '100%' }} ref={mapRef}>
      <TileLayer
        url="http://{s}.google.com/vt/lyrs=p&x={x}&y={y}&z={z}"
        attribution="&copy; <a href='https://www.google.com/maps'>Google Maps</a>"
        subdomains={['mt0', 'mt1', 'mt2', 'mt3']}
        maxZoom={10}
      />

      {earthquakeData?.features.map((feature) => (
        <EarthquakeMarker key={feature.id} feature={feature} />
      ))}
    </MapContainer>
  );
};

export default EarthquakeMap;
