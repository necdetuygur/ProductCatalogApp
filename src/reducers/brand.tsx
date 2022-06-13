const INITIAL_STATE = { brands: [] };

const reducer = (state = INITIAL_STATE, action: any) => {
  switch (action.type) {
    case "GET_BRANDS_SUCCESS":
      return { ...state, brands: action.payload };

    default:
      return state;
  }
};

export default reducer;
