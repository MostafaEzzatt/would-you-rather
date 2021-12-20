import React from "react";
import { render } from "react-dom";
import { BrowserRouter } from "react-router-dom";

//Components
import App from "./components/App.js";

// Material Ui
import { ThemeProvider } from "@mui/material/styles";
import theme from "./mui/theme.js";

//Styles
import "./index.css";

// Redux
import { Provider } from "react-redux";
import { store } from "./redux/app/store";
render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <App />
        </ThemeProvider>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
