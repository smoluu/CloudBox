import Axios from "axios";
import React, { useState, useEffect } from "react";

const Files = () => {
  const [homefilesElement, setHomeFilesElement] = useState([]);
  const token = localStorage.getItem("token");
  const fetchFiles = async () => {
    return Axios.post("http://localhost:5000/api/files", null, {
      headers: { "Content-Type": "application/json", Authorization: token },
    })
      .then((response) => {
        return response.data;
      })
      .catch(function (error) {
        alert(error.message);
      });
  };
  useEffect(() => {
    fetchFiles().then((res) => {

      if (res) {
        var result = [];
        var names = Array.from(res.names);
        var sizes = Array.from(res.sizes);
        for (let i = 0; i < names.length; i++) {
          result.push(
            <div key={i} id={"fileDiv" + i} className="FILEDIV">
              <input type="checkbox" id="checkbox">
              </input>
              <h3>{names[i]}</h3>
              <p>{bytesToSize(sizes[i])}</p>
            </div>
          );
        }
      }
      setHomeFilesElement(result);
    });
  }, []);
  return <div id="FILES">{homefilesElement}</div>;
};

function bytesToSize(bytes) {
  var sizes = ["Bytes", "KB", "MB", "GB", "TB"];
  if (bytes === 0) return "n/a";
  var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
  if (i === 0) return bytes + " " + sizes[i];
  return (bytes / Math.pow(1024, i)).toFixed(1) + " " + sizes[i];
}

export default Files;
