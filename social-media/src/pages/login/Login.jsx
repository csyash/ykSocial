import { useState } from "react";
import React from "react";
import "./Login.scss";
import { Link, Navigate } from "react-router-dom";
import { useUserContext } from "../../providers/AuthContext";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { loginUser } = useUserContext();
  const submitHandler = (e) => {
    e.preventDefault();
    const userInfo = {
      username: username,
      password: password,
    };
    loginUser(userInfo);
    <Navigate to={"/"} />;

    // setUsername("");
    // setPassword("");
  };
  return (
    <div className="login">
      <div className="card">
        <div className="left">
          <h1>Hello World.</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore in
            perferendis nostrum sapiente iste cumque pariatur ea. Est, corrupti
            quo dolore necessitatibus odit molestias, qui ducimus obcaecati
            doloremque nihil veritatis.
          </p>
          <span>Don't have an account ?</span>
          <Link className="link" to={"/register"}>
            <button>Register</button>
          </Link>
        </div>
        <div className="right">
          <h2>Login</h2>
          <form onSubmit={submitHandler}>
            <input
              type="text"
              placeholder="Username..."
              onChange={(e) => setUsername(e.target.value)}
              value={username}
            />
            <input
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
            <button type="submit">Login</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
