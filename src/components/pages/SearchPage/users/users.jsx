import React from "react";
import { NavLink } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";

import classes from "@styles/search/users/usersStyles.module.scss";

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
              <NavLink to={`/user/detail/${username}`}>
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
              </NavLink>
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
