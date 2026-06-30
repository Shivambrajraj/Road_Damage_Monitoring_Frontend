// frontend/src/features/maps/components/MapView.jsx
import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import MarkerPopup from './MarkerPopup';

// Fix native Leaflet asset mapping glitches using unpkg CDN URLs
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

/**
 * Sub-module ensuring coordinate state changes dynamically reposition the lens matrix
 */
const ChangeView = ({ center }) => {
  const map = useMap();
  useEffect(() => {
    map.setView(center, map.getZoom());
  }, [center, map]);
  return null;
};

const MapView = ({ markers = [] }) => {
  const defaultPosition = [22.5251, 75.9208]; // IIT Indore fallback
  const [mapCenter, setMapCenter] = useState(defaultPosition);

  // Attempt to grab the user's real-time browser location on load
  useEffect(() => {
    if (markers.length > 0) {
      const lat = parseFloat(markers[0].latitude);
      const lng = parseFloat(markers[0].longitude);
      if (!isNaN(lat) && !isNaN(lng)) {
        setMapCenter([lat, lng]);
      }
    } else if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setMapCenter([position.coords.latitude, position.coords.longitude]);
        },
        (error) => {
          console.log("Geolocation blocked or unavailable, using fallback center.");
        }
      );
    }
  }, [markers]);

  return (
    <div className="w-full aspect-video bg-slate-950 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl relative z-0">
      
      <MapContainer 
        center={mapCenter} 
        zoom={13} 
        scrollWheelZoom={true}
        className="w-full h-full"
      >
        <ChangeView center={mapCenter} />

        {/* High-contrast dark-matter map grid layer perfectly matching your UI vibe */}
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        />

        {/* Dynamic Mapping Pin Iteration */}
        {markers.map((marker) => {
          const lat = parseFloat(marker.latitude);
          const lng = parseFloat(marker.longitude);
          
          if (isNaN(lat) || isNaN(lng)) return null;

          return (
            <Marker key={marker.id} position={[lat, lng]}>
              <Popup className="custom-leaflet-popup">
                <MarkerPopup marker={marker} onClose={() => {}} />
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>

    </div>
  );
};

export default MapView;