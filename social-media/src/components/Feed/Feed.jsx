import React, { useEffect, useState } from "react";
import "./Feed.scss";
import Post from "../Post/Post";
import { useUserContext } from "../../providers/AuthContext";
import { useNavigate } from "react-router-dom";

const Feed = () => {
  const { authTokens, logoutUser } = useUserContext();
  let navigate = useNavigate();
  const [posts, setPosts] = useState([]);

  let getData = async () => {
    const response = await fetch(`http://127.0.0.1:8000/api/posts/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + String(authTokens.access),
      },
    });

    const data = await response.json();

    if (response.status === 200) setPosts(data);
    else if (response.status === 401) {
      logoutUser();
      navigate("/login");
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="feed">
      <div className="container">
        <div className="posts">
          <div className="wrapper">
            {posts.map((post) => {
              return <Post {...post} key={post.id} />;
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Feed;
