import { APIRecipes } from '@/apis';
import { createDeleteSlice } from '../boilerplates';

const deleteRecipeSlice = createDeleteSlice('delete-recipe', APIRecipes.deleteRecipe);

export const { remove: deleteRecipe, resetState: resetDeleteRecipeState } = deleteRecipeSlice;

export const selectDeleteRecipe = deleteRecipeSlice.select;
export const deleteRecipeReducer = deleteRecipeSlice.reducer;
