import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import Axios from "axios";
import "./styles.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
let content;

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
    ).then((response) => {
      console.log(response);
      if (response.data.auth) {
        console.log("login succesful")
        setLoginStatus(response.data.auth);
      } 
      else {
        console.log("Login failed")
        setLoginStatus("Wrong username/password");
      }
    }).catch(function(error) {
      console.log(error);
      alert(error);
    });
  };

  return (
    <form className="loginform">
      <h1>CloudBox</h1>
      <label>
        Username:
        <br />
        <input
          name="username"
          type="text"
          maxLength={20}
          onChange={(e) => setUsername(e.target.value)}
          required
          />
      </label>
      <br />
      <label>
        Password:
        <br />
        <input
          name="password"
          type="password"
          maxLength={20}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </label>
      <br />
      <button type="button" onClick={handleLogin}>
        Login
      </button>
      <p>{loginStatus}</p>
    </form>
  );
}
if (true) {
  content = <App />;
} else {
}

root.render(content);
