// frontend/src/features/reports/hooks/useUpload.js
import { useState } from 'react';
import reportService from '../services/reportService';

export const useUpload = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const uploadPayload = async (formData) => {
    setIsSubmitting(true);
    setError(null);
    setSuccess(false);
    try {
      const result = await reportService.createReport(formData);
      setSuccess(true);
      return result;
    } catch (err) {
      setError(err.message || 'Anomaly batch analysis run execution halted.');
      throw err;
    } finally {
      setIsSubmitting(false);
    }
  };

  return { uploadPayload, isSubmitting, error, success };
};