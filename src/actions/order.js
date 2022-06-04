import axios from "axios";
import config from "../config";

const addOrder = (order) => (dispatch) => {
  var token = localStorage.getItem("token") || "";
  var axiosConfig = { headers: { Authorization: `Bearer ${token}` } };
  axios.post(config.ENDPOINT_ADD_ORDER, order, axiosConfig).then((r) => {
    // dispatch(getProducts());
    return dispatch({
      type: "ADD_ORDERS_SUCCESS",
      payload: r.data,
    });
  });
};

export { addOrder };
