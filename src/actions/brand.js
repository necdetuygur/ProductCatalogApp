import axios from "axios";
import config from "../config";

export const getBrands = () => (dispatch) => {
    axios.get(config.ENDPOINT_BRAND).then((r) =>
      dispatch({
        type: "GET_BRANDS_SUCCESS",
        payload: r.data,
      })
    );
  };
  