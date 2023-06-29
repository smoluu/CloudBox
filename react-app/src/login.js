import React, { useState } from "react";
import Axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = ({ loginStatus, setLoginStatus }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    return await 
    Axios.post(
      "http://localhost/api/login",
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

        if (response.data.token) {
          //  check for auth
          console.log("login succesful");
          setLoginStatus(true);
          localStorage.setItem("token", response.data.token);
          localStorage.setItem("username", username);
          navigate("/home");
        } else {
          console.log("Login failed");
          alert("Wrong username/password")
          setLoginStatus(false);
        }
      })
      .catch(function (error) {
        console.log(error.message);
        alert(error.message);
      });
  };

  async function handleRegister () {
    if (password.length <= 5) {
      alert("password too short");
      return;
    }
    return await
    Axios.post(
      "http://localhost:5000/api/register",
      {
        username: username,
        password: password,
      },
      {
        headers: { "Content-Type": "application/json" },
      }
    )
      .then((response) => {
        if (response.data.error) {
          alert(response.data.error);
        }
        if (response.data) {
          alert(response.data.message);
        }
      })
      .catch(function (error) {
        alert(error.message);
      });
    }


  return (
    <>
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
        <button type="button" onClick={handleRegister}>
          Register
        </button>
      </form>
    </>
  );
};

export default Login;
