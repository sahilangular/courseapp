import axios from "axios";

export const contact =
  (name: string, email: string, message: string) => async (dispatch: any) => {
    dispatch({ type: "contactRequest" });

    const { data } = await axios.post(
      "/api/v1/contact",
      {
        name,
        email,
        message,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );

    if (data.success === false) {
      dispatch({ type: "contactFail", payload:data });
    } else {
      dispatch({ type: "contactSuccess",payload:data });
    }
  };

  export const requestCourse =
  (name: string, email: string, course: string) => async (dispatch: any) => {
    dispatch({ type: "requestCourseRequest" });

    console.log(name,email,course)

    const { data } = await axios.post(
      "/api/v1/requestcourse",
      {
        name,
        email,
        course,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );

    if (data.success === false) {
      dispatch({ type: "requestCourseFail", payload:data });
    } else {
      dispatch({ type: "requestCourseSuccess",payload:data });
    }
  };

