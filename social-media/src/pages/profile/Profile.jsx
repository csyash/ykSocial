import React, { useState, useEffect } from "react";
import "./Profile.scss";
import Post from "../../components/Post/Post";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import TwitterIcon from "@mui/icons-material/Twitter";
import EmailIcon from "@mui/icons-material/Email";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { useParams } from "react-router-dom";
import ProfileDropdown from "../../components/Dropdown/ProfileDropdown";
import { useUserContext } from "../../providers/AuthContext";

const Profile = () => {
  const [profile, setProfile] = useState([]);
  const [posts, setPosts] = useState([]);
  const { username } = useParams();
  const [loading, setLoading] = useState(true);
  const { user } = useUserContext();

  let getData = async () => {
    const response = await fetch(
      `http://127.0.0.1:8000/api/profile/${username}`
    );

    const data = await response.json();
    setProfile(data);
    setPosts(data.posts);
    setLoading(false);
  };

  useEffect(() => {
    getData();
  }, [username]);

  return loading ? (
    <h1>Loading...</h1>
  ) : (
    <div className="profile">
      <div className="container">
        <div className="images">
          <img src={profile.coverPic} alt="" />
          <img src={profile.profilePic} alt="" />
        </div>
        <div className="user-info-profile">
          <div className="left">
            <LinkedInIcon fontSize="large" />
            <GitHubIcon fontSize="large" />
            <TwitterIcon fontSize="large" />
          </div>
          <div className="center">
            <div className="item-container">
              <div className="item">
                <LocationOnIcon />
                <span>India</span>
              </div>
            </div>

            <div className="details">
              <span>
                <b>{profile.user.first_name + " " + profile.user.last_name}</b>
              </span>
              <p>{profile.bio}</p>
            </div>
          </div>
          <div className="right">
            <EmailIcon fontSize="large" />
            {profile.user.username === user.username && <ProfileDropdown />}
          </div>
        </div>
        {posts.map((post) => {
          return <Post {...post} key={post.id} />;
        })}
      </div>
    </div>
  );
};

export default Profile;
