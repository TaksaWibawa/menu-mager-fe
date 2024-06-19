import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: {},
  address: {},
  subscriptionDetail: {},
  subscriptionDelivery: [],
};

const userSubscriptionSlice = createSlice({
  name: 'userSubscription',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = {
        ...state.user,
        ...action.payload,
      };
    },
    setAddress: (state, action) => {
      state.address = {
        ...state.address,
        ...action.payload,
      };
    },
    setSubscriptionDetail: (state, action) => {
      state.subscriptionDetail = {
        ...state.subscriptionDetail,
        ...action.payload,
      };
    },
    setSubscriptionDelivery: (state, action) => {
      state.subscriptionDelivery = action.payload;
    },
    resetUser: (state) => {
      state.user = initialState.user;
    },
    resetAddress: (state) => {
      state.address = initialState.address;
    },
    resetSubscriptionDetail: (state) => {
      state.subscriptionDetail = initialState.subscriptionDetail;
    },
    resetSubscriptionDelivery: (state) => {
      state.subscriptionDelivery = initialState.subscriptionDelivery;
    },
    resetUserSubscription: (state) => {
      state.user = initialState.user;
      state.address = initialState.address;
      state.subscriptionDetail = initialState.subscriptionDetail;
      state.subscriptionDelivery = initialState.subscriptionDelivery;
    },
  },
});

export const {
  setUser,
  setAddress,
  setSubscriptionDetail,
  setSubscriptionDelivery,
  resetUser,
  resetAddress,
  resetSubscriptionDetail,
  resetSubscriptionDelivery,
  resetUserSubscription,
} = userSubscriptionSlice.actions;
export const selectUserSubscription = (state) => state.userSubscription;
export const userSubscriptionReducer = userSubscriptionSlice.reducer;
