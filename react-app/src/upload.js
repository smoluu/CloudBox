import React, { useEffect, useState } from "react";

var fileArray = [];

const Upload = ({ setShowUpload }) => {
  const [filesElement, setFilesElement] = useState([]);

  const onFileChange = (e) => {
    if (e.target.files){
      console.log("e.target.files",e.target.files);
      fileArray = Array.from(e.target.files)
      const results = [];
      fileArray.forEach((file,index) => {
        results.push(
          <li key={index} id={"li"+index}>
            <strong>{file.name}</strong>
            <p id="sizeP">{bytesToSize(file.size)}</p>
            <button onClick={(e) => removeFile(e.target.parentElement.id)} id="remove-file-button">X</button>
            
          </li>
        )
      });
      document.getElementById("uploadButton").disabled = false;
      setFilesElement(
        <div>
        {results}
      </div>);
    }
  };

  useEffect(() => {
    console.log("FILE ARRAY",fileArray);
  });

  const handleUpload = () => {

  };
  const removeFile = (id) => {
    const index = id.replace("li","")
    //set file array state
    fileArray.splice(index,1);
    console.log(fileArray)
    console.log(id)
    //delete elements
    document.getElementById(id).remove();
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
            id="fileInputButton"
            type="file"
            onChange={onFileChange}
            multiple="true"
            style={{ display: "none" }}
          ></input>
          <label className="custom-button" for="fileInputButton">
            Select files
          </label>
          <button
            id="uploadButton"
            disabled="false"
            onClick={handleUpload}
            style={{ display: "none" }}
          ></button>

          <label className="custom-button" for="uploadButton">
            Upload files
          </label>
        </div>
        <div className="files">
          <ol>{filesElement}</ol>
        </div>
      </div>
    </>
  );
};

export default Upload;
