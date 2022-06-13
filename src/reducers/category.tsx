const INITIAL_STATE = {
  categories: [],
  selectedCategory: "",
};

const reducer = (state = INITIAL_STATE, action: any) => {
  switch (action.type) {
    case "GET_CATEGORIES_SUCCESS":
      return { ...state, categories: action.payload };

    case "SET_CATEGORY":
      return { ...state, selectedCategory: action.payload };

    default:
      return state;
  }
};

export default reducer;
