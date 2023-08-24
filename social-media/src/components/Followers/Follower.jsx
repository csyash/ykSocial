import React from "react";
import "./Follower.scss";
import { Link } from "react-router-dom";
import { useUserContext } from "../../providers/AuthContext";

const returnUser = () => {
  const { user } = useUserContext();

  return user;
};

const Follower = ({ profilePic, user, handleClose }) => {
  const [isFollowing, setIsFollowing] = React.useState(true);
  const { authTokens } = useUserContext();
  const loggedUser = returnUser();

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
  };

  return (
    <div className="follower">
      <div className="container">
        <Link to={`/profile/${user.username}`} onClick={handleClose}>
          <div className="user-info">
            <img src={profilePic} alt="" />
            <b>{user.first_name + " " + user.last_name}</b>
          </div>
        </Link>
        <div className="buttons">
          <button
            onClick={() => {
              setIsFollowing(false);
              followHandler(user.username);
            }}
            style={{ display: isFollowing ? "block" : "none" }}
          >
            Following
          </button>

          <button
            onClick={() => {
              setIsFollowing(true);
              followHandler(user.username);
            }}
            style={{ display: isFollowing ? "none" : "block" }}
          >
            Follow
          </button>
        </div>
      </div>
    </div>
  );
};

export default Follower;
