import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { format } from 'react-string-format';
import styled from 'styled-components';

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination"


// import Swiper core and required modules
import SwiperCore, {
  Pagination,
  FreeMode,
  Lazy
} from 'swiper';

// install Swiper modules
SwiperCore.use([Pagination]);


const Avatar = styled.div`
  position: relative;
  .text {
	text-align: center;
	width: 20px;
	height: 18px;
	position: absolute;
    color: #DADADA;
	top: 0px;
	right: 0px;
	background-color: var(--black);
	font-size: 12px;
	font-family: GeosansLight;
	margin-top: 0px;
	margin-right: -4px;
	text-shadow: 0.5px 0 0 #fff;
	border-bottom-left-radius:50%;
  }
  .img {
	aspect-ratio: 1;
	border-radius: 0%;
	background: var(--black);
  }
`


function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}


function SwiperArtist(props) {

  const i_max = props.i_max
  
  let swiper_list = [];
  for (let i = 1; i < i_max; ++i) {
	let random_num = getRandomInt(12)+1
	let formattedNumber = random_num.toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping: false})
	let img_src = format("../assets/cyber/{0}.jpg", formattedNumber)
    
	swiper_list.push(
      <SwiperSlide key={i}>
		<Avatar>
		  <div className="text">{getRandomInt(10)+1}</div>
  		  <img src={img_src} alt="funny GIF" className='img-artist'/>
		</Avatar>
	  </SwiperSlide>
    )
  }

	
  return (
    <div>
      <Swiper 
		modules={[Lazy]}
		lazy={{
		  loadOnTransitionStart: true,
		  loadPrevNext: true,
		  loadPrevNextAmount: 2
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
		className="swiper-artist"
		breakpoints={{
          '@0.75': {
			  slidesPerView: 5,
		  },
		  '@1.25': {
			  slidesPerView: 10,
		  }
		}}
	  >
	    {swiper_list}
      </Swiper>
    </div>
  )
}

export default SwiperArtist