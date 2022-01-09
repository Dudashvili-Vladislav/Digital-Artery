import React from "react";
import { SwiperSlide, Swiper } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import classes from "./Slider.module.scss";
import SwiperCore, { Pagination, Lazy } from "swiper";
import heartIcon from "../../../../assets/icons/heart-icon.png";
SwiperCore.use([Pagination]);
export const Slider = ({ slides }) => {
  function setLike(e) {
    let opacity = e.target.style.opacity;
    if (opacity != 0.0) {
      e.target.style.opacity = 0.0;
    } else {
      e.target.style.animationName = "pulse";
      e.target.style.animationDuration = "0.75s";
      e.target.offsetParent.children[0].style.backgroundImage =
        'url("../assets/icons/heart_background_white.png")';
      const likes = e.target.parentNode.querySelector("." + classes.text);
      likes.innerHTML = parseInt(likes.innerHTML) + 1;
    }
  }
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
          <div className={classes.image__wrap}>
            <div className={classes.text}>{el.num_vote_up}</div>
            <img
              src={el.images[0].file}
              alt="slider image"
              className={classes.image}
            />
            <img
              src={heartIcon}
              className={classes.sub_image}
              onDoubleClick={setLike}
            />
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};
