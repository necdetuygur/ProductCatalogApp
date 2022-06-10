import axios from "axios";
import config from "../config";
import { getProducts } from "./product";

const addOrder = (order) => (dispatch) => {
  var token = localStorage.getItem("token") || "";
  var axiosConfig = { headers: { Authorization: `Bearer ${token}` } };
  axios.post(config.ENDPOINT_ORDER, order, axiosConfig).then((r) => {
    dispatch(getMySentOffers());
    dispatch(getProducts());
    return dispatch({
      type: "ADD_ORDERS_SUCCESS",
      payload: r.data,
    });
  });
};

const getMySentOffers = () => (dispatch) => {
  var userId = localStorage.getItem("userId");
  axios.get(config.ENDPOINT_GET_BY_USER_ID_ORDER + "/" + userId).then((r) =>
    dispatch({
      type: "MY_SENT_OFFERS_SUCCESS",
      payload: r.data,
    })
  );
};

const withdrawOffer = (orderId) => (dispatch) => {
  axios.delete(config.ENDPOINT_ORDER + "/" + orderId).then((r) => {
    dispatch(getProducts());
    dispatch(getMySentOffers());
    setTimeout(() => {
      dispatch({
        type: "WITHDRAW_OFFER_SUCCESS",
        payload: 0,
      });
    }, 300);
    return dispatch({
      type: "WITHDRAW_OFFER_SUCCESS",
      payload: r.data.success,
    });
  });
};

const acceptOffer = (orderId) => (dispatch) => {
  var bodyFormData = new FormData();
  bodyFormData.append("Id", orderId);
  bodyFormData.append("statusId", "2");
  axios({
    method: "put",
    url: config.ENDPOINT_ORDER,
    data: bodyFormData,
    headers: { "Content-Type": "multipart/form-data" },
  }).then((r) => {
    setTimeout(() => {
      dispatch({
        type: "ACCEPT_OFFER_SUCCESS",
        payload: 0,
      });
    }, 300);
    dispatch({
      type: "ACCEPT_OFFER_SUCCESS",
      payload: r.data.success,
    });
    dispatch(getProducts());
    return dispatch(getMySentOffers());
  });
};

const buyOrder = (orderId, productId) => (dispatch) => {
  var bodyFormData = new FormData();

  bodyFormData.append("Id", orderId);
  bodyFormData.append("statusId", "3");
  axios({
    method: "put",
    url: config.ENDPOINT_ORDER,
    data: bodyFormData,
    headers: { "Content-Type": "multipart/form-data" },
  }).then((r) => {
    dispatch(getProducts());
    return dispatch(getMySentOffers());
  });

  bodyFormData = new FormData();
  bodyFormData.append("Id", productId);
  bodyFormData.append("isSold", true);
  axios({
    method: "put",
    url: config.ENDPOINT_PRODUCT,
    data: bodyFormData,
    headers: { "Content-Type": "multipart/form-data" },
  }).then((r) => {
    dispatch(getProducts());
    return dispatch(getMySentOffers());
  });
};

const buyProduct = (product) => (dispatch) => {
  var bodyFormData = new FormData();

  dispatch(
    addOrder({
      userId: localStorage.getItem("userId"),
      productId: product.id,
      statusId: 3,
      price: product.price,
    })
  );

  bodyFormData = new FormData();
  bodyFormData.append("Id", product.id);
  bodyFormData.append("isSold", true);
  axios({
    method: "put",
    url: config.ENDPOINT_PRODUCT,
    data: bodyFormData,
    headers: { "Content-Type": "multipart/form-data" },
  }).then((r) => {
    dispatch(getProducts());
    return dispatch(getMySentOffers());
  });
};

export {
  addOrder,
  getMySentOffers,
  withdrawOffer,
  acceptOffer,
  buyOrder,
  buyProduct,
};
