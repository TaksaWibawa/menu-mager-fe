import { APISubscriptionPlans } from '@/apis/APISubscriptionPlans';
import { createUpdateSlice } from '../boilerplates';

const updateSubscriptionPlanSlice = createUpdateSlice(
  'update-subscription-plan',
  APISubscriptionPlans.updateSubscriptionPlan
);

export const { update: updateSubscriptionPlan, resetState: resetUpdateSubscriptionPlanState } =
  updateSubscriptionPlanSlice;

export const selectUpdateSubscriptionPlan = updateSubscriptionPlanSlice.select;
export const updateSubscriptionPlanReducer = updateSubscriptionPlanSlice.reducer;
