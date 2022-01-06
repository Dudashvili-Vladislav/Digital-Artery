import classes from "./category.module.scss";
import React, { useState } from "react";
import requests from "../../../api/requests";
import { Swiper, SwiperSlide } from "swiper/react";
import { useEffect } from "react";
import { Spinner } from "../../spinner/spinner";
import { NavLink } from "react-router-dom";
import { Posts } from "../SearchPage/post/post";
export const Category = ({ match }) => {
  const id = match.params.id;
  const [isLoading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);
  const getUsers = async () => {
    setLoading(true);
    try {
      const users = await requests.usersCategory.get(`test${id}`);
      const posts = await requests.CategoryPosts.get(`test${id}`);
      setUsers(users.data);
      setPosts(posts.data);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getUsers();
  }, []);

  return isLoading ? (
    <Spinner />
  ) : (
    <div className={classes.page}>
      <div className={classes.users}>
        <Swiper
          touchRatio={3}
          speed={1000}
          slidesPerView={10}
          spaceBetween={5}
          autoHeight={true}
          loop={false}
          breakpoints={{
            "@0,5": {
              slidesPerView: 3,
            },
            "@0.75": {
              slidesPerView: 5,
            },
            "@1.25": {
              slidesPerView: 10,
            },
          }}
        >
          {users.map(({ name, picture, username }, i) => (
            <SwiperSlide key={i}>
              <div className={classes.user}>
                <img
                  src={picture}
                  alt="user avatar"
                  className={classes.user__avatar}
                />
                <div className={classes.user__name}>
                  {name || username.substring(0, 10)}
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <Posts posts={posts} />
    </div>
  );
};
