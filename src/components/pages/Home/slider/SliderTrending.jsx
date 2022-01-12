import React from "react";
import { SwiperSlide, Swiper } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import classes from "@styles/home/slider/Slider.module.scss";
import SwiperCore, { Pagination, Lazy } from "swiper";
import heartIcon from "../../../../../assets/icons/heart-icon.png";
import { NavLink } from "react-router-dom";
SwiperCore.use([Pagination]);
export const Slider = ({ slides }) => {
  return (
    <Swiper
      modules={[Lazy]}
      lazy={{
        loadOnTransitionStart: true,
        loadPrevNext: true,
        loadPrevNextAmount: 2,
      }}
      //freeMode={{
      //  enabled:true,
      //  sticky:true,
      //}}
      touchRatio={3}
      speed={1000}
      slidesPerView={5}
      spaceBetween={5}
      autoHeight={true}
      loop={false}
      grabCursor={true}
      className="swiper-i"
      breakpoints={{
        "@0.75": {
          slidesPerView: 5,
        },
        "@1.25": {
          slidesPerView: 10,
        },
      }}
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
