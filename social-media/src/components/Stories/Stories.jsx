import React from "react";
import "./Stories.scss";
import { useUserContext } from "../../providers/AuthContext";
const Stories = () => {
  const stories = [
    {
      id: 1,
      profilePic:
        "https://i.pinimg.com/564x/0b/b6/ec/0bb6ecb724210dc7d733f1bde53ad6c4.jpg",
      profileUsername: "John Doe",
    },
    {
      id: 2,
      profilePic:
        "https://i.pinimg.com/1200x/9b/0a/a9/9b0aa9b7ad309bacd6e16e8d5c07906c.jpg",
      profileUsername: "Anna",
    },
    {
      id: 3,
      profilePic:
        "https://i.pinimg.com/564x/0b/b6/ec/0bb6ecb724210dc7d733f1bde53ad6c4.jpg",
      profileUsername: "John Doe",
    },
  ];

  const { user } = useUserContext();

  return (
    <div className="stories">
      <div className="wrapper">
        <div className="item">
          <img src={user.userInfo.profilePic} alt="Profile pic" />
          <div className="add">+</div>
          <span className="username">{user.username}</span>
        </div>
        {stories.map((story) => {
          return (
            <div className="item" key={story.id}>
              <img src={story.profilePic} alt="" />
              <span className="username">{story.profileUsername}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Stories;
