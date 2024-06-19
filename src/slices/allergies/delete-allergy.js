import { APIAllergies } from '@/apis';
import { createDeleteSlice } from '../boilerplates';

const deleteAllergySlice = createDeleteSlice('delete-allergy', APIAllergies.deleteAllergy);

export const { remove: deleteAllergy, resetState: resetDeleteAllergyState } = deleteAllergySlice;

export const selectDeleteAllergy = deleteAllergySlice.select;
export const deleteAllergyReducer = deleteAllergySlice.reducer;
