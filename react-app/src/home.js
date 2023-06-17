import React from "react";
import Axios from "axios";
import { useNavigate } from "react-router-dom";

const Home = ({ loginStatus, setLoginStatus }) => {
  const navigate = useNavigate();
  const CheckAuth = () => {
    const token = localStorage.getItem("token");
    Axios.post(
      "http://localhost:5000/api/login",
      {
        token: token,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      }
    ).then((response) => {
      if (response.data.auth){
        return true
      }
      else {
        navigate("/login")
      }
    });

  };
  if (CheckAuth() === true) {

  }
  return <p>Welcome to your Home </p>;
};
export default Home;
