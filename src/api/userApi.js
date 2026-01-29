import apiClient from './apiConfig';

export const userApi = {
  login: async (credentials) => {
    const response = await apiClient.post('/auth/login', credentials);
    return response.data;
  },

  register: async (userData) => {
    const response = await apiClient.post('/auth/register', userData);
    return response.data;
  },

  getCurrentUser: async () => {
    const response = await apiClient.get('/users/me');
    return response.data;
  },

  updateProfile: async (userId, userData) => {
    const response = await apiClient.put(`/users/${userId}`, userData);
    return response.data;
  },

  logout: async () => {
    const response = await apiClient.post('/auth/logout');
    return response.data;
  },
};
