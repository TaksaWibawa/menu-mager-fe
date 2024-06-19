import { APIAllergies } from '@/apis';
import { createCreateSlice } from '../boilerplates';

const createAllergySlice = createCreateSlice('create-allergy', APIAllergies.createAllergy);

export const { create: createAllergy, resetState: resetCreateAllergyState } = createAllergySlice;

export const selectCreateAllergy = createAllergySlice.select;
export const createAllergyReducer = createAllergySlice.reducer;
