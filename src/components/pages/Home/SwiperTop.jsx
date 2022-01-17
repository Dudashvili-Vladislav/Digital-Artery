import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import Swiper core and required modules
import SwiperCore, { Pagination, Lazy, Autoplay } from "swiper";
import requests from "../../../api/requests";
import { settings } from "../../slider/sliderSettings";

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

  return (
    <div>
      <Swiper
        {...settings}
        slidesPerView={1}
        modules={[Lazy, Autoplay]}
        loop={true}
        breakpoints={{
          "@1.25": {
            slidesPerView: 3,
          },
        }}
      >
        {images.map((el, i) => (
          <SwiperSlide key={i}>
            <NavLink to={`image/${el.id}`}>
              <img
                src={el.images[1].file}
                alt="funny GIF"
                className="img-top"
              />
            </NavLink>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default SwiperTop;
