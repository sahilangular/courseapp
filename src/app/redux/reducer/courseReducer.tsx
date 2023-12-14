import { createReducer } from "@reduxjs/toolkit";

export const courseReducer = createReducer(
  { courses: [],lectures:[] },
  {
    allCourseRequest: (state: any) => {
      state.loading = true;
    },
    allCourseSuccess: (state: any, action) => {
      (state.loading = false), (state.courses = action.payload.courses);
    },
    allCourseFail: (state: any, action) => {
      (state.loading = true), (state.error = action.payload);
    },
    getCourseLectureRequest: (state: any) => {
      state.loading = true;
    },
    getCourseLectureSuccess: (state: any, action) => {
      (state.loading = false), (state.lectures = action.payload.lectures);
    },
    getCourseLectureFail: (state: any, action) => {
      (state.loading = true), (state.error = action.payload);
    },
    addToPlayListRequest: (state: any) => {
      state.loading = true;
    },
    addToPlayListSuccess: (state: any, action) => {
      (state.loading = false), (state.message = action.payload.message);
    },
    addToPlayListFail: (state: any, action) => {
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
