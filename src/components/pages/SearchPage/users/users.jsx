import { useState } from "react";
import { Spinner } from "../../../spinner/spinner";
import classes from "./users.module.scss";

import React from "react";
import { useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import requests from "../../../../api/requests";
export const Users = () => {
  const [isLoading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const getAllUsers = async () => {
    setLoading(true);
    try {
      const res = await requests.users.get();

      setUsers(res.data);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  return isLoading ? (
    <Spinner />
  ) : (
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
  );
};
