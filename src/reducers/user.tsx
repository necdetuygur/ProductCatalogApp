const INITIAL_STATE = {
  token: localStorage.getItem("token") || "",
  addUserSuccess: {},
  addUserError: { success: true },
  loginError: 0,
};

const reducer = (state = INITIAL_STATE, action: any) => {
  switch (action.type) {
    case "ADD_USER_SUCCESS":
      return { ...state, addUserSuccess: action.payload };

    case "ADD_USER_ERROR":
      return { ...state, addUserError: action.payload };

    case "USER_LOGIN_SUCCESS":
      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("userId", action.payload.id);
      localStorage.setItem("name", action.payload.name);
      localStorage.setItem("surname", action.payload.surname);
      return { ...state, token: action.payload.token, loginError: 0 };

    case "USER_LOGIN_ERROR":
      return { ...state, loginError: action.payload };

    case "USER_LOGOUT_SUCCESS":
      localStorage.setItem("token", "");
      localStorage.setItem("userId", "");
      localStorage.setItem("name", "");
      localStorage.setItem("surname", "");
      return { ...state, token: "" };

    default:
      return state;
  }
};

export default reducer;
