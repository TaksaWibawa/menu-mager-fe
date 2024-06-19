import { APIIngredients } from '@/apis';
import { createUpdateSlice } from '../boilerplates';

const updateIngredientSlice = createUpdateSlice('update-ingredient', APIIngredients.updateIngredient);

export const { update: updateIngredient, resetState: resetUpdateIngredientState } = updateIngredientSlice;

export const selectUpdateIngredient = updateIngredientSlice.select;
export const updateIngredientReducer = updateIngredientSlice.reducer;
