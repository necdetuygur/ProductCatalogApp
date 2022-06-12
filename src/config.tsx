// var base = "https://localhost:7170/";
var base = "https://aipu.herokuapp.com/";

var config = {
  PICTURE_BASE: base + "img",
  ENDPOINT_CATEGORY: base + "api/Categories",
  ENDPOINT_PRODUCT: base + "api/Products",
  ENDPOINT_BRAND: base + "api/Brands",
  ENDPOINT_COLOR: base + "api/Colors",
  ENDPOINT_USE_CASE: base + "api/UseCases",
  ENDPOINT_USER: base + "api/Users",
  ENDPOINT_USER_LOGIN: base + "api/Users/Login",
  ENDPOINT_ADD_PRODUCT: base + "api/Products",
  ENDPOINT_PRODUCT_PICTURE_UPLOAD: base + "api/Products/PictureUpload",
  ENDPOINT_ORDER: base + "api/Orders",
  ENDPOINT_GET_BY_USER_ID_ORDER: base + "api/Orders/GetByUserIdOrder",
  ENDPOINT_GET_BY_PRODUCT_ID_ORDER: base + "api/Orders/GetByProductIdOrder",
};

export default config;
