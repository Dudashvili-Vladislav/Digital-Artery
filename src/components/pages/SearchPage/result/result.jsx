import { Users } from "../users/users";
import React, { useEffect, useState } from "react";
import requests from "../../../../api/requests";
import classes from "./result.module.scss";
import { NavLink } from "react-router-dom";
import { Posts } from "../post/post";
import { Spinner } from "../../../spinner/spinner";
export const SearchRes = ({ match }) => {
  const searchStr = match.params.str;
  const [isLoading, setLoading] = useState(false);
  const [posts, setPosts] = useState([]);
  const getAllPosts = async () => {
    setLoading(true);
    try {
      const res = await requests.posts.get(searchStr);

      setPosts(res.data);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getAllPosts();
  }, []);
  return isLoading ? (
    <Spinner />
  ) : (
    <div>
      <Users searchStr={searchStr} />
      <Posts posts={posts} reqStr={searchStr} />
    </div>
  );
};
