import { APIRecipes } from '@/apis';
import { createCreateSlice } from '../boilerplates';

const createRecipeSlice = createCreateSlice('create-recipe', APIRecipes.createRecipe);

export const { create: createRecipe, resetState: resetCreateRecipeState } = createRecipeSlice;

export const selectCreateRecipe = createRecipeSlice.select;
export const createRecipeReducer = createRecipeSlice.reducer;
