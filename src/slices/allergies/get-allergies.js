import { APIAllergies } from '@/apis';
import { createGetAllSlice } from '../boilerplates';

const allergiesSlice = createGetAllSlice('allergies', APIAllergies.getAllergies);

export const { fetchAll: getAllergies, resetState: resetAllergiesState } = allergiesSlice;
export const selectAllergies = allergiesSlice.select;
export const allergiesReducer = allergiesSlice.reducer;
