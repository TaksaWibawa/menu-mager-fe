import { APIPlans } from '@/apis';
import { createUpdateSlice } from '../boilerplates';

const updatePlanSlice = createUpdateSlice('update-plan', APIPlans.updateMealPlan);

export const { update: updatePlan, resetState: resetUpdatePlanState } = updatePlanSlice;

export const selectUpdatePlan = updatePlanSlice.select;
export const updatePlanReducer = updatePlanSlice.reducer;
