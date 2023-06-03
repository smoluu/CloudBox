import React from "react";
import ReactDOM from "react-dom/client";
import "./styles.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
let content;
let isLoggedIn = false




if(isLoggedIn){
  content = <MainApp/>
}
else{
  content = <LoginForm/>
}

function LoginForm(){
  return (
    <form className="loginform">
      <h1>CloudDrive</h1>
      <label for="fname">Username:</label>
      <br />
      <input type="text" id="username" name="fname"></input>
      <br />
      <label for="password">Password:</label>
      <br />
      <input type="password" id="password" name="password"></input>
      <br />
      <br />
      <input type="submit" value="Login"></input>
    </form>
  );
}

function MainApp(){
  return (
    <div>
      <h1>Logged in!</h1>
    </div>
  )
}


root.render(content)

