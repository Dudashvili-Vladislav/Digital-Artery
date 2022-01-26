import React, { useEffect, useRef, useState } from "react";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

import "@styles/tape/post.scss";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import Swiper core and required modules
import SwiperCore, { Pagination, Lazy, Autoplay } from "swiper";
import requests from "../../../api/requests";
import { settings } from "../../slider/sliderSettings";

import heart from "../../../../assets/icons/heart-icon.png";
import { useLike } from "../../../hooks/useLikes";
// install Swiper modules
SwiperCore.use([Pagination]);

function SwiperTop() {
  const [images, setImages] = useState([]);
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
  const slider = useRef();
  useLike(slider);
  return (
    <div ref={slider}>
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
      >
        {images.map((el, i) => (
          <SwiperSlide key={i}>
            <div className="image">
              <div className={`text`}>{el.num_vote_up}</div>
              <img
                className="image__item"
                src={el.images[el.images.length - 1]?.file}
                alt={el.title}
                loading="lazy"
              />
              <img className={"sub-image "} data-id={el.id} src={heart} />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default SwiperTop;
