import React, { useState } from "react";
import MoreHorizOutlinedIcon from "@mui/icons-material/MoreHorizOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import MessageOutlinedIcon from "@mui/icons-material/MessageOutlined";
import SendOutlinedIcon from "@mui/icons-material/SendOutlined";
import "./Post.scss";
import Comments from "../Comments/Comments";
import { Link } from "react-router-dom";
import { useUserContext } from "../../providers/AuthContext";

const Post = ({ id, caption, image, likes, comments, user }) => {
  const [localLikes, setLocalLikes] = useState({
    likes: likes,
    liked: false,
  });

  const [commentOpen, setCommentOpen] = useState(false);
  const [commentsLocal, setCommentsLocal] = useState(comments);
  const { authTokens } = useUserContext();

  const likeHandler = async () => {
    const response = await fetch(`http://127.0.0.1:8000/api/posts/${id}/like`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + String(authTokens.access),
      },
    });

    if (response.status === 200) {
      if (!localLikes.liked) {
        setLocalLikes((prevState) => ({
          likes: prevState.likes + 1,
          liked: true,
        }));
      } else {
        setLocalLikes((prevState) => ({
          likes: prevState.likes - 1,
          liked: false,
        }));
      }
    } else {
      alert("something went wrong");
    }
  };

  const commentHandler = async (comment) => {
    if (comment.trim().length < 3) {
      alert("Very Short comment");
      return;
    }
    const response = await fetch(
      `http://127.0.0.1:8000/api/posts/${id}/comment`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + String(authTokens.access),
        },
        body: JSON.stringify({
          comment: comment,
        }),
      }
    );

    const data = await response.json();
    setCommentsLocal((prevState) => [data, ...prevState]);
  };

  return (
    <div className="post">
      <div className="top">
        <div className="user-info-post">
          <img src={user.profilePic} alt="" />
          <div className="user">
            <Link to={`/profile/${user.user.username}`}>
              <span className="username">
                {user.user.first_name + " " + user.user.last_name}
              </span>
            </Link>
            <span className="time">1hr ago</span>
          </div>
        </div>
        <MoreHorizOutlinedIcon className="icons" />
      </div>
      <div className="center">
        <p className="content">{caption}</p>
        <div className="img">{image && <img src={image} alt="" />}</div>
      </div>
      <div className="bottom">
        <div>
          <FavoriteBorderOutlinedIcon
            fontSize="large"
            className="icons"
            onClick={likeHandler}
          />
          <b>
            <span>{localLikes.likes}</span>
          </b>
        </div>
        <div>
          <MessageOutlinedIcon
            fontSize="large"
            className="icons"
            onClick={() => setCommentOpen(!commentOpen)}
          />
          <b>
            <span>{comments.length}</span>
          </b>
        </div>
        <SendOutlinedIcon fontSize="large" className="icons" />
      </div>
      <Comments
        isOpen={commentOpen}
        comments={commentsLocal}
        commentHandler={commentHandler}
      />
    </div>
  );
};

export default Post;
