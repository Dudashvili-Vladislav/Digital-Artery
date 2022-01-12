import React, { useState } from "react";
// Import Swiper React components

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import Swiper core and required modules

import { useEffect } from "react";
import requests from "../../../api/requests";
import { Slider } from "./slider/SliderTrending";
import { Spinner } from "@/components/spinner/spinner";

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

  return (
    <div>
      {sliders.length > 0 ? (
        sliders.map((el, i) => <Slider slides={el} key={i} />)
      ) : (
        <Spinner />
      )}
    </div>
  );
};
