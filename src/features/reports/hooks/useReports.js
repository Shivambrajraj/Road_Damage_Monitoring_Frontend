// frontend/src/features/reports/hooks/useReports.js
import { useState, useEffect, useCallback } from 'react';
import reportService from '../services/reportService';

export const useReports = (initialFilters = {}) => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState(initialFilters);

  const fetchReports = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await reportService.getReports(filters);
      // Fallback to empty array if backend returns simple arrays instead of pagination wrappers
      setReports(Array.isArray(data) ? data : data.items || []);
    } catch (err) {
      setError(err.message || 'Failed to sync spatiotemporal data logs.');
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    fetchReports();
  }, [fetchReports]);

  return { reports, loading, error, filters, setFilters, refetch: fetchReports };
};