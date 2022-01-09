import classes from "./users.module.scss";

import React from "react";

import { Swiper, SwiperSlide } from "swiper/react";

export const Users = ({ users, searchStr }) => {
  return (
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
            users for request {searchStr} not found
          </div>
        )}
      </Swiper>
    </div>
  );
};
