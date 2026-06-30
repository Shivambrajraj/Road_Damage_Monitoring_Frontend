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

// Custom marker for your current live location (Red Pin to separate from reports)
const liveLocationIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
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
  const defaultPosition = [22.5251, 75.9208]; // IIT Indore fallback, used only if geolocation is denied/unavailable
  const [mapCenter, setMapCenter] = useState(defaultPosition);
  const [currentUserPos, setCurrentUserPos] = useState(null);

  // Always try to grab the user's real-time browser location first, and
  // center the map there the moment it's available.
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const liveCoords = [position.coords.latitude, position.coords.longitude];
          setCurrentUserPos(liveCoords);
          setMapCenter(liveCoords);
        },
        (error) => {
          console.log("Geolocation blocked or unavailable, falling back.");
          if (markers.length > 0) {
            const lat = parseFloat(markers[0].latitude);
            const lng = parseFloat(markers[0].longitude);
            if (!isNaN(lat) && !isNaN(lng)) {
              setMapCenter([lat, lng]);
            }
          }
        }
      );
    } else if (markers.length > 0) {
      const lat = parseFloat(markers[0].latitude);
      const lng = parseFloat(markers[0].longitude);
      if (!isNaN(lat) && !isNaN(lng)) {
        setMapCenter([lat, lng]);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="w-full aspect-video bg-slate-950 border border-sky-500/30 rounded-2xl overflow-hidden shadow-2xl shadow-sky-500/10 relative z-0">
      <MapContainer 
        center={mapCenter} 
        zoom={14} 
        scrollWheelZoom={true}
        className="w-full h-full"
      >
        <ChangeView center={mapCenter} />

        {/* Colorful Voyager tile layer */}
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
        />

        {/* 1. LIVE LOCATION PIN */}
        {currentUserPos && (
          <Marker position={currentUserPos} icon={liveLocationIcon}>
            <Popup>
              <div className="text-slate-900 font-semibold p-1">
                📍 You Are Here (Current Live Position)
              </div>
            </Popup>
          </Marker>
        )}

        {/* 2. DYNAMIC DATABASE MARKERS */}
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