import axios from "axios";
import config from "../config";

const getProducts = () => (dispatch) => {
  axios.get(config.ENDPOINT_PRODUCT).then((r) =>
    dispatch({
      type: "GET_PRODUCTS_SUCCESS",
      payload: r.data,
    })
  );
};

const addProduct = (product) => (dispatch) => {
    var token = localStorage.getItem("token") || "";
    var axiosConfig = { headers: { Authorization: `Bearer ${token}` } };
    axios.post(config.ENDPOINT_ADD_PRODUCT, product, axiosConfig).then((r) => {
      dispatch(getProducts());
      return dispatch({
        type: "ADD_PRODUCTS_SUCCESS",
        payload: r.data,
      });
    });
  };

  export { getProducts, addProduct };