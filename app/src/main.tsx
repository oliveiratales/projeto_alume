import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { CssBaseline } from "@mui/material";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ColorModeProvider } from "./contexts/ColorModeProvider";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ColorModeProvider>
      <CssBaseline />
      <App />
      <ToastContainer />
    </ColorModeProvider>
  </React.StrictMode>
);
