import axios from "axios"; 

export const login =
  (email: string, password: string) => async (dispatch: any) => {
    dispatch({ type: "loginRequest" });

    const { data } = await axios.post(
      "/api/v1/auth/login",
      {
        email,
        password,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );

    if (data.success === false) {
      dispatch({ type: "loginFail", payload: data });
    } else {
      dispatch({ type: "loginSuccess", payload: data });
    }
  };

export const register =
  (name: string, email: string, password: string, public_id: any, url: any) =>
  async (dispatch: any) => {
    dispatch({ type: "registerRequest" });

    const { data } = await axios.post(
      "/api/v1/auth/register",
      {
        name,
        email,
        password,
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

    if (data.success === false) {
      dispatch({ type: "registerFail", payload: data });
    } else {
      dispatch({ type: "registerSuccess", payload: data });

    }
  };

export const logOut = () => async (dispatch: any) => {
  dispatch({ type: "logOutRequest" });

  const { data } = await axios.post("/api/v1/auth/logout", {
    withCredentials: true,
  });

  if (data.success === false) {
    dispatch({ type: "logOutFail", payload: data });
  } else {
    dispatch({ type: "logOutSuccess", payload: data });
  }
};

export const loadUser = () => async (dispatch: any) => {
  dispatch({ type: "loadUserRequest" });

  const { data } = await axios.get("/api/v1/auth/profile/me", {
    withCredentials: true,
  });

  if (data.success === false) {
    dispatch({ type: "loadUserFail", payload: data });
  } else {
    dispatch({ type: "loadUserSuccess", payload: data });
  }
};

export const buySubscription = () => async (dispatch: any) => {
  dispatch({ type: "buySubscriptionRequest" });

  const { data } = await axios.get("/api/v1/payment/subscribe", {
    withCredentials: true,
  });

  if (data.success === false) {
    dispatch({ type: "buySubscriptionFail", payload: data });
  } else {
    dispatch({ type: "buySubscriptionSuccess", payload: data });
  }
};

export const cancelSubscription = () => async (dispatch: any) => {
  dispatch({ type: "cancelSubscriptionRequest" });

  const { data } = await axios.delete("/api/v1/payment/subscribe/cancel", {
    withCredentials: true,
  });

  if (data.success === false) {
    dispatch({ type: "cancelSubscriptionFail", payload: data });
  } else {
    dispatch({ type: "cancelSubscriptionSuccess", payload: data });
  }
};
