import React, { useState } from "react";
import "./Register.scss";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [username, setUsername] = useState("");
  const [firstName, setFirstname] = useState("");
  const [lastName, setLastname] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [formError, setFormError] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const postData = async () => {
    setLoading(true);
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

    if (response.ok) {
      setLoading(false);
      setError(false);
      navigate("/login");
    }

    setLoading(false);
    setError(true);
  };

  function validateUserInfo(userInfo) {
    // Check if userInfo is an object
    setLoading(true);
    if (typeof userInfo !== "object" || userInfo === null) {
      return false;
    }

    // Validate username, firstName, and lastName
    if (
      typeof userInfo.username !== "string" ||
      userInfo.username.length < 3 ||
      typeof userInfo.firstName !== "string" ||
      userInfo.firstName.length < 3 ||
      typeof userInfo.lastName !== "string" ||
      userInfo.lastName.length < 3
    ) {
      setLoading(false);
      return false;
    }

    // Validate password (basic validity)
    if (
      typeof userInfo.password !== "string" ||
      userInfo.password.length < 8 // You can adjust the minimum length as needed
    ) {
      setLoading(false);
      return false;
    }

    // You can add more advanced password validation logic if required

    // If all checks pass, the userInfo object is considered valid
    setLoading(false);
    return true;
  }

  const submitHandler = (e) => {
    e.preventDefault();
    const userInfo = {
      username,
      firstName,
      lastName,
      password,
    };
    if (validateUserInfo(userInfo)) postData();
    else setFormError(true);
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
          {error && <h4>Username Exists</h4>}
          {formError && <h4>Invalid Form Details </h4>}
          <form onSubmit={submitHandler}>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className={error ? "error" : ""}
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
            <button type="submit">
              {loading ? <p>Loading...</p> : <p>Register</p>}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
