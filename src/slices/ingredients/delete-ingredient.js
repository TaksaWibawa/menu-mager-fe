import { APIIngredients } from '@/apis';
import { createDeleteSlice } from '../boilerplates';

const deleteIngredientSlice = createDeleteSlice('delete-ingredient', APIIngredients.deleteIngredient);

export const { remove: deleteIngredient, resetState: resetDeleteIngredientState } = deleteIngredientSlice;

export const selectDeleteIngredient = deleteIngredientSlice.select;
export const deleteIngredientReducer = deleteIngredientSlice.reducer;
