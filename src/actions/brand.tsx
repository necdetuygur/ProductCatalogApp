import axios from "axios";
import config from "../config";
import { Dispatch } from "redux";

export const getBrands = () => (dispatch: Dispatch) => {
  axios.get(config.ENDPOINT_BRAND).then((r) =>
    dispatch({
      type: "GET_BRANDS_SUCCESS",
      payload: r.data,
    })
  );
};
