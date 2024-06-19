import axios from 'axios';
import Cookies from 'js-cookie';

export const instance = axios.create({
  baseURL: process.env.BASE_API_URL,
  headers: {
    Accept: 'application/json',
  },
});

instance.interceptors.request.use((config) => {
  const token = Cookies.get('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  } else {
    delete instance.defaults.headers.common.Authorization;
  }

  if (config.headers['Content-Type'] === 'multipart/form-data') {
    delete config.headers['Content-Type'];
  } else {
    config.headers['Content-Type'] = 'application/json';
  }

  return config;
});
