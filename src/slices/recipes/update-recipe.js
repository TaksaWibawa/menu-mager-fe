import { APIRecipes } from '@/apis';
import { createUpdateSlice } from '../boilerplates';

const updateRecipeSlice = createUpdateSlice('update-recipe', APIRecipes.updateRecipe);

export const { update: updateRecipe, resetState: resetUpdateRecipeState } = updateRecipeSlice;

export const selectUpdateRecipe = updateRecipeSlice.select;
export const updateRecipeReducer = updateRecipeSlice.reducer;
