import React, { useRef } from "react";
import { SwiperSlide, Swiper } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import classes from "@styles/home/slider/Slider.module.scss";
import SwiperCore, { Pagination } from "swiper";
import heartIcon from "../../../../../assets/icons/heart-icon.png";
import { settings } from "../../../slider/sliderSettings";
import { useLike } from "../../../../hooks/useLikes";
import { Post } from "../../../tape/post/post";

SwiperCore.use([Pagination]);
export const Slider = ({ slides }) => {
  return (
    <div>
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
            <Post image={el} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
