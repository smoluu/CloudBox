import React, { useEffect, useState } from "react";

const Upload = ({ setShowUpload }) => {
  const [fileArray, setFileArray] = useState([]);
  const [filesElement, setFilesElement] = useState([]);

  const onFileChange = (e) => {
    const files = Array.from(e.target.files)
    setFileArray(files);
    const results = [];
    files.forEach((file) => {
      results.push(
        <li key={file.name}>
          <strong>{file.name}</strong>
          <p id="sizeP">{bytesToSize(file.size)}</p>
          <button onClick={removeFile} id="remove-file-button">X</button>
          
        </li>
      );
    });
    document.getElementById("uploadButton").disabled = false;
    setFilesElement(<div>{results}</div>,);
  };

  useEffect(() => {
    console.log("FILE ARRAY",fileArray);
  });

  const handleUpload = () => {
    setFileArray(fileArray.splice(1,1))
  };
  const removeFile = () => {

  }

  function bytesToSize(bytes) {
    var sizes = ["Bytes", "KB", "MB", "GB", "TB"];
    if (bytes === 0) return "n/a";
    var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
    if (i === 0) return bytes + " " + sizes[i];
    return (bytes / Math.pow(1024, i)).toFixed(1) + " " + sizes[i];
  }
  

  return (
    <>
      <div className="upload-component">
        <h1>Select files to upload</h1>
        <button onClick={() => setShowUpload(false)}>X</button>
        <div className="upload-component-info">
          <input
            id="fileInput"
            type="file"
            onChange={onFileChange}
            multiple="true"
          ></input>
          <button id="uploadButton" disabled="false" onClick={handleUpload}>Upload</button>
        </div>
        <div className="files">
          <ol>{filesElement}</ol>
        </div>
      </div>
    </>
  );
};

export default Upload;
