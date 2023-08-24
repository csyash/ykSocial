import React from "react";
import "./Comments.scss";
import { useState } from "react";
import { useUserContext } from "../../providers/AuthContext";

const Comments = ({ isOpen, comments, commentHandler }) => {
  const { user } = useUserContext();

  const [commentLocal, setCommentLocal] = useState("");

  return (
    <div style={{ display: isOpen ? "block" : "none" }} className="comments">
      <div className="container">
        <div className="comment">
          <img src={user.userInfo.profilePic} />
          <div className="user-info">
            <span>{user.userInfo.user.first_name}</span>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                let comment = e.target.comment.value;
                commentHandler(comment);
                setCommentLocal("");
              }}
            >
              <input
                type="text"
                name="comment"
                placeholder="Comment"
                value={commentLocal}
                onChange={(e) => setCommentLocal(e.target.value)}
              />
              <button type="submit">Comment</button>
            </form>
          </div>
        </div>
        {comments.map((comment) => {
          return (
            <div className="comment" key={comment.id}>
              <img src={comment.user.profilePic} />
              <div className="user-info">
                <span>
                  {comment.user.user.first_name +
                    " " +
                    comment.user.user.last_name}
                </span>
                <p>{comment.comment}</p>
              </div>
              <span className="time">1 hr ago</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Comments;
