import { APIPreferences } from '@/apis';
import { createDeleteSlice } from '../boilerplates';

const deletePreferenceSlice = createDeleteSlice('delete-preference', APIPreferences.deletePreference);

export const { remove: deletePreference, resetState: resetDeletePreferenceState } = deletePreferenceSlice;

export const selectDeletePreference = deletePreferenceSlice.select;
export const deletePreferenceReducer = deletePreferenceSlice.reducer;
