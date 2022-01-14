import classes from "@styles/user/user.module.scss";
import { Post } from "@components/tape/post/post";
import { Spinner } from "@components/Spinner/Spinner";
import { useEffect } from "react";
import { useState } from "react";
import requests from "../../../api/requests";
import React from "react";
export const User = ({ match }) => {
  const { username } = match.params;
  const [userData, setUserData] = useState({});
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    const getUserData = async () => {
      setLoading(true);
      try {
        const userData = (await requests.user.get(username)).data;
        setUserData((prev) => {
          return { ...prev, userData };
        });
        const metrics = (await requests.metrics.get(username)).data;
        setUserData((prev) => {
          return { ...prev, metrics };
        });
        const posts = (await requests.userPost.get(username)).data;
        setUserData((prev) => {
          return { ...prev, posts };
        });
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    getUserData();
  }, []);
  console.log(userData);
  return isLoading ? (
    <Spinner />
  ) : userData.posts ? (
    userData.posts.map((el, i) => <Post image={el} key={i}/>)
  ) : (
    ""
  );
};
