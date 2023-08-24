import { useState } from "react";
import React from "react";
import "./Leftbar.scss";
import UserFollowing from "../UserFollowing/UserFollowing";
import NewPost from "../NewPost/NewPost";
import { useUserContext } from "../../providers/AuthContext";

const Leftbar = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { user } = useUserContext();

  const [openNewPost, setOpenNewPost] = useState(false);

  return (
    <div className="leftbar">
      <div className="container">
        <div className="item">
          <div
            className="list-item"
            onClick={() => setOpenNewPost(!openNewPost)}
          >
            <img
              src="https://cdn3.vectorstock.com/i/1000x1000/68/82/teamwork-group-planning-and-creating-icon-vector-21386882.jpg"
              alt=""
            />
            <span>New Post</span>
          </div>
          <div className="list-item" onClick={handleOpen}>
            <img
              src="https://st2.depositphotos.com/1277743/5804/v/450/depositphotos_58044913-stock-illustration-friends-icon-design.jpg"
              alt=""
            />
            <span>Followers</span>
          </div>

          <div className="list-item">
            <img
              src="https://st2.depositphotos.com/1277743/5804/v/450/depositphotos_58044913-stock-illustration-friends-icon-design.jpg"
              alt=""
            />
            <span>MarketPlace</span>
          </div>
          <div className="list-item">
            <img
              src="https://st2.depositphotos.com/1277743/5804/v/450/depositphotos_58044913-stock-illustration-friends-icon-design.jpg"
              alt=""
            />
            <span>Memories</span>
          </div>
        </div>

        <div className="item">
          <span>Your Shortcuts</span>
          <div className="list-item">
            <img
              src="https://st2.depositphotos.com/1277743/5804/v/450/depositphotos_58044913-stock-illustration-friends-icon-design.jpg"
              alt=""
            />
            <span>Events</span>
          </div>
          <div className="list-item">
            <img
              src="https://st2.depositphotos.com/1277743/5804/v/450/depositphotos_58044913-stock-illustration-friends-icon-design.jpg"
              alt=""
            />
            <span>Gaming</span>
          </div>
          <div className="list-item">
            <img
              src="https://st2.depositphotos.com/1277743/5804/v/450/depositphotos_58044913-stock-illustration-friends-icon-design.jpg"
              alt=""
            />
            <span>Videos</span>
          </div>
          <div className="list-item">
            <img
              src="https://st2.depositphotos.com/1277743/5804/v/450/depositphotos_58044913-stock-illustration-friends-icon-design.jpg"
              alt=""
            />
            <span>Messages</span>
          </div>
        </div>
      </div>
      {Object.keys(user).length > 0 && (
        <UserFollowing isOpen={open} handleClose={handleClose} />
      )}
      {Object.keys(user).length > 0 && (
        <NewPost
          isOpen={openNewPost}
          handleClose={() => setOpenNewPost(!openNewPost)}
        />
      )}
    </div>
  );
};

export default Leftbar;
