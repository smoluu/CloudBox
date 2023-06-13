import React from "react";

const Login = ({ handleLogin, setUsername, setPassword, loginStatus }) => {
  return (
    <>
      <form className="loginform">
        <h1>CloudBox</h1>
        <label>
          Username:
          <br />
          <input
            name="username"
            type="text"
            maxLength={20}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Password:
          <br />
          <input
            name="password"
            type="password"
            maxLength={20}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <br />
        <button type="button" onClick={handleLogin}>
          Login
        </button>
        <p>{String(loginStatus)}</p>
      </form>
    </>
  );
};

export default Login;
