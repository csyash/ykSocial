import React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import "./NewPost.scss";
import { useUserContext } from "../../providers/AuthContext";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  display: "flex",
  flexDirection: "column",
  gap: "10px",
  textAlign: "center",
  overflow: "scroll",
  height: "70vh",
  width: "50vw",
};

export default function NewPost({ isOpen, handleClose }) {
  const [postCaption, setPostCaption] = React.useState("");
  const [postImg, setPostImg] = React.useState("");

  const { authTokens, user } = useUserContext();

  const postData = async () => {
    let response = await fetch("http://127.0.0.1:8000/api/posts/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + String(authTokens.access),
      },
      body: JSON.stringify({
        "post-caption": postCaption,
        "post-image": postImg,
      }),
    });

    let data = await response.json();
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (!isImageUrl(postImg)) return alert("Enter valid image url");

    if (postImg.trim().length == 0) return alert("Please enter valid captcha");

    postData();
    handleClose();
  };

  function isImageUrl(url) {
    const pattern =
      /\bhttps?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}(?:\.[a-z]{2,6}){1,2}\b(?:[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/;
    return pattern.test(url);
  }

  return (
    <div>
      <Modal
        open={isOpen}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <form className="new-post" onSubmit={submitHandler}>
            <b style={{ fontSize: "32px" }}>New Post</b>
            <div className="user-info">
              <img src={user.userInfo.profilePic} alt="" />
              <b>
                {user.userInfo.user.first_name + user.userInfo.user.last_name}
              </b>
            </div>
            <input
              type="text"
              name="post-image"
              placeholder="Image link"
              onChange={(e) => setPostImg(e.target.value)}
              value={postImg}
            />
            <input
              type="text"
              name="post-caption"
              placeholder="caption"
              onChange={(e) => setPostCaption(e.target.value)}
              value={postCaption}
            />
            <input type="submit" className="submit" />
          </form>
        </Box>
      </Modal>
    </div>
  );
}
