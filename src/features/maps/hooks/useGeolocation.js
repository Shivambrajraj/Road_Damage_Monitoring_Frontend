// frontend/src/features/maps/hooks/useGeolocation.js
import { useState, useEffect } from 'react';

export const useGeolocation = () => {
  const [coords, setCoords] = useState({ latitude: 22.5251, longitude: 75.9208 }); // Default fallback to IIT Indore coordinates
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!navigator.geolocation) {
      setError('Geospatial position acquisition vector unsupported by device matrix.');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setCoords({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        });
      },
      (err) => {
        setError(`Position telemetry lock failed: ${err.message}`);
      }
    );
  }, []);

  return { coords, error };
};