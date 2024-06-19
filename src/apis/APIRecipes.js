import { AxiosError } from 'axios';
import { instance } from '@/configs';

export const APIRecipes = {
  getRecipes: async () => {
    try {
      const response = await instance.get('/recipe');
      return response.data.data;
    } catch (err) {
      if (err instanceof AxiosError) {
        throw new Error(err.response?.data?.message);
      } else {
        throw new Error(err.message);
      }
    }
  },
  getRecipe: async ({ id }) => {
    try {
      const response = await instance.get(`/recipe/${id}`);
      return response.data.data;
    } catch (err) {
      if (err instanceof AxiosError) {
        throw new Error(err.response?.data?.message);
      } else {
        throw new Error(err.message);
      }
    }
  },
  createRecipe: async ({ name, description, preferences, allergy, instruction, material, photo }) => {
    try {
      const data = new FormData();
      data.append('name', name);
      data.append('description', description);
      data.append('preferences', JSON.stringify(preferences));
      data.append('allergy', JSON.stringify(allergy));
      data.append('instruction', JSON.stringify(instruction));
      data.append('material', JSON.stringify(material));
      data.append('photo', photo);

      const response = await instance.post('/recipe', data, {
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
  updateRecipe: async ({ id, name, description, preferences, allergy, instruction, material, photo }) => {
    try {
      const data = new FormData();
      data.append('name', name);
      data.append('description', description);
      data.append('preferences', JSON.stringify(preferences));
      data.append('allergy', JSON.stringify(allergy));
      data.append('instruction', JSON.stringify(instruction));
      data.append('material', JSON.stringify(material));
      data.append('photo', photo);

      const response = await instance.put(`/recipe/${id}`, data, {
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
  deleteRecipe: async ({ id }) => {
    try {
      const response = await instance.delete(`/recipe/${id}`);
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
