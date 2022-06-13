const INITIAL_STATE = {
  colors: [],
};

const reducer = (state = INITIAL_STATE, action: any) => {
  switch (action.type) {
    case "GET_COLORS_SUCCESS":
      return { ...state, colors: action.payload };

    default:
      return state;
  }
};

export default reducer;
