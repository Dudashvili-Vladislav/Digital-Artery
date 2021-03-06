import { Users } from "../users/users";
import React, { useEffect, useState } from "react";
import requests from "../../../../api/requests";
import { Spinner } from "@/components/spinner/spinner";
import { Tape } from "@/components/tape/tape";
export const SearchRes = ({ match }) => {
  const searchStr = match.params.str;
  const [isUserLoading, setUserLoading] = useState(false);
  const [isPostLoading, setPostLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState([]);

  const getAllPosts = async () => {
    setUserLoading(true);
    try {
      const res = await requests.posts.get(searchStr);
      const users = await requests.users.get(searchStr);

      setPosts(res.data);
      setUsers(users.data);
    } catch (e) {
      console.log(e);
    } finally {
      setUserLoading(false);
    }
  };
  let lastDate = 0;
  const scrollHandler = (e) => {
    let nowDate = Date.now();
    if (
      e.target.documentElement.scrollHeight -
        (e.target.documentElement.scrollTop + window.innerHeight) <
        100 &&
      lastDate + 2000 < nowDate
    ) {
      lastDate = Date.now();
      setPostLoading(true);
    }
  };

  const getPostsTape = async () => {
    if (isPostLoading) {
      try {
        const posts = await requests.posts.get(searchStr, page);
        console.log(posts);
        if (posts.data.length == 0) {
          window.removeEventListener("scroll", scrollHandler);
          return setPostLoading(false);
        }
        setPosts((prev) => [...prev, ...posts.data]);
        setPage((prevState) => prevState + 1);
      } catch (error) {
      } finally {
        setPostLoading(false);
      }
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", scrollHandler);
    return function () {
      window.removeEventListener("scroll", scrollHandler);
    };
  }, []);

  useEffect(() => {
    getPostsTape();
  }, [isPostLoading]);

  useEffect(() => {
    getAllPosts();
  }, []);
  return isUserLoading ? (
    <Spinner />
  ) : (
    <div>
      <Users searchStr={searchStr} users={users} />
      <Tape images={posts} />
      {isPostLoading ? <Spinner /> : ""}
    </div>
  );
};
