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
        localStorage.removeItem("username")
        localStorage.removeItem("token")

      }
    })
    .catch(function (error) {
      alert(error.message);
    });
}

  const handleUpload = (url,fileArray) => {  //add checkauth
    var formData = new FormData();
    for (var i = 0; i < fileArray.length; i++) {
      formData.append(fileArray[i].name, fileArray[i]);
    }
    console.log(formData)
    Axios.post(url,{
      data: formData,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then(response => { console.log({response})})
    .catch(error => {console.log({error})}
    );
  };

  const CheckAuth = async () => {
    const username = localStorage.getItem("username");
    const token = localStorage.getItem("token");
    if(username == null || token == null){
      alert("no auth")
      return false
    }

    await Axios.post(
      "http://localhost:5000/api/login",
      {
        username: username,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      }
    ).then(response => {
      if (response.data.auth === true) {
        return true
      } else {
        return false;
      }
    }).catch(error => {console.log({error})});
  };



export { handleLogout, handleUpload, CheckAuth };
