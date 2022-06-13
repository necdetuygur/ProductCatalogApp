const INITIAL_STATE = {
  products: [],
  addProductSuccess: {},
  productDetailUser: {},
};

const reducer = (state = INITIAL_STATE, action: any) => {
  switch (action.type) {
    case "ADD_PRODUCTS_SUCCESS":
      return { ...state, addProductSuccess: action.payload };

    case "GET_USER_BY_ID_SUCCESS":
      return { ...state, productDetailUser: action.payload };

    case "GET_PRODUCTS_SUCCESS":
      return { ...state, products: action.payload };

    default:
      return state;
  }
};

export default reducer;
