import { APIPlans } from '@/apis';
import { createDeleteSlice } from '../boilerplates';

const deletePlanSlice = createDeleteSlice('delete-plan', APIPlans.deleteMealPlan);

export const { remove: deletePlan, resetState: resetDeletePlanState } = deletePlanSlice;

export const selectDeletePlan = deletePlanSlice.select;
export const deletePlanReducer = deletePlanSlice.reducer;
