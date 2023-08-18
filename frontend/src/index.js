import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "./routes/Login/login";
import SignUp from "./routes/Signup/Signup";
import Home from "./routes/Home/Home";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
  //   <App />
  // </React.StrictMode>

  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Navigate replace to="/login" />} />
      <Route exact path="/login" element={<Login />} />
      <Route path="/SignUp" element={<SignUp />} />
      <Route path="/home" element={<App />} />
    </Routes>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
