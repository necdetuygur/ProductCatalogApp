import axios from "axios";
import config from "../config";
import { Dispatch } from "redux";

export const getCategories = () => (dispatch: Dispatch) => {
  axios.get(config.ENDPOINT_CATEGORY).then((r) =>
    dispatch({
      type: "GET_CATEGORIES_SUCCESS",
      payload: r.data,
    })
  );
};

export const setCategory = (slug: any) => (dispatch: Dispatch) => {
  dispatch({
    type: "SET_CATEGORY",
    payload: slug,
  });
};
