import React from "react";
import ReactDOM from "react-dom";
import App from "./App.jsx";
import { Provider } from "react-redux";
import "./styles.css";
import "./fonts/GeosansLight.ttf";
import "./fonts/Montserrat-Black.ttf";
import { store } from "./redux/store";
ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("app")
);
