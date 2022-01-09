import React, { useEffect, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";


// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import Swiper core and required modules
import SwiperCore, { Pagination, Lazy, Autoplay } from "swiper";
import requests from "../../../api/requests";

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
        modules={[Lazy, Autoplay]}
        lazy={{
          loadOnTransitionStart: true,
          loadPrevNext: true,
          loadPrevNextAmount: 2,
        }}
        //freeMode={{
        //  enabled:true,
        //  sticky:true,
        //}}
        touchRatio={4}
        speed={500}
        slidesPerView={1}
        spaceBetween={3}
        autoHeight={true}
        loop={true}
        grabCursor={true}
        autoplay={{ delay: 3000 }}
        loopAdditionalSlides={2}
        className="swiper-top"
        breakpoints={{
          "@0.75": {
            slidesPerView: 1,
          },
          "@1.25": {
            slidesPerView: 3,
          },
        }}
      >
        {images.map((el, i) => (
          <SwiperSlide key={i}>
            <img src={el.images[1].file} alt="funny GIF" className="img-top" />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default SwiperTop;
