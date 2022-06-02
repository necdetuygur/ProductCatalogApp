import axios from "axios";
import config from "../config";

export const getCategories = () => (dispatch) => {
  axios.get(config.ENDPOINT_CATEGORY).then((r) =>
    dispatch({
      type: "GET_CATEGORIES_SUCCESS",
      payload: r.data,
    })
  );
};

export const setCategory = (slug) => (dispatch) => {
  dispatch({
    type: "SET_CATEGORY",
    payload: slug,
  });
};
