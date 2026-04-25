import apiClient from './apiConfig';

export const publicApi = {
  getShipmentTypes: async () => {
    const response = await apiClient.get('/public/shipment-types');
    return response.data;
  },

  getCalculatorRates: async () => {
    const response = await apiClient.get('/public/calculator/rates');
    return response.data;
  },

  estimateShipment: async (payload) => {
    const response = await apiClient.post('/public/calculator/estimate', payload);
    return response.data;
  },

  trackShipment: async (trackingNumber) => {
    const response = await apiClient.get(`/orders/track/${encodeURIComponent(trackingNumber)}`);
    return response.data;
  },

  submitD2DIntake: async (payload) => {
    const response = await apiClient.post('/public/d2d/intake', payload);
    return response.data;
  },

  subscribeNewsletter: async (email) => {
    const response = await apiClient.post('/public/newsletter/subscribe', { email });
    return response.data;
  },

  getGallery: async (limitPerSection = 20) => {
    const response = await apiClient.get('/public/gallery', {
      params: { limitPerSection },
    });
    return response.data;
  },

  getGalleryAdverts: async (limit = 20) => {
    const response = await apiClient.get('/public/gallery/adverts', {
      params: { limit },
    });
    return response.data;
  },

  presignGalleryClaimUpload: async (payload) => {
    const response = await apiClient.post('/public/gallery/claims/presign', payload);
    return response.data;
  },

  submitAnonymousGalleryClaim: async (trackingNumber, payload) => {
    const response = await apiClient.post(
      `/public/gallery/anonymous/${encodeURIComponent(trackingNumber)}/claim`,
      payload
    );
    return response.data;
  },

  submitCarPurchaseAttempt: async (trackingNumber, payload) => {
    const response = await apiClient.post(
      `/public/gallery/cars/${encodeURIComponent(trackingNumber)}/purchase-attempt`,
      payload
    );
    return response.data;
  },
};
