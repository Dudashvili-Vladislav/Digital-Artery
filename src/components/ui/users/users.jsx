import { Swiper, SwiperSlide } from "swiper/react";
import { settings } from "@components/slider/sliderSettings";
import classes from "@styles/search/users/usersStyles.module.scss";
import React from "react";

import { NavLink } from "react-router-dom";

export const Users = ({ users }) => {
  
  return (
    <>
      <Swiper {...settings} className={classes.users}>
        {users.map((el) => (
          <SwiperSlide className={classes.user} key={el.username}>
            <NavLink to={`/user/detail/${el.username}`}>
              <img
                src={el.picture}
                alt="user avatar"
                className={classes.user__avatar}
              />
              <div className={classes.user__name}>
                {el.name|| el.username.substring(0,10)} 
              </div>
            </NavLink>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};
