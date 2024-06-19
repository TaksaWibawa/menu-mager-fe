import { APIPreferences } from '@/apis';
import { createUpdateSlice } from '../boilerplates';

const updatePreferenceSlice = createUpdateSlice('update-preference', APIPreferences.updatePreference);

export const { update: updatePreference, resetState: resetUpdatePreferenceState } = updatePreferenceSlice;

export const selectUpdatePreference = updatePreferenceSlice.select;
export const updatePreferenceReducer = updatePreferenceSlice.reducer;
