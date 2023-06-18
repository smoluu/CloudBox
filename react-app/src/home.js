import React, { useState } from "react";
import "./css/home.css"
import { handleLogout } from "./requests"
import { useNavigate} from "react-router-dom";
import Axios from "axios";


const Home = ({ loginStatus, setLoginStatus }) => {
  const navigate = useNavigate();
  const [isloading, setloading] = useState(true);
  const username = localStorage.getItem("username");
  const token = localStorage.getItem("token");
  let auth;
  const CheckAuth = async () => {
    await Axios.post(
      "http://localhost:5000/api/login",
      {
        username: username
      },
      {
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      }
      ).then((response) => {
        if (response.data.auth === true) {
          console.log(response.data.auth,1);
          setloading(false);
        } else {
          navigate("/login");
          return false;
        }
      });
    };
    if(token === null || username === null){
      window.location.replace("/login");
    }
    
    CheckAuth()
    console.log(auth,2)
    if(isloading){
      return (
      <div>LOADING</div> 
      )
    }
    return(
      <>
      <div>
        <p>welcome home {username}</p>
        <button onClick={() => {
          handleLogout(username,token); navigate("/login")
          }}>LOGOUT</button>
      </div>
      </>
    )
};
export default Home;
