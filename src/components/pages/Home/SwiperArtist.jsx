import React, { useState } from "react";
import { actions } from "../../../redux/actions";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

import styled from "styled-components";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import Swiper core and required modules
import SwiperCore, { Pagination, Lazy } from "swiper";
import { useEffect } from "react";
import requests from "../../../api/requests";
import { NavLink } from "react-router-dom";


// install Swiper modules
SwiperCore.use([Pagination]);

const Avatar = styled.div`
  position: relative;
  .text {
    text-align: center;

    color: #dadada;

    font-size: 15px;
    font-family: GeosansLight;
    margin-top: 10px;

    border-bottom-left-radius: 50%;
  }
  .img {
    aspect-ratio: 1;
    border-radius: 0%;
    background: var(--black);
  }
`;

function SwiperArtist() {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const getAllUsers = async () => {
      try {
        const usersData = await requests.usersDefault.get();
        setUsers(usersData.data);
      } catch (error) {
        console.log(error);
      }
    };
    getAllUsers();
  }, []);
  
  return (
    <div>
      <Swiper
        modules={[Lazy]}
        lazy={{
          loadOnTransitionStart: true,
          loadPrevNext: true,
          loadPrevNextAmount: 2,
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
          "@0.75": {
            slidesPerView: 5,
          },
          "@1.25": {
            slidesPerView: 10,
          },
        }}
      >
        {users.map((el, i) => (
          <SwiperSlide key={i}>
            <NavLink to={`/user/detail/${el.username}`}>
              <Avatar>
                <img src={el.picture} alt="funny GIF" className="img-artist" />
                <div className="text">{el.name || el.username}</div>
              </Avatar>
            </NavLink>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default SwiperArtist;
