import { AxiosError } from 'axios';
import { instance } from '@/configs';

export const APIAuth = {
  login: async ({ email, password }) => {
    try {
      const response = await instance.post('/admin/login', { email, password });
      return response.data;
    } catch (err) {
      if (err instanceof AxiosError) {
        throw new Error(err.response?.data?.message);
      } else {
        throw new Error(err.message);
      }
    }
  },
};
