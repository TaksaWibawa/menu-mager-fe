import { APIUser } from '../../apis';
import { createCreateSlice } from '../boilerplates';

const createUserSubscriptionSlice = createCreateSlice('create-user-subscription', APIUser.createSubscriptionDelivery);

export const { create: createUserSubscription, resetState: resetCreateUserSubscriptionState } =
  createUserSubscriptionSlice;

export const selectCreateUserSubscription = createUserSubscriptionSlice.select;
export const createUserSubscriptionReducer = createUserSubscriptionSlice.reducer;
