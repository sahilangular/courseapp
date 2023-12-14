import axios from "axios";

export const createCourse =
  (
    title: string,
    description: string,
    category: string,
    createdBy: string,
    public_id: any,
    url: any
  ) =>
  async (dispatch: any) => {
    dispatch({ type: "createCourseRequest" });

    const { data } = await axios.post(
      "/api/v1/course",
      {
        title,
        description,
        category,
        createdBy,
        public_id,
        url,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );

    console.log(data);

    if (data.success === false) {
      dispatch({ type: "createCourseFail", payload: data });
    } else {
      dispatch({ type: "createCourseSuccess", payload: data });
    }
  };

  export const deleteCourse =
  (id: any) => async (dispatch: any) => {
    dispatch({ type: "deleteCourseRequest" });

    const { data } = await axios.delete(
      `/api/v1/course/deletecourse/${id}`
    );
    if (data.success === false) {
      dispatch({ type: "deleteCourseFail", payload: data });
    } else {
      dispatch({ type: "deleteCourseSuccess", payload: data });
    }
  };

  export const addCourseLecture =
  (
    id:any,
    title: string,
    description: string,
    public_id: any,
    url: any
  ) =>
  async (dispatch: any) => {
    dispatch({ type: "addCourseLectureRequest" });

    console.log(title,description,public_id,url,id)

    const { data } = await axios.post(
      `/api/v1/course/addLecture/${id}`,
      {
        title,
        description,
        public_id,
        url,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );

    console.log(data);

    if (data.success === false) {
      dispatch({ type: "addCourseLectureFail", payload: data });
    } else {
      dispatch({ type: "addCourseLectureSuccess", payload: data });
    }
  };

export const deleteLectureCourse =
  (courseId: any,lectureId:any) => async (dispatch: any) => {
    dispatch({ type: "deleteLectureCourseRequest" });

    const { data } = await axios.delete(
      `/api/v1/course/deletelecture?courseId=${courseId}&lectureId=${lectureId}`
    );
    if (data.success === false) {
      dispatch({ type: "deleteLectureCourseFail", payload: data });
    } else {
      dispatch({ type: "deleteLectureCourseSuccess", payload: data });
    }
  };

  export const getAllUsers =
  () => async (dispatch: any) => {
    dispatch({ type: "getAllUserRequest" });

    const { data } = await axios.get(
      `/api/v1/admin/getallusers`,{
        withCredentials:true
      }
    );
    if (data.success === false) {
      dispatch({ type: "getAllUserFail", payload: data });
    } else {
      dispatch({ type: "getAllUserSuccess", payload: data });
    }
  };

  export const updateUserRole =
  (id:any) => async (dispatch: any) => {
    dispatch({ type: "updateRoleRequest" });

    const { data } = await axios.put(
      `/api/v1/admin/updateuserrole/${id}`,{
        headers:{
          'Content-Type':'application/json'
        },
        withCredentials: true
      }
    );

    if (data.success === false) {
      dispatch({ type: "updateRoleFail", payload: data });
    } else {
      dispatch({ type: "updateRoleSuccess", payload: data.message });
    }
  };

  
export const deleteUser =
(id:any) => async (dispatch: any) => {
  dispatch({ type: "deleteUserRequest" });

  const { data } = await axios.delete(
    `/api/v1/admin/deleteuser/${id}`
  );
  if (data.success === false) {
    dispatch({ type: "deleteUserFail", payload: data });
  } else {
    dispatch({ type: "deleteUserSuccess", payload: data.message });
  }
};
