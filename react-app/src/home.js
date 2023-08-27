import React, { useState } from "react";
import "./css/home.css";
import { handleLogout, CheckAuth } from "./requests";
import { useNavigate } from "react-router-dom";
import Upload from "./upload";
import Files from "./files";

const Home = () => {
  const navigate = useNavigate();
  const [showUpload, setShowUpload] = useState(true);
  const username = localStorage.getItem("username");
  const token = localStorage.getItem("token");

  if (token === null || username === null) {
    window.location.replace("/login");
  }
  var allSelected = false;
  return (
    <>
      <div id="HEADER">
        <h1>welcome home {username}</h1>
        <button
          onClick={() => {
            handleLogout(username, token);
            navigate("/login");
          }}
        >
          Logout{" "}
        </button>
        <button
          onClick={() => {
            SelectAll();
          }}
        >
          Select all
        </button>
        <button
          onClick={() => {
            
          }}
        >
          Download Selected
        </button>
        <button onClick={() => setShowUpload(!showUpload)}>Upload</button>
        {showUpload ? null : <Upload setShowUpload={setShowUpload} />}
      </div>

      <Files />
    </>
  );
  function SelectAll() {
    allSelected = !allSelected;
    var inputs = document.querySelectorAll("input[type='checkbox']");
    for (var i = 0; i < inputs.length; i++) {
      inputs[i].checked = !allSelected;
    }
  }
};
export default Home;
