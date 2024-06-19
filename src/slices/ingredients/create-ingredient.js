import { APIIngredients } from '@/apis';
import { createCreateSlice } from '../boilerplates';

const createIngredientSlice = createCreateSlice('create-ingredient', APIIngredients.createIngredient);

export const { create: createIngredient, resetState: resetCreateIngredientState } = createIngredientSlice;

export const selectCreateIngredient = createIngredientSlice.select;
export const createIngredientReducer = createIngredientSlice.reducer;
