import { createReducer } from "@reduxjs/toolkit";

export const userReducer = createReducer(
  {},
  {
    loginRequest: (state: any) => {
      state.loading = true;
    },
    loginSuccess: (state: any, action) => {
      (state.loading = false),
        (state.isAuthenticated = true),
        (state.user = action.payload.user);
      state.message = action.payload.message;
    },
    loginFail: (state: any, action) => {
      (state.loading = true),
        (state.isAuthenticated = false),
        (state.error = action.payload);
    },
    logOutRequest: (state: any) => {
      state.loading = true;
    },
    logOutSuccess: (state: any, action) => {
      (state.loading = false),
        (state.isAuthenticated = false),
        (state.user = null);
      state.message = action.payload.message;
    },
    logOutFail: (state: any, action) => {
      (state.loading = true), (state.error = action.payload);
    },
    registerRequest: (state: any) => {
      state.loading = true;
    },
    registerSuccess: (state: any, action) => {
      (state.loading = false),
        (state.isAuthenticated = true),
        (state.user = action.payload.user);
      state.message = action.payload.message;
    },
    registerFail: (state: any, action) => {
      (state.loading = true),
        (state.isAuthenticated = false),
        (state.error = action.payload);
    },
    loadUserRequest: (state: any) => {
      state.loading = true;
    },
    loadUserSuccess: (state: any, action) => {
      (state.loading = false),
        (state.isAuthenticated = true),
        (state.user = action.payload.user);
      state.message = action.payload.message;
    },
    loadUserFail: (state: any, action) => {
      (state.loading = true),
        (state.isAuthenticated = true),
        (state.error = action.payload);
    },
    clearError: (state: any) => {
      state.error = null;
    },
    clearMessage: (state: any) => {
      state.message = null;
    },
  }
);

export const profileReducer = createReducer(
  {},
  {
    updateProfileRequest: (state: any) => {
      state.loading = true;
    },
    updateProfileSuccess: (state: any, action) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.message = action.payload.message;
    },
    updateProfilefail: (state: any, action) => {
      state.loading = true;
      state.isAuthenticated = false;
      state.error = action.payload;
    },
    changePaswordRequest: (state: any) => {
      state.loading = true;
    },
    changePaswordSuccess: (state: any, action) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.message = action.payload.message;
    },
    changePaswordfail: (state: any, action) => {
      state.loading = false;
      state.isAuthenticated = false;
      state.error = action.payload;
    },
    forgetPaswordRequest: (state: any) => {
      state.loading = true;
    },
    forgetPaswordSuccess: (state: any, action) => {
      state.loading = false;
      state.message = action.payload.message;
    },
    forgetPaswordfail: (state: any, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    resetPaswordRequest: (state: any) => {
      state.loading = true;
    },
    resetPaswordSuccess: (state: any, action) => {
      state.loading = false;
      state.message = action.payload.message;
    },
    resetPaswordfail: (state: any, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    removeFromPlayListRequest: (state: any) => {
      state.loading = true;
    },
    removeFromPlayListSuccess: (state: any, action) => {
      (state.loading = false), (state.proMessage = action.payload.message);
    },
    removeFromPlayListFail: (state: any, action) => {
      (state.loading = true), (state.error = action.payload);
    },
    updateProfilePictureRequest: (state: any) => {
      state.loading = true;
    },
    updateProfilePictureSuccess: (state: any, action) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.message = action.payload.message;
    },
    updateProfilePicturefail: (state: any, action) => {
      state.loading = true;
      state.isAuthenticated = false;
      state.error = action.payload;
    },
    clearError: (state: any) => {
      state.error = null;
    },
    clearMessage: (state: any) => {
      state.message = null;
    },
  }
);
