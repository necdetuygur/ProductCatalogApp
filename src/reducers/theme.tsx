const INITIAL_STATE = {
  theme: localStorage.getItem("theme") || "bootstrap.min",
};

const reducer = (state = INITIAL_STATE, action: any) => {
  switch (action.type) {
    case "THEME":
      var css = "/css/" + action.payload + ".css";
      var link = document.createElement("link");
      link.type = "text/css";
      link.rel = "stylesheet";
      link.href = css;
      document.head.appendChild(link);
      localStorage.setItem("theme", action.payload);
      return { ...state, theme: action.payload };

    default:
      return state;
  }
};

export default reducer;
