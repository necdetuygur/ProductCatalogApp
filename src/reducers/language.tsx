const INITIAL_STATE = {
  selectedLanguage: localStorage.getItem("selectedLanguage") || "en",
  language: require("../language." +
    (localStorage.getItem("selectedLanguage") || "en") +
    ".tsx").default,
};

const reducer = (state = INITIAL_STATE, action: any) => {
  switch (action.type) {
    case "SET_LANGUAGE":
      localStorage.setItem("selectedLanguage", action.payload);
      var importedLanguage = require("../language." +
        action.payload +
        ".tsx").default;
      document.title = importedLanguage.appName;
      return {
        ...state,
        selectedLanguage: action.payload,
        language: importedLanguage,
      };

    default:
      return state;
  }
};

export default reducer;
