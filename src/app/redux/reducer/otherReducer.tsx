import { createReducer } from "@reduxjs/toolkit";

export const otherReducer = createReducer({},{
      contactRequest: (state: any) => {
        state.loading = true;
      },
      contactSuccess: (state: any, action) => {
        (state.loading = false), (state.message = action.payload.message);
      },
      contactFail: (state: any, action) => {
        (state.loading = true), (state.error = action.payload);
      },
      requestCourseRequest: (state: any) => {
        state.loading = true;
      },
      requestCourseSuccess: (state: any, action) => {
        (state.loading = false), (state.message = action.payload.message);
      },
      requestCourseFail: (state: any, action) => {
        (state.loading = true), (state.error = action.payload);
      },
      clearError: (state: any) => {
        state.error = null;
      },
      clearMessage: (state: any) => {
        state.message = null;
      },
})