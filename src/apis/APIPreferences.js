import { AxiosError } from 'axios';
import { instance } from '@/configs';

export const APIPreferences = {
  getPreferences: async () => {
    try {
      const response = await instance.get('/preference');
      return response.data.data;
    } catch (err) {
      if (err instanceof AxiosError) {
        throw new Error(err.response?.data?.message);
      } else {
        throw new Error(err.message);
      }
    }
  },
  getPreference: async ({ id }) => {
    try {
      const response = await instance.get(`/preference/${id}`);
      return response.data.data;
    } catch (err) {
      if (err instanceof AxiosError) {
        throw new Error(err.response?.data?.message);
      } else {
        throw new Error(err.message);
      }
    }
  },
  createPreference: async ({ name, photo }) => {
    try {
      const data = new FormData();
      data.append('name', name);
      data.append('photo', photo);

      const response = await instance.post('/preference', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data.data;
    } catch (err) {
      if (err instanceof AxiosError) {
        throw new Error(err.response?.data?.message);
      } else {
        throw new Error(err.message);
      }
    }
  },
  updatePreference: async ({ id, name, photo }) => {
    try {
      const data = new FormData();
      data.append('name', name);
      data.append('photo', photo);

      const response = await instance.put(`/preference/${id}`, data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data.data;
    } catch (err) {
      if (err instanceof AxiosError) {
        throw new Error(err.response?.data?.message);
      } else {
        throw new Error(err.message);
      }
    }
  },
  deletePreference: async ({ id }) => {
    try {
      const response = await instance.delete(`/preference/${id}`);
      return response.data.data;
    } catch (err) {
      if (err instanceof AxiosError) {
        throw new Error(err.response?.data?.message);
      } else {
        throw new Error(err.message);
      }
    }
  },
};
