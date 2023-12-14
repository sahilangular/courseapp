import axios from "axios";

export const getAllCourses =
  (category = "", keyword = "") =>
  async (dispatch: any) => {
    dispatch({ type: "allCourseRequest" });

    const { data } = await axios.get(
      `/api/v1/course?keyword=${keyword}&category=${category}`,
      {
        withCredentials: true,
      }
    );

    if (data.success === false) {
      dispatch({ type: "allCourseFail", payload: data });
    } else {
      dispatch({ type: "allCourseSuccess", payload: data });
    }
  };

export const addToPlayList = (id: any) => async (dispatch: any) => {
  dispatch({ type: "addToPlayListRequest" });

  const { data } = await axios.post(
    `/api/v1/course/addtoplaylist`,
    {
      id,
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    }
  );

  if (data.success === false) {
    dispatch({ type: "addToPlayListFail", payload: data });
  } else {
    dispatch({ type: "addToPlayListSuccess", payload: data });
  }
};

export const removeFromPlayList = (id: any) => async (dispatch: any) => {
  dispatch({ type: "removeFromPlayListRequest" });

  const { data } = await axios.delete(
    `/api/v1/course/removefromlist?id=${id}`,
    {
      withCredentials: true,
    }
  );

  if (data.success === false) {
    dispatch({ type: "removeFromPlayListFail", payload: data });
  } else {
    dispatch({ type: "removeFromPlayListSuccess", payload: data });
  }
};

export const getCourseLecture =
  (id:any) =>
  async (dispatch: any) => {
    dispatch({ type: "getCourseLectureRequest" });

    const { data } = await axios.get(
      `/api/v1/course/getlecturecourse/${id}`,
      {
        withCredentials: true,
      }
    );
    if (data.success === false) {
      dispatch({ type: "getCourseLectureFail", payload: data });
    } else {
      dispatch({ type: "getCourseLectureSuccess", payload: data });
    }
  };