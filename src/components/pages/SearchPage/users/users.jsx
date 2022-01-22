import React from "react";
import { NavLink } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";

import classes from "@styles/search/users/usersStyles.module.scss";
import { settings } from "../../../slider/sliderSettings";

export const Users = ({ users, searchStr }) => {
  return (
    <div className={classes.users}>
      <Swiper {...settings} slidesPerView={3}>
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
