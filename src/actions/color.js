import axios from "axios";
import config from "../config";

export const getColors = () => (dispatch) => {
  axios.get(config.ENDPOINT_COLOR).then((r) =>
    dispatch({
      type: "GET_COLORS_SUCCESS",
      payload: r.data,
    })
  );
};
