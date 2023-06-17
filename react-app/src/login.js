import React, {useState} from "react";
import Axios from "axios";
import { useNavigate } from "react-router-dom";


const Login = ({ loginStatus,setLoginStatus }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

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

        if (response.data.token) {
          //  check for auth
          console.log("login succesful");
          setLoginStatus(true);
          localStorage.setItem("token", response.data.token)
          navigate("/home")
        } else {
          console.log("Login failed");
          setLoginStatus(false);
        }
      })
      .catch(function (error) {
        console.log(error.message);
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
      </form>
    </>
  );
};

export default Login;
