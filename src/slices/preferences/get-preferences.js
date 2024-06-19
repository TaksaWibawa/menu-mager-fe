import { APIPreferences } from '@/apis';
import { createGetAllSlice } from '../boilerplates';

const preferencesSlice = createGetAllSlice('preferences', APIPreferences.getPreferences);

export const { fetchAll: getPreferences, resetState: resetPreferencesState } = preferencesSlice;
export const selectPreferences = preferencesSlice.select;
export const preferencesReducer = preferencesSlice.reducer;
