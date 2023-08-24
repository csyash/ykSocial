import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import UpdateProfile from "../UpdateProfile/UpdateProfile";
import DeleteProfile from "../DeleteProfile/DeleteProfile";

export default function ProfileDropdown() {
  const [action, setAction] = React.useState("");
  const [updateProfileOpen, setUpdateProfileOpen] = React.useState(false);
  const [deleteProfileOpen, setDeleteProfileOpen] = React.useState(false);

  const handleChange = (event) => {
    setAction(event.target.value);
  };

  const handleUpdateProfileOpen = () => {
    setUpdateProfileOpen(true);
  };
  const handleUpdateProfileClose = () => {
    setUpdateProfileOpen(false);
  };

  const handleDeleteProfileOpen = () => {
    setDeleteProfileOpen(true);
  };
  const handleDeleteProfileClose = () => {
    setDeleteProfileOpen(false);
  };

  return (
    <Box sx={{ minWidth: 100 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Update</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={action}
          label="action"
          onChange={handleChange}
        >
          <MenuItem value={"Update"} onClick={handleUpdateProfileOpen}>
            Update Profile
          </MenuItem>
          <MenuItem value={"Delete"} onClick={handleDeleteProfileOpen}>
            Delete Profile
          </MenuItem>
        </Select>
      </FormControl>
      <UpdateProfile
        isOpen={updateProfileOpen}
        handleClose={handleUpdateProfileClose}
      />
      <DeleteProfile
        isOpen={deleteProfileOpen}
        handleClose={handleDeleteProfileClose}
      />
    </Box>
  );
}
