import Axios from "axios";


const handleLogout = (username, token) => {
  Axios.post(
    "http://localhost:5000/api/logout",
    {
      username: username,
      token: token,
    },
    {
      headers: { "Content-Type": "application/json" },
    }
  )
    .then((response) => {
      if (response.data.succesful) {
        localStorage.removeItem("username");
        localStorage.removeItem("token");
      }
    })
    .catch(function (error) {
      alert(error.message);
    });
}

const handleUpload = (url,fileArray) => {
  const username = localStorage.getItem("username");
  const token = localStorage.getItem("token");
  const FormData = require("form-data");
  var formData = new FormData();
  for (var i = 0; i < fileArray.length; i++) {
    formData.append("file", fileArray[i], fileArray[i].name);
  }
  Axios.post(url, formData,
    {
    headers: {
      Authorization: token
    }
  })
    .then((response) => {
      console.log({ response });
    })
    .catch((error) => {
      console.log({ error });
    });
};

const CheckAuth = async () => {
  const token = localStorage.getItem("token");
  if(token == null){
    alert("no auth")
    return false
  }
  await Axios.post("http://localhost:5000/api/login",null,
  {
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
  })
  .then((response) => {
    if (response.data.auth === true) {
      return true;
    } else {
      return false;
    }
  })
  .catch((error) => {
    console.log({ error });
  });
};
const DownloadFiles = async (fileNames) => {
  const token = localStorage.getItem("token");
  return Axios.post(
    "http://localhost:5000/api/files",
    {
      Action: "DownloadFiles",
      FileNames:  fileNames
    },
    {
      responseType: 'blob', 
      headers: { "Content-Type": "application/json", Authorization: token },
    }
  )
    .then(response => {
      const blob = new Blob([response.data], { type: response.data.type });
      const url = URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = "files.jpg"
      document.body.append(a)
      a.click()
      URL.revokeObjectURL(url)
    })
    
    .catch(function (error) {
      alert(error.message);
    });
};
export { handleLogout, handleUpload, CheckAuth, DownloadFiles};
