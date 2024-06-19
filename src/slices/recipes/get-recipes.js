import { APIRecipes } from '@/apis';
import { createGetAllSlice } from '../boilerplates';

const recipesSlice = createGetAllSlice('recipes', APIRecipes.getRecipes);

export const { fetchAll: getRecipes, resetState: resetRecipesState } = recipesSlice;
export const selectRecipes = recipesSlice.select;
export const recipesReducer = recipesSlice.reducer;
