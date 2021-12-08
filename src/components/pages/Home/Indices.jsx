import React, { useRef, useState } from "react";
import { format } from 'react-string-format';
import Marquee from "react-fast-marquee";


function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}


function Indices(props) {

  let prelike_price = getRandomInt(300)
  let like_price = getRandomInt(1000) + 300
  let art_price = getRandomInt(2000) + 1000
  let prelike_perc = getRandomInt(100) / 10
  let like_perc = getRandomInt(100) / 10
  let art_perc = getRandomInt(100) / 10
  

  let price_string_0 = "PRELIKE.INDEX: ${0} (-{3}%)\u00a0\u00a0•\u00a0\u00a0"
  let price_string_1 = "LIKE.INDEX: ${1} (+{4}%)\u00a0\u00a0•\u00a0\u00a0"
  let price_string_2 = "ART.INDEX: ${2} (+{5}%)\u00a0\u00a0•\u00a0\u00a0"

  let price_string = price_string_2 + price_string_1 + price_string_0

  price_string = format(price_string, prelike_price, like_price, art_price, prelike_perc, like_perc, art_perc)
  
  return (
    <Marquee 
	  speed={40} 
	  gradientColor={[5,5,5]} 
	  gradientWidth={50} 
	  gradient={true} 
	  direction={"right"} 
	  pauseOnClick={true}
	  className='main-header'
	>
	    {price_string.repeat(25)}
	</Marquee>
  )
}

export default Indices