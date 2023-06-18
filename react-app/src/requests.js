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


export { handleLogout };
