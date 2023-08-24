import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Follower from "../Followers/Follower";
import { useUserContext } from "../../providers/AuthContext";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "30%",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  display: "flex",
  flexDirection: "column",
  gap: "10px",
  textAlign: "center",
  overflow: "scroll",
  maxHeight: "50vh",
};

export default function NewPost({ isOpen, handleClose }) {
  const [following, setFollowing] = React.useState([]);
  const { user, authTokens } = useUserContext();

  React.useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    let response = await fetch(
      `http://127.0.0.1:8000/api/profile/${user.username}/following`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + String(authTokens.access),
        },
      }
    );

    let data = await response.json();
    setFollowing(data);
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
          {following.map((user, index) => {
            return (
              <Follower
                {...user.user}
                handleClose={handleClose}
                key={user.user.user.id}
              />
            );
          })}
        </Box>
      </Modal>
    </div>
  );
}
