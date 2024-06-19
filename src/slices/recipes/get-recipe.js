import { APIRecipes } from '@/apis';
import { createGetDetailSlice } from '../boilerplates';

const recipeSlice = createGetDetailSlice('recipe', APIRecipes.getRecipe);

export const { fetchDetail: getRecipe, resetState: resetRecipeState } = recipeSlice;

export const selectRecipe = recipeSlice.select;
export const recipeReducer = recipeSlice.reducer;
