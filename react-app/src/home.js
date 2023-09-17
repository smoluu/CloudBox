import React, { useState } from "react";
import "./css/home.css";
import { handleLogout, DownloadFiles } from "./requests";
import { useNavigate } from "react-router-dom";
import Upload from "./upload";
import Files from "./files";

const Home = () => {
  const navigate = useNavigate();
  const [showUpload, setShowUpload] = useState(true);
  const username = localStorage.getItem("username");
  const token = localStorage.getItem("token");
  const [filesUpdate, setFilesUpdate] = useState(0); //used to update files

  const handleFilesUpdate = () => {
    setFilesUpdate(Math.floor(Math.random() * 1000));
  };


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
          Logout <span role="img" aria-label="X-symbol">&#10060;</span>
        </button>
        <button
          onClick={() => {
            SelectAll();
          }}
          >
          Select all <span role="img" aria-label="X-symbol">&#9745;</span>
        </button>
        <button
          onClick={() => {
            DownloadFiles(SelectedFileNames());
          }}
        >
          Download Selected <span role="img" aria-label="X-symbol">&#10225;</span>
        </button>
        <button onClick={() => {}}>Delete Selected <span role="img" aria-label="X-symbol">&#9851;</span>
        </button>
        <button
          onClick={() => {
            setShowUpload(!showUpload);
          }}
        >
          Upload <span role="img" aria-label="X-symbol">&#10224;</span>
        </button>
        {showUpload ? null : (
          <Upload
            setShowUpload={setShowUpload}
            handleFilesUpdate={handleFilesUpdate}
          />
        )}
      </div>

      <Files key={filesUpdate} />
    </>
  );
  function SelectAll() {
    allSelected = !allSelected;
    var inputs = document.querySelectorAll("input[type='checkbox']");
    for (var i = 0; i < inputs.length; i++) {
      inputs[i].checked = !allSelected;
    }
  }
  function SelectedFileNames() {
    var checkboxes = document.querySelectorAll("input[type=checkbox]:checked");
    var fileNames = [];
    for (var i = 0; i < checkboxes.length; i++) {
      var parentID = checkboxes[i].parentElement.id;
      var nameID = parentID.replace("fileDiv", "fileName");
      fileNames.push(document.getElementById(nameID).textContent);
    }
    return fileNames;
  }
};
export default Home;
