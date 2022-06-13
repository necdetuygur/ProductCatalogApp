const INITIAL_STATE = {
  addOrderSuccess: {},
  mySentOffers: {},
  withdrawOfferSuccess: 0,
  acceptOfferSuccess: 0,
};

const reducer = (state = INITIAL_STATE, action: any) => {
  switch (action.type) {
    case "ADD_ORDERS_SUCCESS":
      return { ...state, addOrderSuccess: action.payload };

    case "MY_SENT_OFFERS_SUCCESS":
      return { ...state, mySentOffers: action.payload };

    case "WITHDRAW_OFFER_SUCCESS":
      return { ...state, withdrawOfferSuccess: action.payload };

    case "ACCEPT_OFFER_SUCCESS":
      return { ...state, acceptOfferSuccess: action.payload };

    default:
      return state;
  }
};

export default reducer;
