import React, { useState, StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import "./styles.css";
import Login from "./login";
import Axios from "axios";

// npm start
const root = ReactDOM.createRoot(document.getElementById("root"));

function App() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginStatus, setLoginStatus] = useState("");
  
  const handleLogin = () => {
    Axios.post(
      "http://localhost:5000/api/login",
      {
        username: username,
        password: password,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => {
        console.log(response);

        if (response.data.error) {
          // check for server error
          console.log(response.data.error);
          alert(response.data.error);
        }

        if (response.data.auth) {
          //  check for auth
          console.log("login succesful");
          setLoginStatus(response.data.auth);
        } else {
          console.log("Login failed");
          setLoginStatus("Wrong username/password");
        }
      })
      .catch(function (error) {
        console.log(error.message);
        alert(error.message);
      });
  }

  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="login" element={<Login
              handleLogin={handleLogin}
              setUsername={setUsername}
              setPassword={setPassword}
              loginStatus={loginStatus}
            />
          }
        />
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
