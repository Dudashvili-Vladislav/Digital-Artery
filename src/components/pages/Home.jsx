import { SwiperTrending } from "./Home/SwiperTrending";
import SwiperTop from "./Home/SwiperTop";
import ImgArray from "./Home/ImgArray";
import Indices from "./Home/Indices";
import Marquee from "react-fast-marquee";
import SwiperArtist from "./Home/SwiperArtist";
import React from "react";
export const Home = () => {
  return (
    <div>
      <SwiperArtist />
      <Indices />
      <SwiperTop />

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
};
