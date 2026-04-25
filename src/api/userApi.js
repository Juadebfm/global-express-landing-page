import apiClient from './apiConfig';

const cleanPartialPayload = (payload = {}) =>
  Object.fromEntries(
    Object.entries(payload).filter(([, value]) => value !== undefined)
  );

export const userApi = {
  login: async (credentials) => {
    const response = await apiClient.post('/auth/login', credentials);
    return response.data;
  },

  syncAuth: async (clerkToken) => {
    const response = await apiClient.post('/auth/sync', null, {
      headers: clerkToken
        ? {
            Authorization: `Bearer ${clerkToken}`,
          }
        : undefined,
      meta: {
        requiresAuth: true,
      },
    });
    return response.data;
  },

  getCurrentUser: async () => {
    const response = await apiClient.get('/users/me', {
      meta: {
        requiresAuth: true,
      },
    });
    return response.data;
  },

  updateProfile: async (id, userData = {}) => {
    const response = await apiClient.patch(`/users/${id}`, cleanPartialPayload(userData), {
      meta: {
        requiresAuth: true,
      },
    });
    return response.data;
  },

  logout: async () => {
    const response = await apiClient.post('/auth/logout', null, {
      meta: {
        requiresAuth: true,
      },
    });
    return response.data;
  },
};
