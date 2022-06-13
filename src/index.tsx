import ReactDOM from "react-dom/client";
import "./css/style.css";
import App from "./App";
import configureStore from "./store";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
const store = configureStore();

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);
