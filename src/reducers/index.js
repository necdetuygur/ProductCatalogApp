const INITIAL_STATE = {
  selectedLanguage: localStorage.getItem("selectedLanguage") || "en",
  language: require("../language." +
    (localStorage.getItem("selectedLanguage") || "en") +
    ".js").default,
  categories: [],
  brands: [],
  colors: [],
  useCases: [],
  products: [],
  selectedCategory: "",
  addUserSuccess: {},
  token: localStorage.getItem("token") || "",
  addProductSuccess: {},
  productDetailUser: {},
  addOrderSuccess: {},
  mySentOffers: {},
  withdrawOfferSuccess: {},
};

export const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "SET_LANGUAGE":
      localStorage.setItem("selectedLanguage", action.payload);
      var importedLanguage = require("../language." +
        action.payload +
        ".js").default;
      return {
        ...state,
        selectedLanguage: action.payload,
        language: importedLanguage,
      };
    case "GET_CATEGORIES_SUCCESS":
      return { ...state, categories: action.payload };
    case "GET_BRANDS_SUCCESS":
      return { ...state, brands: action.payload };
    case "GET_COLORS_SUCCESS":
      return { ...state, colors: action.payload };

    case "GET_USE_CASES_SUCCESS":
      return { ...state, useCases: action.payload };

    case "ADD_ORDERS_SUCCESS":
      return { ...state, addOrderSuccess: action.payload };

    case "MY_SENT_OFFERS_SUCCESS":
      return { ...state, mySentOffers: action.payload };

    case "WITHDRAW_OFFER_SUCCESS":
      return { ...state, withdrawOfferSuccess: action.payload };

    case "ADD_USER_SUCCESS":
      return { ...state, addUserSuccess: action.payload };
    case "ADD_PRODUCTS_SUCCESS":
      return { ...state, addProductSuccess: action.payload };
    case "GET_USER_BY_ID_SUCCESS":
      return { ...state, productDetailUser: action.payload };

    case "USER_LOGIN_SUCCESS":
      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("userId", action.payload.id);
      localStorage.setItem("name", action.payload.name);
      localStorage.setItem("surname", action.payload.surname);
      return { ...state, token: action.payload.token };
    case "USER_LOGOUT_SUCCESS":
      localStorage.setItem("token", "");
      return { ...state, token: "" };

    case "GET_PRODUCTS_SUCCESS":
      return { ...state, products: action.payload };
    case "SET_CATEGORY":
      return { ...state, selectedCategory: action.payload };
    default:
      return state;
  }
};
