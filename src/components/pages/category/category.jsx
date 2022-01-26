import classes from "@styles/category/category.module.scss";
import React, { useState } from "react";
import requests from "../../../api/requests";
import { Swiper } from "swiper/react";
import { useEffect } from "react";
import { Spinner } from "@/components/ui/spinner/spinner";
import { Users } from "@components/ui/users/users";
import { Tape } from "@/components/ui/tape/tape";
import { settings } from "@components/slider/sliderSettings.js";

export const Category = ({ match }) => {
  const id = match.params.id;

  const [isUserLoading, setuserLoading] = useState(false);
  const [isPostLoading, setPostLoading] = useState(false);

  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);

  const [page, setPage] = useState(1);

  let lastDate = 0;

  const getUsers = async () => {
    setuserLoading(true);
    try {
      const users = await requests.usersCategory.get(`test${id}`);
      const posts = await requests.CategoryPosts.get(`test${id}`);
      setPosts(posts.data);
      setUsers(users.data);
    } catch (error) {
      console.log(error);
    } finally {
      setuserLoading(false);
    }
  };

  const getPosts = async () => {
    if (isPostLoading) {
      try {
        const posts = await requests.CategoryPosts.get(`test${id}`, page);
        if (posts.data.length == 0) {
          setPostLoading(false);
          return;
        }
        setPosts((prev) => [...prev, ...posts.data]);
        setPage((prev) => prev + 1);
      } catch (e) {
        console.log(e);
      } finally {
        setPostLoading(false);
      }
    }
  };

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

  useEffect(() => {
    window.addEventListener("scroll", scrollHandler);
    return function () {
      window.removeEventListener("scroll", scrollHandler);
    };
  }, []);

  useEffect(() => {
    getPosts();
  }, [isPostLoading]);

  useEffect(() => {
    getUsers();
  }, []);

  return isUserLoading ? (
    <Spinner />
  ) : (
    <div className={classes.page}>
      <div className={classes.users}>
        <Swiper {...settings}>
          <Users users={users} />
        </Swiper>
      </div>

      <Tape images={posts} />
      {isPostLoading ? <Spinner /> : ""}
    </div>
  );
};
