// frontend/src/features/maps/components/MapView.jsx
import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

const MapView = ({ markers }) => {
  // Default coordinates centered on operations
  const defaultCenter = [22.5204, 75.9207]; 

  return (
    <MapContainer center={defaultCenter} zoom={13} className="h-full w-full z-0">
      
      {/* 1. BRIGHT MAP TILES (Replaces the dark theme instantly) */}
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
        url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
      />

      {markers && markers.map((marker) => (
        <Marker key={marker.id} position={[marker.latitude, marker.longitude]}>
          <Popup>
            {/* 2. SHARP HIGH-CONTRAST POPUP TEXT */}
            <div className="p-2 text-slate-900 bg-white min-w-[160px] rounded-lg">
              <h4 className="font-bold text-xs border-b border-slate-200 pb-1 mb-1 text-slate-950 uppercase tracking-wide">
                {marker.damage_type || 'Road Anomaly'}
              </h4>
              <p className="text-[10px] font-mono text-slate-600 mt-1">
                Severity: <span className="font-bold text-red-600">{marker.severity || 'Medium'}</span>
              </p>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default MapView;