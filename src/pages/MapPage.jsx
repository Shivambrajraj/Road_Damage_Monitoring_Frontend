// frontend/src/pages/MapPage.jsx
import React, { useState, useEffect } from 'react';
import mapService from '../features/maps/services/mapService';
import MapView from '../features/maps/components/MapView';
import HeatMapLayer from '../features/maps/components/HeatMapLayer';
import { SkeletonMapPanel } from '../shared/components/Skeleton';
import EmptyState from '../shared/components/EmptyState';

const MapPage = () => {
  const [markers, setMarkers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCoordinates = async () => {
      try {
        const data = await mapService.getMapMarkers();
        setMarkers(data || []);
      } catch (err) {
        console.error("Failed to sync GIS layers.");
      } finally {
        setLoading(false);
      }
    };
    fetchCoordinates();
  }, []);

  return (
    <div className="space-y-4 p-4 max-w-7xl mx-auto h-[calc(100vh-80px)] flex flex-col">
      {/* SHARP SYSTEM HEADER SECTION */}
      <div className="border-b border-slate-800 pb-2 flex-shrink-0">
        <h1 className="text-xl font-black text-white tracking-tight uppercase">Geospatial GIS Canvas</h1>
        <p className="text-xs text-slate-400 font-mono">Spatiotemporal telemetry positioning interface</p>
      </div>

      {loading ? (
        <div className="flex-1 min-h-0"><SkeletonMapPanel /></div>
      ) : markers.length === 0 ? (
        <div className="flex-1 min-h-0 flex items-center justify-center rounded-2xl border border-slate-800">
          <EmptyState
            icon="globe"
            title="No geo-tagged detections yet"
            description="Once reports with GPS coordinates come in, they'll appear here as live map markers with severity-based heat clustering."
            ctaLabel="Upload a Report"
            ctaTo="/upload"
          />
        </div>
      ) : (
        <div className="flex-1 min-h-0 rounded-2xl border border-slate-800 overflow-hidden relative shadow-2xl">
          <HeatMapLayer densityPoints={markers} />
          <MapView markers={markers} />
        </div>
      )}
    </div>
  );
};

export default MapPage;