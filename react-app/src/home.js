import React, { useState } from "react";
import "./css/home.css"
import { handleLogout,CheckAuth } from "./requests"
import { useNavigate} from "react-router-dom";
import Upload from "./upload";
import Files from "./files";


const Home = () => {
  const navigate = useNavigate();
  const [showUpload,setShowUpload] = useState(true)
  const username = localStorage.getItem("username");
  const token = localStorage.getItem("token");
  const auth = CheckAuth();


  if(token === null || username === null || !auth){
    window.location.replace("/login");
  }
  return (
    <>
      <div>
        <p>welcome home {username}</p>
        <button
          onClick={() => {
            handleLogout(username, token);
            navigate("/login");
          }}
        >
          LOGOUT
        </button>
        <button onClick={() => setShowUpload(!showUpload)}>Upload</button>
        {showUpload ?  null :<Upload setShowUpload={setShowUpload} />}

        <Files/>
      </div>
    </>
  );
};
export default Home;
