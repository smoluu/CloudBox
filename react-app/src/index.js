import React, { useState, StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import "./css/styles.css";
import Login from "./login";
import Home from "./home";

// npm start
const root = ReactDOM.createRoot(document.getElementById("root"));

function App() {

  

  const [loginStatus, setLoginStatus] = useState("");

  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route
          path="/login"
          element={
            <Login loginStatus={loginStatus} setLoginStatus={setLoginStatus} />
          }
        />
        <Route
          path="/home"
          element={
            <Home loginStatus={loginStatus} setLoginStatus={setLoginStatus} />
          }
        ></Route>
      </Routes>
    </>
  );
}

root.render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);
