import axios from "axios";
import config from "../config";

export const addUser = (user) => (dispatch) => {
  axios.post(config.ENDPOINT_USER, user).then((r) =>
    dispatch({
      type: "ADD_USER_SUCCESS",
      payload: r.data,
    })
  );
};

export const getUserById = (id) => (dispatch) => {
  axios.get(config.ENDPOINT_USER + "/" + id).then((r) =>
    dispatch({
      type: "GET_USER_BY_ID_SUCCESS",
      payload: r.data,
    })
  );
};

export const login = (user) => (dispatch) => {
  axios.post(config.ENDPOINT_USER_LOGIN, user).then((r) =>
    dispatch({
      type: "USER_LOGIN_SUCCESS",
      payload: r.data,
    })
  );
};

export const logout = () => {
  return {
    type: "USER_LOGOUT_SUCCESS",
  };
};
