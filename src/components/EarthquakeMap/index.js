
import React from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import EarthquakeMarker from '../EarthquakeMarker';
import 'leaflet/dist/leaflet.css';

const EarthquakeMap = ({ earthquakeData }) => (
  <MapContainer center={[20, 0]} zoom={2} style={{ height: '90vh', width: '100%' }}>

  {/* Tile Layer implementation  */}
    <TileLayer
      url="http://{s}.google.com/vt/lyrs=p&x={x}&y={y}&z={z}"
      attribution="&copy; <a href='https://www.google.com/maps'>Google Maps</a>"
      subdomains={['mt0', 'mt1', 'mt2', 'mt3']}
      maxZoom={20}
    />


    {earthquakeData?.features.map((feature) => (
      <EarthquakeMarker key={feature.id} feature={feature} />
    ))}
  </MapContainer>
);

export default EarthquakeMap;
