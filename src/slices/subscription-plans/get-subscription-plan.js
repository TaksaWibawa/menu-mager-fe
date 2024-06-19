import { APISubscriptionPlans } from '@/apis/APISubscriptionPlans';
import { createGetDetailSlice } from '../boilerplates';

const subscriptionPlanSlice = createGetDetailSlice('subscription-plan', APISubscriptionPlans.getSubscriptionPlan);

export const { fetchDetail: getSubscriptionPlan, resetState: resetSubscriptionPlanState } = subscriptionPlanSlice;

export const selectSubscriptionPlan = subscriptionPlanSlice.select;
export const subscriptionPlanReducer = subscriptionPlanSlice.reducer;
