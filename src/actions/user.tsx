import axios from "axios";
import config from "../config";
import { Dispatch } from "redux";

export const addUser = (user: any) => (dispatch: Dispatch) => {
  setTimeout(() => {
    dispatch({
      type: "ADD_USER_SUCCESS",
      payload: {},
    });
  }, 3e3);

  axios.post(config.ENDPOINT_USER, user).then((r) => {
    if (r.data.success) {
      return dispatch({
        type: "ADD_USER_SUCCESS",
        payload: r.data,
      });
    } else {
      return dispatch({
        type: "ADD_USER_ERROR",
        payload: r.data,
      });
    }
  });
};

export const getUserById = (id: any) => (dispatch: Dispatch) => {
  axios.get(config.ENDPOINT_USER + "/" + id).then((r) =>
    dispatch({
      type: "GET_USER_BY_ID_SUCCESS",
      payload: r.data,
    })
  );
};

export const login = (user: any) => (dispatch: Dispatch) => {
  axios
    .post(config.ENDPOINT_USER_LOGIN, user)
    .then((r) => {
      return dispatch({
        type: "USER_LOGIN_SUCCESS",
        payload: r.data,
      });
    })
    .catch((err) => {
      return dispatch({
        type: "USER_LOGIN_ERROR",
        payload: err.response.status,
      });
    });
};

export const logout = (): any => {
  return {
    type: "USER_LOGOUT_SUCCESS",
  };
};
