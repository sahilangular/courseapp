import { createReducer } from "@reduxjs/toolkit";

export const adminReducer = createReducer({},{
      createCourseRequest: (state: any) => {
        state.loading = true;
      },
      createCourseSuccess: (state: any, action) => {
        (state.loading = false), (state.message = action.payload.message);
      },
      createCourseFail: (state: any, action) => {
        (state.loading = true), (state.error = action.payload);
      },
      deleteCourseRequest: (state: any) => {
        state.loading = true;
      },
      deleteCourseSuccess: (state: any, action) => {
        (state.loading = false), (state.message = action.payload.message);
      },
      deleteCourseFail: (state: any, action) => {
        (state.loading = true), (state.error = action.payload);
      },
      addCourseLectureRequest: (state: any) => {
        state.loading = true;
      },
      addCourseLectureSuccess: (state: any, action) => {
        (state.loading = false), (state.message = action.payload.message);
      },
      addCourseLectureFail: (state: any, action) => {
        (state.loading = true), (state.error = action.payload);
      },
      deleteLectureCourseRequest: (state: any) => {
        state.loading = true;
      },
      deleteLectureCourseSuccess: (state: any, action) => {
        (state.loading = false), (state.message = action.payload.message);
      },
      deleteLectureCourseFail: (state: any, action) => {
        (state.loading = true), (state.error = action.payload);
      },
      getAllUserRequest: (state: any) => {
        state.loading = true;
      },
      getAllUserSuccess: (state: any, action) => {
        (state.loading = false), (state.users = action.payload.user);
      },
      getAllUserFail: (state: any, action) => {
        (state.loading = true), (state.error = action.payload);
      },
      updateRoleRequest: (state: any) => {
        state.loading = true;
      },
      updateRoleSuccess: (state: any, action) => {
        (state.loading = false), (state.message = action.payload);
      },
      updateRoleFail: (state: any, action) => {
        (state.loading = true), (state.error = action.payload);
      },
      deleteUserRequest: (state: any) => {
        state.loading = true;
      },
      deleteUserSuccess: (state: any, action) => {
        (state.loading = false), (state.message = action.payload);
      },
      deleteUserFail: (state: any, action) => {
        (state.loading = true), (state.error = action.payload);
      },
      clearError: (state: any) => {
        state.error = null;
      },
      clearMessage: (state: any) => {
        state.message = null;
      },
})