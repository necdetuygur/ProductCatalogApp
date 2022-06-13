const INITIAL_STATE = {
  useCases: [],
};

const reducer = (state = INITIAL_STATE, action: any) => {
  switch (action.type) {
    case "GET_USE_CASES_SUCCESS":
      return { ...state, useCases: action.payload };

    default:
      return state;
  }
};

export default reducer;
