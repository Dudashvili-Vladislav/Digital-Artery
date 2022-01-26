import React, { useState, useRef } from "react";
// Import Swiper React components
import { useLike } from "../../../hooks/useLikes";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import Swiper core and required modules

import { useEffect } from "react";
import requests from "../../../api/requests";
import { Slider } from "./slider/SliderTrending";

// install Swiper modules

export const SwiperTrending = () => {
  const [sliders, setSliders] = useState([]);

  useEffect(() => {
    const createSliders = (images) => {
      for (let i = 0; i <= 4; i++) {
        images.length;
        setSliders((prevState) => [
          ...prevState,
          images.slice(i * (images.length / 5), i * (images.length / 5) + 20),
        ]);
      }
    };
    const getAllImages = async () => {
      try {
        const images = await requests.trending.get();

        createSliders(images.data);
      } catch (error) {
        console.log(error);
      }
    };
    getAllImages();
  }, []);
  const ref = useRef();

  useLike(ref);

  return (
    <div ref={ref}>
      {sliders.map((el, i) => (
        <Slider slides={el} key={i} />
      ))}
    </div>
  );
};
