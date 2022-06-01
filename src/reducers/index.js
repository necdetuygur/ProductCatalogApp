const INITIAL_STATE = {
    brands: []
};


export const reducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case "GET_BRANDS_SUCCESS":
            return { ...state, brands: action.payload };
        default:
            return state;
        }
      };