import React from "react";
import "./navbar.scss";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";

import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import Person2OutlinedIcon from "@mui/icons-material/Person2Outlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import { useUserContext } from "../../providers/AuthContext";
import { Link, Navigate, redirect } from "react-router-dom";

const Navbar = () => {
  const { user, logoutUser } = useUserContext();

  return Object.keys(user).length > 0 ? (
    <div className="navbar">
      <div className="wrapper">
        <div className="left">
          <Link to={"/"}>
            <span>YKSocial</span>
          </Link>

          <DarkModeOutlinedIcon />
          <div className="search-field">
            <SearchOutlinedIcon />
            <input type="text" placeholder="Search" />
          </div>
        </div>
        <div className="right">
          <Person2OutlinedIcon />
          <EmailOutlinedIcon />
          <NotificationsNoneOutlinedIcon />
          <Link to={`/profile/${user.username}`}>
            <div className="user">
              <img src={user.userInfo.profilePic} />
              <span>{user.userInfo.user.first_name}</span>
            </div>
          </Link>
          <Link onClick={logoutUser}>Logout</Link>
        </div>
      </div>
    </div>
  ) : (
    <Navigate to={"/login"} />
  );
};

export default Navbar;
