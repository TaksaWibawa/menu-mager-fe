import { APIPreferences } from '@/apis';
import { createCreateSlice } from '../boilerplates';

const createPreferenceSlice = createCreateSlice('create-preference', APIPreferences.createPreference);

export const { create: createPreference, resetState: resetCreatePreferenceState } = createPreferenceSlice;

export const selectCreatePreference = createPreferenceSlice.select;
export const createPreferenceReducer = createPreferenceSlice.reducer;
