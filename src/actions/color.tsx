import axios from "axios";
import config from "../config";
import { Dispatch } from "redux";

export const getColors = () => (dispatch: Dispatch) => {
  axios.get(config.ENDPOINT_COLOR).then((r) =>
    dispatch({
      type: "GET_COLORS_SUCCESS",
      payload: r.data,
    })
  );
};
