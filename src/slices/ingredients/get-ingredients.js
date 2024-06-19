import { APIIngredients } from '@/apis';
import { createGetAllSlice } from '../boilerplates';

const ingredientsSlice = createGetAllSlice('ingredients', APIIngredients.getIngredients);

export const { fetchAll: getIngredients, resetState: resetIngredientsState } = ingredientsSlice;
export const selectIngredients = ingredientsSlice.select;
export const ingredientsReducer = ingredientsSlice.reducer;
