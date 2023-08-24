import React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import "./UpdateProfile.scss";
import { useUserContext } from "../../providers/AuthContext";
import { useNavigate } from "react-router-dom";

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
  height: "65vh",
  width: "50vw",
};

export default function UpdateProfile({ isOpen, handleClose }) {
  const { user, authTokens } = useUserContext();
  const navigate = useNavigate();

  const [bio, setBio] = React.useState("");
  const [profilePic, setProfilePic] = React.useState("");
  const [coverPic, setCoverPic] = React.useState("");

  const postData = async () => {
    let response = await fetch(
      `http://127.0.0.1:8000/api/profile/${user.username}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + String(authTokens.access),
        },
        body: JSON.stringify({
          "profile-pic": profilePic,
          "cover-pic": coverPic,
          bio: bio,
        }),
      }
    );

    let data = await response.json();
  };
  const submitHandler = () => {
    postData();
    handleClose();
    navigate(0);
  };
  return (
    <div>
      <Modal
        open={isOpen}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <form className="update-profile" onSubmit={submitHandler}>
            <b style={{ fontSize: "32px" }}>Update Profile</b>
            <div className="user-info">
              <img src={user.userInfo.profilePic} alt="" />
              <b>
                {user.userInfo.user.first_name +
                  " " +
                  user.userInfo.user.last_name}
              </b>
            </div>
            <input
              type="text"
              name="post-image"
              placeholder="Profile Picture"
              onChange={(e) => setProfilePic(e.target.value)}
              value={profilePic}
            />
            <input
              type="text"
              name="post-caption"
              placeholder="Bio"
              onChange={(e) => setBio(e.target.value)}
              value={bio}
            />
            <input
              type="text"
              name="First_name"
              placeholder="Cover Pic"
              value={coverPic}
              onChange={(e) => setCoverPic(e.target.value)}
            />
            <input type="submit" className="submit" />
          </form>
        </Box>
      </Modal>
    </div>
  );
}
