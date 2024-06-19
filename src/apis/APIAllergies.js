import { AxiosError } from 'axios';
import { instance } from '@/configs';

export const APIAllergies = {
  getAllergies: async () => {
    try {
      const response = await instance.get('/allergy');
      return response.data.data;
    } catch (err) {
      if (err instanceof AxiosError) {
        throw new Error(err.response?.data?.message);
      } else {
        throw new Error(err.message);
      }
    }
  },
  getAllergy: async ({ id }) => {
    try {
      const response = await instance.get(`/allergy/${id}`);
      return response.data.data;
    } catch (err) {
      if (err instanceof AxiosError) {
        throw new Error(err.response?.data?.message);
      } else {
        throw new Error(err.message);
      }
    }
  },
  createAllergy: async ({ name }) => {
    try {
      const response = await instance.post('/allergy', { name });
      return response.data.data;
    } catch (err) {
      if (err instanceof AxiosError) {
        throw new Error(err.response?.data?.message);
      } else {
        throw new Error(err.message);
      }
    }
  },
  updateAllergy: async ({ id, name }) => {
    try {
      const response = await instance.put(`/allergy/${id}`, { name });
      return response.data.data;
    } catch (err) {
      if (err instanceof AxiosError) {
        throw new Error(err.response?.data?.message);
      } else {
        throw new Error(err.message);
      }
    }
  },
  deleteAllergy: async ({ id }) => {
    try {
      const response = await instance.delete(`/allergy/${id}`);
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
