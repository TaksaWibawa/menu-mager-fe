import { APIAllergies } from '@/apis';
import { createUpdateSlice } from '../boilerplates';

const updateAllergySlice = createUpdateSlice('update-allergy', APIAllergies.updateAllergy);

export const { update: updateAllergy, resetState: resetUpdateAllergyState } = updateAllergySlice;

export const selectUpdateAllergy = updateAllergySlice.select;
export const updateAllergyReducer = updateAllergySlice.reducer;
