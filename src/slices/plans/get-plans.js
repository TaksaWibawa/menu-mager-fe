import { APIPlans } from '@/apis';
import { createGetAllSlice } from '../boilerplates';

const plansSlice = createGetAllSlice('plans', APIPlans.getMealPlans);

export const { fetchAll: getPlans, resetState: resetPlansState } = plansSlice;
export const selectPlans = plansSlice.select;
export const plansReducer = plansSlice.reducer;
