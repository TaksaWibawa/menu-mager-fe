import { APIPlans } from '@/apis';
import { createCreateSlice } from '../boilerplates';

const createPlanSlice = createCreateSlice('create-plan', APIPlans.createMealPlan);

export const { create: createPlan, resetState: resetCreatePlanState } = createPlanSlice;

export const selectCreatePlan = createPlanSlice.select;
export const createPlanReducer = createPlanSlice.reducer;
