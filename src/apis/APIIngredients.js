import { AxiosError } from 'axios';
import { instance } from '@/configs';

export const APIIngredients = {
  getIngredients: async () => {
    try {
      const response = await instance.get('/material');
      return response.data.data;
    } catch (err) {
      if (err instanceof AxiosError) {
        throw new Error(err.response?.data?.message);
      } else {
        throw new Error(err.message);
      }
    }
  },
  getIngredient: async ({ id }) => {
    try {
      const response = await instance.get(`/material/${id}`);
      return response.data.data;
    } catch (err) {
      if (err instanceof AxiosError) {
        throw new Error(err.response?.data?.message);
      } else {
        throw new Error(err.message);
      }
    }
  },
  createIngredient: async ({ name, photo }) => {
    try {
      const data = new FormData();
      data.append('name', name);
      data.append('photo', photo);

      const response = await instance.post('/material', data, {
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
  updateIngredient: async ({ id, name, photo }) => {
    try {
      const data = new FormData();
      data.append('name', name);
      data.append('photo', photo);

      const response = await instance.put(`/material/${id}`, data, {
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
  deleteIngredient: async ({ id }) => {
    try {
      const response = await instance.delete(`/material/${id}`);
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
