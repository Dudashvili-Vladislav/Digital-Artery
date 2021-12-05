import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { format } from 'react-string-format';

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination"


// import Swiper core and required modules
import SwiperCore, {
  Pagination,
  FreeMode,
  Lazy,
  Autoplay
} from 'swiper';

// install Swiper modules
SwiperCore.use([Pagination]);


function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}


function SwiperTop(props) {

  const i_max = props.i_max
  
  let swiper_list = [];
  for (let i = 1; i < i_max+1; ++i) {
	let formattedNumber = i.toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping: false})
	let img_src = format("../assets/gifs/{0}.gif", formattedNumber)
	  
	swiper_list.push(
      <SwiperSlide key={i}>
		<img src={img_src} alt="funny GIF" className="img-top"/>
	  </SwiperSlide>
    )
  }

	
  return (
    <div>
      <Swiper 
		modules={[Lazy, Autoplay]}
		lazy={{
		  loadOnTransitionStart: true,
		  loadPrevNext: true,
		  loadPrevNextAmount: 2
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
		autoplay={{delay: 3000}}
		
		loopAdditionalSlides={2}
		className="swiper-top"
		breakpoints={{
          '@0.75': {
			  slidesPerView: 1,
		  },
		  '@1.25': {
			  slidesPerView: 3,
		  }
		}}
	  >
	    {swiper_list}
      </Swiper>
    </div>
  )
}

export default SwiperTop