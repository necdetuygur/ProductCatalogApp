import axios from "axios";
import config from "../config";
import { Dispatch } from "redux";

const getProducts = () => (dispatch: Dispatch) => {
  axios.get(config.ENDPOINT_PRODUCT).then((r) =>
    dispatch({
      type: "GET_PRODUCTS_SUCCESS",
      payload: r.data,
    })
  );
};

const addProduct = (product: any) => (dispatch: Dispatch) => {
  var token = localStorage.getItem("token") || "";
  var axiosConfig = { headers: { Authorization: `Bearer ${token}` } };
  if (product.colorId === "DEFAULT" || product.colorId.trim() === "")
    delete product["colorId"];
  if (product.brandId === "DEFAULT" || product.brandId.trim() === "")
    delete product["brandId"];
  if (product.useCaseId === "DEFAULT" || product.useCaseId.trim() === "")
    delete product["useCaseId"];
  if (product.categoryId === "DEFAULT" || product.categoryId.trim() === "")
    delete product["categoryId"];
  console.log("product", product);
  axios.post(config.ENDPOINT_ADD_PRODUCT, product, axiosConfig).then((r) => {
    getProducts();

    setTimeout(() => {
      dispatch({
        type: "ADD_PRODUCTS_SUCCESS",
        payload: {},
      });
    }, 3e3);

    return dispatch({
      type: "ADD_PRODUCTS_SUCCESS",
      payload: r.data,
    });
  });
};

export { getProducts, addProduct };
