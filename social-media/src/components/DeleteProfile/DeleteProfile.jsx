import React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { useUserContext } from "../../providers/AuthContext";
import { useNavigate } from "react-router-dom";
import "./DeleteProfile.scss";

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
  height: "30vh",
  width: "40vw",
};

export default function DeleteProfile({ isOpen, handleClose }) {
  const { logoutUser, authTokens, user } = useUserContext();
  const navigate = useNavigate();

  const handleDeleteProfile = async () => {
    let response = await fetch(
      `http://127.0.0.1:8000/api/profile/${user.username}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + String(authTokens.access),
        },
      }
    );

    console.log(response);
    if (response.status == 200) {
      logoutUser();
      navigate("/login");
    }
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
          <div className="delete-modal">
            <p>Are you sure you want to delete your profile ?</p>
            <div className="btns">
              <button onClick={handleDeleteProfile}> Delete </button>
              <button onClick={handleClose}> Don't Delete</button>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
