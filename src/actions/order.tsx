import axios from "axios";
import config from "../config";
import { getProducts } from "./product";
import { Dispatch } from "redux";

const addOrder = (order: any) => (dispatch: Dispatch) => {
  var token = localStorage.getItem("token") || "";
  var axiosConfig = { headers: { Authorization: `Bearer ${token}` } };
  axios.post(config.ENDPOINT_ORDER, order, axiosConfig).then((r) => {
    dispatch(getMySentOffers() as any);
    dispatch(getProducts() as any);
    return dispatch({
      type: "ADD_ORDERS_SUCCESS",
      payload: r.data,
    });
  });
};

const getMySentOffers = () => (dispatch: Dispatch) => {
  var userId = localStorage.getItem("userId");
  axios.get(config.ENDPOINT_GET_BY_USER_ID_ORDER + "/" + userId).then((r) =>
    dispatch({
      type: "MY_SENT_OFFERS_SUCCESS",
      payload: r.data,
    })
  );
};

const withdrawOffer = (orderId: any) => (dispatch: Dispatch) => {
  axios.delete(config.ENDPOINT_ORDER + "/" + orderId).then((r) => {
    dispatch(getProducts() as any);
    dispatch(getMySentOffers() as any);
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

const acceptOffer = (orderId: any) => (dispatch: Dispatch) => {
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
    dispatch(getProducts() as any);
    return dispatch(getMySentOffers() as any);
  });
};

const buyOrder = (orderId: any, productId: any) => (dispatch: Dispatch) => {
  var bodyFormData = new FormData();

  bodyFormData.append("Id", orderId);
  bodyFormData.append("statusId", "3");
  axios({
    method: "put",
    url: config.ENDPOINT_ORDER,
    data: bodyFormData,
    headers: { "Content-Type": "multipart/form-data" },
  }).then((r) => {
    dispatch(getProducts() as any);
    return dispatch(getMySentOffers() as any);
  });

  bodyFormData = new FormData();
  bodyFormData.append("Id", productId);
  bodyFormData.append("isSold", "true");
  axios({
    method: "put",
    url: config.ENDPOINT_PRODUCT,
    data: bodyFormData,
    headers: { "Content-Type": "multipart/form-data" },
  }).then((r) => {
    dispatch(getProducts() as any);
    return dispatch(getMySentOffers() as any);
  });
};

const buyProduct = (product: any) => (dispatch: Dispatch) => {
  var bodyFormData = new FormData();

  dispatch(
    addOrder({
      userId: localStorage.getItem("userId"),
      productId: product.id,
      statusId: 3,
      price: product.price,
    }) as any
  );

  bodyFormData = new FormData();
  bodyFormData.append("Id", product.id);
  bodyFormData.append("isSold", "true");
  axios({
    method: "put",
    url: config.ENDPOINT_PRODUCT,
    data: bodyFormData,
    headers: { "Content-Type": "multipart/form-data" },
  }).then((r) => {
    dispatch(getProducts() as any);
    return dispatch(getMySentOffers() as any);
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
