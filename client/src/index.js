import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import "./styles/global.scss";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

ReactDOM.render(
    <React.StrictMode>
        <ToastContainer
            position='top-right'
            autoClose={2100}
            hideProgressBar={true}
            newestOnTop
            closeOnClick
            rtl={false}
        />
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </React.StrictMode>,
    document.getElementById("root")
);
