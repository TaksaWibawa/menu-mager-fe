import { AxiosError } from 'axios';
import { instance } from '../configs';

export const APIUser = {
  createSubscriptionDelivery: async (subscriptionDelivery) => {
    try {
      const response = await instance.post('/register', subscriptionDelivery);
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
