import { APIIngredients } from '@/apis';
import { createGetDetailSlice } from '../boilerplates';

const ingredientSlice = createGetDetailSlice('ingredient', APIIngredients.getIngredient);

export const { fetchDetail: getIngredient, resetState: resetIngredientState } = ingredientSlice;

export const selectIngredient = ingredientSlice.select;
export const ingredientReducer = ingredientSlice.reducer;
