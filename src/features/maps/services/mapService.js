// frontend/src/features/maps/services/mapService.js
import apiClient from '../../../shared/services/apiClient';

const mapService = {
  getMapMarkers: async () => {
    return await apiClient.get('/maps/markers');
  }
};

export default mapService;