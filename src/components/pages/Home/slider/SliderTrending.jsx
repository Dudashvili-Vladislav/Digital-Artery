import React from "react";
import { SwiperSlide, Swiper } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import classes from "@styles/home/slider/Slider.module.scss";
import SwiperCore, { Pagination } from "swiper";
import heartIcon from "../../../../../assets/icons/heart-icon.png";
import { NavLink } from "react-router-dom";
import { settings } from "../../../slider/sliderSettings";
import { useRef } from "react";
import { useLike } from "../../../../hooks/useLike";
import { Post } from "../../../tape/post/post";
SwiperCore.use([Pagination]);
export const Slider = ({ slides }) => {
  const tape = useRef();
  useLike(tape);
  return (
    <div ref={tape}>
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
            <Post image={el}/>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
