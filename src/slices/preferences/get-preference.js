import { APIPreferences } from '@/apis';
import { createGetDetailSlice } from '../boilerplates';

const preferenceSlice = createGetDetailSlice('preference', APIPreferences.getPreference);

export const { fetchDetail: getPreference, resetState: resetPreferenceState } = preferenceSlice;

export const selectPreference = preferenceSlice.select;
export const preferenceReducer = preferenceSlice.reducer;
