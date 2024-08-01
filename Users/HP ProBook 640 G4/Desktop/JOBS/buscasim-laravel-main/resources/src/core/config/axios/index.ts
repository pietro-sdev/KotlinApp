import axios, { AxiosError, AxiosRequestHeaders } from 'axios';
import { getAuthToken, removeAuthToken } from '@/core/providers';
import { showError } from '@/core/utils';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  let newHeaders = {
    ...config.headers,
  };

  const token = getAuthToken();

  if (token) {
    newHeaders = {
      ...newHeaders,
      Authorization: `Bearer ${token}`,
    };
  }

  config.headers = { ...newHeaders } as AxiosRequestHeaders;

  return config;
});

api.interceptors.response.use(
  (res) => res.data,
  (error) => {
    const { response } = error as AxiosError;
    const isOrder = response?.config.url?.includes('/orders');

    if (response?.status === 401) {
      removeAuthToken();

      if (!isOrder) {
        showError('Sua sessão expirou. Faça o login novamente.');
        setTimeout(() => {
          removeAuthToken();
          window.location.href = '/';
        }, 1000);
      }

      return;
    }

    return Promise.reject(error);
  }
);

export default api;
