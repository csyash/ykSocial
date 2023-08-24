import React, { useEffect, useState } from "react";
import "./Rightbar.scss";
import { useUserContext } from "../../providers/AuthContext";
import { Link, useNavigate } from "react-router-dom";

const Rightbar = () => {
  const { authTokens } = useUserContext();
  const [users, setUsers] = useState([]);
  let navigate = useNavigate();

  let getData = async () => {
    const response = await fetch(`http://127.0.0.1:8000/api/nonfollow/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + String(authTokens.access),
      },
    });

    const data = await response.json();

    setUsers(data);
  };

  useEffect(() => {
    getData();
  }, []);

  const followHandler = async (username) => {
    const response = await fetch(
      `http://127.0.0.1:8000/api/profile/${username}/follow`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + String(authTokens.access),
        },
      }
    );

    navigate(0);
  };

  const dismissHandler = (userID) => {
    setUsers((prevState) =>
      prevState.filter((user) => {
        return user.user.id != userID;
      })
    );
  };

  return (
    <div className="rightbar">
      <div className="wrapper">
        <div className="item">
          <span>Suggestions</span>
          {users.map((user) => {
            return (
              <div className="list-item" key={user.user.id}>
                <Link to={`/profile/${user.user.username}`}>
                  <div className="user-info">
                    <img src={user.profilePic} alt="" />
                    <span>
                      {user.user.first_name + " " + user.user.last_name}
                    </span>
                  </div>
                </Link>
                <div className="buttons">
                  <button
                    onClick={() => {
                      followHandler(user.user.username);
                    }}
                  >
                    Follow
                  </button>
                  <button onClick={() => dismissHandler(user.user.id)}>
                    Dismiss
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Rightbar;
