import axios from "axios";

export const updateProfile =
  (name: string, email: string) => async (dispatch: any) => {
    dispatch({ type: "updateProfileRequest" });

    const { data } = await axios.put(
      "/api/v1/auth/profile/updateProfile",
      {
        name,
        email,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );

    if (data.success === false) {
      dispatch({ type: "updateProfilefail", payload: data });
    } else {
      dispatch({ type: "updateProfileSuccess", payload: data });
    }
  };

export const changePassword =
  (oldPassword: string, newPassword: string) => async (dispatch: any) => {
    dispatch({ type: "changePaswordRequest" });

    const { data } = await axios.put(
      "/api/v1/auth/changePassword",
      {
        oldPassword,
        newPassword,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );

    if (data.success === false) {
      dispatch({ type: "changePaswordfail", payload: data });
    } else {
      dispatch({ type: "changePaswordSuccess", payload: data });
    }
  };

export const forgetPassword = (email: string) => async (dispatch: any) => {
  dispatch({ type: "forgetPaswordRequest" });

  const { data } = await axios.post(
    "/api/v1/auth/forgetpassword",
    {
      email,
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
    dispatch({ type: "forgetPaswordfail", payload: data });
  } else {
    dispatch({ type: "forgetPaswordSuccess", payload: data });
  }
};

export const resetPassword = (password: string,confirmPassword:string,id:string) => async (dispatch: any) => {
  dispatch({ type: "resetPaswordRequest" });

  const { data } = await axios.put(
    `/api/v1/auth/resetpassword/${id}`,
    {
      password,
      confirmPassword
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    }
  );

  if (data.success === false) {
    dispatch({ type: "resetPaswordfail", payload: data });
  } else {
    dispatch({ type: "resetPaswordSuccess", payload: data });
  }
};

export const updateProfilePicture =
  (public_id: any, url: any) => async (dispatch: any) => {
    dispatch({ type: "updateProfilePictureRequest" });

    const { data } = await axios.put(
      "/api/v1/auth/profile/updateProfilePicture",
      {
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

    console.log("data", data);

    if (data.success === false) {
      dispatch({ type: "updateProfilePicturefail", payload: data });
    } else {
      dispatch({ type: "updateProfilePictureSuccess", payload: data });
    }
  };
