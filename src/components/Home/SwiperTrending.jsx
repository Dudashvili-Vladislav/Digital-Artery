import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { format } from 'react-string-format';
import LazyLoad from 'react-lazyload';
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

const ImageListItem = styled.div`
  background-color: #070406;
  height: auto;
  display: flex;
  position: relative;
  

  .text {
    text-align: right;
    padding: 1px 3px;
    padding-top: 0px;
    height: 18px;
    width: 45px;
    top: 0px;
    right: 0px;
    position: absolute;
    background-size: cover;
    font-size: 14px;
    font-family: GeosansLight;
    color: #C5C5C5;
    background-image: url("../assets/icons/heart_background_black.png");
  }

  .sub-image {
    position: absolute;
    top: 25%;
    left: 25%;
    opacity: 0.0;
    width: 50%;
    height: 50%;
  }
  
  @keyframes pulse {
    0%   {opacity: 0.0;}
    10%  {opacity: 0.25;}
    20%  {opacity: 0.5;}
    30% {opacity: 0.65;}
    40% {opacity: 0.75;}
    50% {opacity: 0.85;}
    60%  {opacity: 0.75;}
    70%  {opacity: 0.65;}
    80%  {opacity: 0.5;}
    90%  {opacity: 0.25;}
    100% {opacity: 0.0;}
  }
`;


const Image = styled.img`
  object-fit: cover;
  width: 100%;
  height: auto;
  flex-grow: 1;
`

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function srcset(image, size, rows = 1, cols = 1) {
  return {
    src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
    srcSet: `${image}?w=${size * cols}&h=${
      size * rows
    }&fit=crop&auto=format&dpr=2 2x`,
  };
}


class SwiperTrending extends React.Component {
 
  constructor(props) {
    super(props);
  }

  setLike(event) {
    let opacity = event.currentTarget.style.opacity;
    if (opacity != 0.0) {
      event.currentTarget.style.opacity = 0.0;
    } else {
      event.currentTarget.style.animationName = "pulse";
      event.currentTarget.style.animationDuration = "0.75s";
      event.currentTarget.offsetParent.children[0].style.backgroundImage = 'url("../assets/icons/heart_background_white.png")';
    }
  }

  render() {

    const i_max = this.props.i_max
    const j_max = this.props.j_max
  

    let rows_list = [];
    for (let j = 1; j <= j_max; ++j) {

      let swiper_list = [];
      for (let i = 1; i <= i_max; ++i) {
	      let random_num = getRandomInt(12)+1
	      let formattedNumber = random_num.toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping: false})
	      let img_src = format("../assets/cyber/{0}.jpg", formattedNumber)

	      swiper_list.push(
    	    <SwiperSlide key={i}>
            <ImageListItem className="image-list-item">
              <div className="text">{getRandomInt(1000)+1}</div>
              <Image
                {...srcset(img_src, 121)}
                alt="title"
                loading="lazy"
              />
              <img
                {...srcset('../assets/icons/heart-icon.png', 121)}
                className="sub-image"
                onDoubleClick={this.setLike.bind(this)}
              />
            </ImageListItem>
		    </SwiperSlide>
        )
      }
	
	    rows_list.push(
    	  <Swiper 
          key={j}
		      modules={[Lazy]}
		      lazy={{
			      loadOnTransitionStart: true,
			      loadPrevNext: true,
			      loadPrevNextAmount: 5
		      }}
  		    touchRatio={3} 
	  	    touchReleaseOnEdges={true} 
		      threshold={0} 
		      speed={1000} 
		      slidesPerView={3} 
		      spaceBetween={5} 
		      loopAdditionalSlides={3} 
		      autoHeight={true} 
		      loop={true} 
		      grabCursor={true} 
		      className="swiper-i"
		      breakpoints={{
            '@0.75': {
			        slidesPerView: 3,
		        },
		        '@1.25': {
			        slidesPerView: 6,
		        }
		      }}
		    >
	        {swiper_list}
        </Swiper>
	    )
    }
	
    return (
      <div>
        {rows_list}
      </div>
    )
  }
}

export default SwiperTrending