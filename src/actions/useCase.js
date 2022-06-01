import axios from "axios";
import config from "../config";

export const getUseCases = () => (dispatch) => {
  axios.get(config.ENDPOINT_USE_CASE).then((r) =>
    dispatch({
      type: "GET_USE_CASES_SUCCESS",
      payload: r.data,
    })
  );
};
