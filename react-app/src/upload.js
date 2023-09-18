import React, { useEffect, useState } from "react";
import {handleUpload,CheckAuth } from "./requests";

var fileArray = [];
var results = [];

const Upload = ({ setShowUpload,handleFilesUpdate }) => {
  const [filesElement, setFilesElement] = useState([]);

  const onFileChange = (e) => {
    if (e.target.files) {
      fileArray = [];
      fileArray = Array.from(e.target.files);
      for (var i = 0; i < fileArray.length; i++) {
        results.push(
          <li key={i} id={"li" + i}>
            <strong>{fileArray[i].name}</strong>
            <p id="sizeP">{bytesToSize(fileArray[i].size)}</p>
            <button
              onClick={(e) => removeFile(e.target.parentElement.id)}
              id="remove-file-button"
              className="custom-button"
            >
              X
            </button>
          </li>
        );
      }
      setFilesElement(<div>{results}</div>);
    }
  };

  useEffect(() => {});

  const removeFile = (id) => {
    const index = id.replace("li", "");
    fileArray.splice(index, 1);
    results.splice(index, 1);
    setFilesElement(<div>{results}</div>);
  };

  function bytesToSize(bytes) {
    var sizes = ["Bytes", "KB", "MB", "GB", "TB"];
    if (bytes === 0) return "n/a";
    var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
    if (i === 0) return bytes + " " + sizes[i];
    return (bytes / Math.pow(1024, i)).toFixed(1) + " " + sizes[i];
  }

  const handleUploadButton = async () => {
    if (fileArray.length > 0) {
      if (CheckAuth()) {
        await handleUpload("http://localhost:5000/api/upload", fileArray);
        setFilesElement(<div>succesfully uploaded</div>);
        handleFilesUpdate();
        fileArray = [];
      }
    }
  };
  return (
    <>
      <div className="upload-component">
        <h1>Upload</h1>
        <button onClick={() => setShowUpload(true)}>X</button>
        <div className="upload-component-info">
          <input
            id="fileInputButton"
            type="file"
            onChange={onFileChange}
            onClick={() => {
              results = [];
              fileArray = [];
              setFilesElement(<div></div>);
            }} // empty file array
            multiple={true}
            style={{ display: "none" }}
          ></input>
          <label className="custom-button" htmlFor="fileInputButton">
            Select files
          </label>
          <button
            id="uploadButton"
            onClick={handleUploadButton}
            style={{ display: "none" }}
          ></button>

          <label className="custom-button" htmlFor="uploadButton">
            Upload files
          </label>
        </div>
        <div className="files" id="filesElement">
          <ol>{filesElement}</ol>
        </div>
      </div>
    </>
  );
};

export default Upload;
