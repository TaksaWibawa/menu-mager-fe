import { instance } from '@/configs';
import { AxiosError } from 'axios';

export const APISubscriptionPlans = {
  createSubscriptionPlan: async ({ pricePerServing, preferences }) => {
    try {
      const response = await instance.post('/plan', { pricePerServing, preferences });
      return response.data.data;
    } catch (err) {
      if (err instanceof AxiosError) {
        throw new Error(err.response?.data?.message);
      } else {
        throw new Error(err.message);
      }
    }
  },
  updateSubscriptionPlan: async ({ pricePerServing, preferences }) => {
    try {
      const response = await instance.put(`/plan`, { pricePerServing, preferences });
      return response.data.data;
    } catch (err) {
      if (err instanceof AxiosError) {
        throw new Error(err.response?.data?.message);
      } else {
        throw new Error(err.message);
      }
    }
  },
  getSubscriptionPlan: async () => {
    try {
      const response = await instance.get('/plan');
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
