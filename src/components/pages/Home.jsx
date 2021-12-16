import React, { useState } from "react";
import SwiperTrending from "./Home/SwiperTrending";
import SwiperTop from "./Home/SwiperTop";
import ImgArray from "./Home/ImgArray";
import SwiperArtist from "./Home/SwiperArtist";
import Indices from "./Home/Indices";
import Marquee from "react-fast-marquee";
function Home() {
  return (
    <div>
      <SwiperArtist i_max={30} />
      <Indices />
      <SwiperTop i_max={10} />
      <Marquee
        speed={40}
        gradientColor={[5, 5, 5]}
        gradientWidth={50}
        gradient={true}
        className="main-header"
      >
        {"TRENDING\u00a0\u00a0".repeat(25)}
      </Marquee>
      <SwiperTrending i_max={20} j_max={5} />
      <Marquee
        speed={50}
        gradientColor={[5, 5, 5]}
        gradientWidth={50}
        gradient={true}
        direction={"right"}
        className="main-header"
      >
        {"EXPLORE THE ART WORLD\u00a0\u00a0\u00a0".repeat(25)}
      </Marquee>
      <ImgArray i_max={500} j_max={100} history={history} />
    </div>
  );
}

export default Home;
