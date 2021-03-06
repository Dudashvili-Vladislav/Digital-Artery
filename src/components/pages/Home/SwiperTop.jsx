import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

import classes from "@styles/tape/post.module.scss";

import { likeHandler } from "@utils/likeHandler";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

import { Spinner } from "@components/spinner/spinner";
// import Swiper core and required modules
import SwiperCore, { Pagination, Lazy, Autoplay } from "swiper";
import requests from "../../../api/requests";
import { settings } from "../../slider/sliderSettings";

import heart from "../../../../assets/icons/heart-icon.png";
import { useRef } from "react";
import { useLike } from "../../../hooks/useLike";
// install Swiper modules
SwiperCore.use([Pagination]);

function SwiperTop() {
  const [images, setImages] = useState([]);
  const ref = useRef(null);
  console.log(ref);
  useLike(ref);
  useEffect(() => {
    const getAllUsers = async () => {
      try {
        const imagesData = await requests.topPosts.get();
        setImages(imagesData.data);
      } catch (error) {
        console.log(error);
      }
    };
    getAllUsers();
  }, []);

  return (
    <div ref={ref}>
      <Swiper
        {...settings}
        slidesPerView={1}
        modules={[Lazy, Autoplay]}
        loop={true}
        autoHeight={false}
        breakpoints={{
          "@1.25": {
            slidesPerView: 3,
          },
        }}
        className="swiper-top"
      >
        {images.map((el, i) => (
          <SwiperSlide key={i}>
            <div className={classes.image}>
              <div className={`${classes.image__text} text`}>
                {el.num_vote_up}
              </div>
              <img
                className={classes.image__item}
                src={el.images[el.images.length - 1].file}
                alt={el.title}
                loading="lazy"
              />
              <img
                className={"sub-image " + classes.image__sub}
                data-id={el.id}
                src={heart}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default SwiperTop;
