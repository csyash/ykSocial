import React, { useState } from "react";
import "./Register.scss";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [username, setUsername] = useState("");
  const [firstName, setFirstname] = useState("");
  const [lastName, setLastname] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const postData = async () => {
    let response = await fetch("http://127.0.0.1:8000/api/reg", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        "first-name": firstName,
        "last-name": lastName,
        password: password,
      }),
    });

    let data = await response.json();

    if (response.status == 403) {
      alert("User already Exists");
      return;
    } else if (response.status == 200) {
      navigate("/login");
    }
    console.log(data);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    postData();
  };
  return (
    <div className="register">
      <div className="card">
        <div className="left">
          <h1>YKSocial</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore in
            perferendis nostrum sapiente iste cumque pariatur ea. Est, corrupti
            quo dolore necessitatibus odit molestias, qui ducimus obcaecati
            doloremque nihil veritatis.
          </p>
          <span>Do you have an account ?</span>
          <Link className="link" to={"/login"}>
            <button>Login</button>
          </Link>
        </div>
        <div className="right">
          <h2>Login</h2>
          <form onSubmit={submitHandler}>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              type="text"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstname(e.target.value)}
            />

            <input
              type="text"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastname(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit">Register</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
