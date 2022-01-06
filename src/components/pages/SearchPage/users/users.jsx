import { useState } from "react";
import { Spinner } from "../../../spinner/spinner";
import classes from "./users.module.scss";

import React from "react";
import { useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import requests from "../../../../api/requests";
export const Users = ({ searchStr }) => {
  const [isLoading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    let cleanupFunction = false;
    const getAllUsers = async () => {
      if (!cleanupFunction) setLoading(true);
      try {
        const res = await requests.users.get(searchStr || "");

        if (!cleanupFunction) setUsers(res.data);
      } catch (e) {
        console.log(e);
      } finally {
        if (!cleanupFunction) setLoading(false);
      }
    };

    getAllUsers();
    return () => (cleanupFunction = true);
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
        {users.length > 0 ? (
          users.map(({ name, picture, username }, i) => (
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
          ))
        ) : (
          <div className={classes.searchStr}>
            По запросу {searchStr} пользователи не найдены
          </div>
        )}
      </Swiper>
    </div>
  );
};
