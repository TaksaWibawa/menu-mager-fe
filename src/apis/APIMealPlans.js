import { AxiosError } from 'axios';
import { instance } from '@/configs';

export const APIMealPlans = {
  getMealPlans: async () => {
    try {
      const response = await instance.get('/availablefood');
      return response.data.data;
    } catch (err) {
      if (err instanceof AxiosError) {
        throw new Error(err.response?.data?.message);
      } else {
        throw new Error(err.message);
      }
    }
  },
  getMealPlan: async ({ id }) => {
    try {
      const response = await instance.get(`/availablefood/${id}`);
      return response.data.data;
    } catch (err) {
      if (err instanceof AxiosError) {
        throw new Error(err.response?.data?.message);
      } else {
        throw new Error(err.message);
      }
    }
  },
  createMealPlan: async ({ startDate, recipe }) => {
    try {
      const response = await instance.post('/availablefood', { startDate, recipe });
      return response.data.data;
    } catch (err) {
      if (err instanceof AxiosError) {
        throw new Error(err.response?.data?.message);
      } else {
        throw new Error(err.message);
      }
    }
  },
  updateMealPlan: async ({ id, startDate, recipe }) => {
    try {
      const response = await instance.put(`/availablefood/${id}`, { startDate, recipe });
      return response.data.data;
    } catch (err) {
      if (err instanceof AxiosError) {
        throw new Error(err.response?.data?.message);
      } else {
        throw new Error(err.message);
      }
    }
  },
  deleteMealPlan: async ({ id }) => {
    try {
      const response = await instance.delete(`/availablefood/${id}`);
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
