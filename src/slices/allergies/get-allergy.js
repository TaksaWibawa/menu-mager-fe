import { APIAllergies } from '@/apis';
import { createGetDetailSlice } from '../boilerplates';

const allergySlice = createGetDetailSlice('allergy', APIAllergies.getAllergy);

export const { fetchDetail: getAllergy, resetState: resetAllergyState } = allergySlice;

export const selectAllergy = allergySlice.select;
export const allergyReducer = allergySlice.reducer;
