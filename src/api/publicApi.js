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

  submitD2DIntake: async (payload, captchaToken) => {
    const response = await apiClient.post('/public/d2d/intake', payload, {
      headers: captchaToken ? { 'cf-turnstile-response': captchaToken } : {},
    });
    return response.data;
  },

  subscribeNewsletter: async (email, captchaToken) => {
    const response = await apiClient.post('/public/newsletter/subscribe', { email }, {
      headers: captchaToken ? { 'cf-turnstile-response': captchaToken } : {},
    });
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

  getPublicShopVehicles: async (page = 1, limit = 20) => {
    const response = await apiClient.get('/public/shop/vehicles', {
      params: { page, limit },
    });
    return response.data;
  },

  getPublicShopItems: async (page = 1, limit = 20) => {
    const response = await apiClient.get('/public/shop/items', {
      params: { page, limit },
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

  submitPublicVehicleInquiry: async (listingId, payload, captchaToken) => {
    const response = await apiClient.post(
      `/public/shop/vehicles/${encodeURIComponent(listingId)}/inquiries`,
      payload,
      { headers: captchaToken ? { 'cf-turnstile-response': captchaToken } : {} }
    );
    return response.data;
  },

  submitAuthenticatedShopItemInquiry: async (listingId, payload) => {
    const response = await apiClient.post(
      `/shop/items/${encodeURIComponent(listingId)}/inquiries`,
      payload,
      {
        meta: { requiresAuth: true },
      }
    );
    return response.data;
  },

  submitContactInquiry: async (payload, captchaToken) => {
    const response = await apiClient.post('/public/contact', payload, {
      headers: captchaToken ? { 'cf-turnstile-response': captchaToken } : {},
    });
    return response.data;
  },
};
