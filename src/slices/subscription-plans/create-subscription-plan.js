import { APISubscriptionPlans } from '@/apis/APISubscriptionPlans';
import { createCreateSlice } from '../boilerplates';

const createSubscriptionPlanSlice = createCreateSlice('create-recipe', APISubscriptionPlans.createSubscriptionPlan);

export const { create: createSubscriptionPlan, resetState: resetCreateSubscriptionPlanState } =
  createSubscriptionPlanSlice;

export const selectCreateSubscriptionPlan = createSubscriptionPlanSlice.select;
export const createSubscriptionPlanReducer = createSubscriptionPlanSlice.reducer;
