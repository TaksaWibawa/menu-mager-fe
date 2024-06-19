import { APIPlans } from '@/apis';
import { createGetDetailSlice } from '../boilerplates';

const planSlice = createGetDetailSlice('plan', APIPlans.getMealPlan);

export const { fetchDetail: getPlan, resetState: resetPlanState } = planSlice;

export const selectPlan = planSlice.select;
export const planReducer = planSlice.reducer;
