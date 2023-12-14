import { createReducer } from "@reduxjs/toolkit";

export const subscriberReducer = createReducer(
  {},
  {
    buySubscriptionRequest: (state: any) => {
      state.loading = true;
    },
    buySubscriptionSuccess: (state: any, action) => {
      (state.loading = false),
        (state.subscriptionId = action.payload.subscriptionId);
    },
    buySubscriptionFail: (state: any, action) => {
      (state.loading = true), (state.error = action.payload);
    },
    cancelSubscriptionRequest: (state: any) => {
      state.loading = true;
    },
    cancelSubscriptionSuccess: (state: any, action) => {
      (state.loading = false),
        (state.message = action.payload.message);
    },
    cancelSubscriptionFail: (state: any, action) => {
      (state.loading = true), (state.error = action.payload);
    },

    clearError: (state: any) => {
      state.error = null;
    },
    clearMessage: (state: any) => {
      state.message = null;
    },
  }
);
