import React from "react";
import { SwiperSlide, Swiper } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import classes from "@styles/home/slider/Slider.module.scss";
import SwiperCore, { Pagination } from "swiper";
import heartIcon from "../../../../../assets/icons/heart-icon.png";
import { NavLink } from "react-router-dom";
import { settings } from "../../../slider/sliderSettings";
SwiperCore.use([Pagination]);
export const Slider = ({ slides }) => {
  return (
    <Swiper
      {...settings}
      breakpoints={{
        "@1": {
          slidesPerView: 3,
        },
        "@1.25": {
          slidesPerView: 10,
        },
      }}
      slidesPerView={3}
    >
      {slides.map((el, i) => (
        <SwiperSlide key={i}>
          <NavLink to={`/image/${el.id}`}>
            <div className={classes.image__wrap}>
              <div className={classes.text}>{el.num_vote_up}</div>
              <img
                src={el.images[0].file}
                alt="slider image"
                className={classes.image}
              />
              <img src={heartIcon} className={classes.sub_image} />
            </div>
          </NavLink>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};
