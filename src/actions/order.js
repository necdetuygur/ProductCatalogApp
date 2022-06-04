import axios from "axios";
import config from "../config";

const addOrder = (order) => (dispatch) => {
  var token = localStorage.getItem("token") || "";
  var axiosConfig = { headers: { Authorization: `Bearer ${token}` } };
  axios.post(config.ENDPOINT_ORDER, order, axiosConfig).then((r) => {
    dispatch(getMySentOffers());
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
  axios
    .delete(config.ENDPOINT_ORDER + "/" + orderId)
    .then((r) => dispatch(getMySentOffers()));
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
  }).then((r) => dispatch(getMySentOffers()));
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
  }).then((r) => dispatch(getMySentOffers()));

  bodyFormData = new FormData();
  bodyFormData.append("Id", productId);
  bodyFormData.append("isSold", true);
  axios({
    method: "put",
    url: config.ENDPOINT_PRODUCT,
    data: bodyFormData,
    headers: { "Content-Type": "multipart/form-data" },
  }).then((r) => dispatch(getMySentOffers()));
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
  }).then((r) => dispatch(getMySentOffers()));
};

export {
  addOrder,
  getMySentOffers,
  withdrawOffer,
  acceptOffer,
  buyOrder,
  buyProduct,
};
